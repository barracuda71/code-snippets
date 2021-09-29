import React, { useCallback, useEffect, useMemo, useState } from 'react';
import FeatureSwitch from 'shared/components/common/FeatureSwitch';
import { FeatureSwitches } from 'utils/featureSwitches';
import { AvailableCustomFields } from 'modules/settings/submodules/components/HierarchyPage/AvailableCustomFields/AvailableCustomFields';
import { HierarchyTable } from 'modules/settings/submodules/components/HierarchyPage/HierarchyTable/HierarchyTable';
import { Box, CircularProgress } from '@material-ui/core';
import { DragDropContext, DragUpdate, DropResult, ResponderProvided } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import {
    availableCustomFieldsSelector,
} from 'modules/settings/submodules/components/HierarchyPage/AvailableCustomFields/store/selectors';
import {
    clearLocalClientHierarchyNodes,
    deleteCustomFieldHierarchyNode,
    getCustomFields,
    getCustomFieldsHierarchyNodes,
} from 'store/entities/customFields/actions';
import {
    createCustomFieldHierarchyNode, updateCustomFieldHierarchyNode,
} from 'modules/settings/submodules/components/HierarchyPage/store/actions';
import { ICreateCustomFieldHierarchyNode, IUpdateCustomFieldHierarchyNodePayload } from 'modules/settings/submodules/components/HierarchyPage/store/models';
import { hierarchyRowsSelector } from 'modules/settings/submodules/components/HierarchyPage/HierarchyTable/store/selectors';
import { HierarchyNodeOperation, ICustomField, ICustomFieldHierarchyNode } from 'store/entities/customFields/model';
import {
    isDefaultHierarchyPageLoadingSelector,
} from 'modules/settings/submodules/components/HierarchyPage/store/selectors';
import { setGlobalToast } from 'store/entities/appConfig/actions';
import { autoHideDefaultDuration, IModalSeverity } from 'shared/components/toasts/modal';
import {
    useGetNodeChildren,
} from 'modules/settings/submodules/components/HierarchyPage/store/hooks';
import { selectCurrentClientHasAssignments, selectCurrentClientId } from 'store/entities/clients/clientsSelectors';
import {
    selectCustomFieldHierarchyNodesByIds,
} from 'store/entities/customFields/selectors';
import { ICustomFieldHierarchyRow } from 'modules/settings/submodules/customFields/store/models';
import { UpperText } from 'modules/settings/submodules/components/HierarchyPage/UpperText/UpperText';
import { SaveHierarchyButton } from 'modules/settings/submodules/components/HierarchyPage/SaveHierarchyButton/SaveHierarchyButton';
import { useHierarchyPageStyles } from 'modules/settings/submodules/components/HierarchyPage/styles';
import { Alert } from '@material-ui/lab';

export const DropLocation = {
    AvailableCustomFields: 'AvailableCustomFields',
    HierarchyTable: 'HierarchyTable',
};

const hierarchyLevelLimit = 10;
const hierarchyLimitToast = {
    severity: IModalSeverity.Warning,
    title: `You can't add more than ${hierarchyLevelLimit} levels`,
    autoHideDuration: autoHideDefaultDuration * 2,
};

export const HierarchyPage = () => {
    const availableCustomFields = useSelector(availableCustomFieldsSelector);
    const hierarchyRows = useSelector(hierarchyRowsSelector);
    const hierarchyNodesByIds = useSelector(selectCustomFieldHierarchyNodesByIds);
    const isLoading = useSelector(isDefaultHierarchyPageLoadingSelector);
    const dispatch = useDispatch();

    const currentClientId = useSelector(selectCurrentClientId);
    useEffect(() => {
        dispatch(clearLocalClientHierarchyNodes());
        dispatch(getCustomFieldsHierarchyNodes.init());
    }, [currentClientId, dispatch]);

    useEffect(() => {
        dispatch(getCustomFields.init());
    }, [dispatch]);

    const getChildren = useGetNodeChildren();

    const getCurrentSiblingsMaxOrder = useCallback((targetRowNode: ICustomFieldHierarchyNode | undefined) => {
        const newSiblings = getChildren(targetRowNode);
        const currentMaxSiblingOrder = Math.max(0, ...newSiblings.map(sibling => sibling.siblings_order));
        return currentMaxSiblingOrder;
    }, [getChildren]);

    const getDraggableItemLength = useCallback((draggingRowNode?: ICustomFieldHierarchyNode) => {
        if (!draggingRowNode){
            return 0;
        }
        let length = 0;
        let currentLevelNodes = [draggingRowNode];
        while (currentLevelNodes.length > 0) {
            length += 1;
            const nextLevelNodes = currentLevelNodes.flatMap(getChildren);
            currentLevelNodes = nextLevelNodes;
        }
        return length;
    }, [getChildren]);

    const getNewParentNode = useCallback((sourceIndex: number, destinationIndex: number) => {
        const draggableRow: ICustomFieldHierarchyRow | undefined = hierarchyRows[sourceIndex];
        const rowsWithoutDraggable = hierarchyRows.filter(row => row !== draggableRow);
        const newParentRowIndex = destinationIndex - 1;
        let newParentRow = destinationIndex === 0
            ? undefined // make root
            // draggable row disappears from visual array but it remains in store:
            : rowsWithoutDraggable[newParentRowIndex];

        if (newParentRow?.isSortingPseudoRow){
            let ordinaryNodeBefore = rowsWithoutDraggable[newParentRowIndex - 1];

            if (!ordinaryNodeBefore){ //we dropped to root pseudo row, parent is null
                return null;
            }

            if (ordinaryNodeBefore.isSortingPseudoRow){ // when returning to the original place
                ordinaryNodeBefore = rowsWithoutDraggable[newParentRowIndex - 2];
            }
            const ordinaryNodeAfter = rowsWithoutDraggable.length > newParentRowIndex + 1
                ? rowsWithoutDraggable[newParentRowIndex + 1]
                : null;

            const ordinarySiblingNode = ordinaryNodeAfter?.hierarchyNode?.parent_id
                                                        === ordinaryNodeBefore.hierarchyNode?.id
                ? ordinaryNodeAfter
                : ordinaryNodeBefore;

            newParentRow = rowsWithoutDraggable.find(node => {
                return node.hierarchyNode?.id === ordinarySiblingNode?.hierarchyNode?.parent_id;
            });
        }
        return newParentRow;
    }, [hierarchyRows]);

    const applyNewSiblingsOrder = useCallback((
        parentNode: ICustomFieldHierarchyNode | undefined,
        sourceIndex: number,
        destinationIndex: number, // destination index is calculated without dragged item
        draggableCustomField: ICustomField) => {

        const draggableRow = hierarchyRows[sourceIndex];
        const rowsWithoutDraggable = hierarchyRows.filter(row => row !== draggableRow);

        const children = rowsWithoutDraggable.filter(row => {
            // eslint-disable-next-line eqeqeq
            return !row.isSortingPseudoRow && row.hierarchyNode?.parent_id == parentNode?.id;
        });
        const childrenRowPositions = children.map(childRow => {
            const rowIndex = hierarchyRows.findIndex(row => row === childRow);
            return {
                childNodeId: childRow.hierarchyNode?.id,
                rowIndex,
            };
        });
        // dragged row is not updated in store yet, so add it manually:
        childrenRowPositions.push({
            childNodeId: draggableRow?.hierarchyNode?.id,
            rowIndex: destinationIndex,
        });
        const childrenOrdered = childrenRowPositions.sort((child1, child2) => {
            return child1.rowIndex <= child2.rowIndex ? -1 : 1;
        });
        const currentMaxSiblingOrder = getCurrentSiblingsMaxOrder(parentNode);
        childrenOrdered.forEach((childPosition, index) => {
            const childId = childPosition.childNodeId;
            const node = hierarchyNodesByIds[childId || ''];
            const newParentId = parentNode?.id || null;
            const newIndex = currentMaxSiblingOrder + 1 + index;
            if (node){
                if (node.parent_id === newParentId && node.siblings_order === newIndex){
                    return;
                }
                const updateNodePayload: IUpdateCustomFieldHierarchyNodePayload = {
                    id: node.id,
                    data: {
                        parent_id: newParentId,
                        siblings_order: newIndex,
                    },
                    isDragged: draggableRow?.hierarchyNode?.id === node.id,
                };
                dispatch(updateCustomFieldHierarchyNode.init(updateNodePayload));
            } else { //creating a new node
                const createNodePayload: ICreateCustomFieldHierarchyNode = {
                    custom_field_id: draggableCustomField.id,
                    parent_id: newParentId || null,
                    client_id: currentClientId,
                    siblings_order: newIndex,
                    operation: HierarchyNodeOperation.Actionable,
                    display_on_grid: true,
                };
                dispatch(createCustomFieldHierarchyNode.init(createNodePayload));
            }
        });

    }, [hierarchyRows, dispatch, hierarchyNodesByIds, getCurrentSiblingsMaxOrder, currentClientId]);

    const onDragEnd = useCallback(({ source, destination }: DropResult) => {
        setCurrentDragDestinationIndex(-1); //clear highlighting
        setCurrentDraggableId(null);

        // Make sure we have a valid destination
        if (destination === undefined || destination === null) {
            return null;
        }

        if (source.droppableId === DropLocation.AvailableCustomFields
        && destination.droppableId === DropLocation.HierarchyTable){ // creating node
            const draggableField = availableCustomFields[source.index];
            const targetRow = getNewParentNode(-1, destination.index);
            if (targetRow?.currentLevel && targetRow.currentLevel + 1 > hierarchyLevelLimit) {
                dispatch(setGlobalToast(hierarchyLimitToast));
                return;
            }

            const targetRowNode = targetRow?.hierarchyNode;
            applyNewSiblingsOrder(targetRowNode, -1, destination.index, draggableField);
        }
        if (source.droppableId === DropLocation.HierarchyTable
            && destination.droppableId === DropLocation.AvailableCustomFields){ // deleting node
            const rowToDelete = hierarchyRows[source.index];
            const rowNode = rowToDelete.hierarchyNode;
            if (rowNode){
                dispatch(deleteCustomFieldHierarchyNode.init(rowNode.id));
            }
        }
        if (source.droppableId === DropLocation.HierarchyTable
            && destination.droppableId === DropLocation.HierarchyTable){ // updating node

            if (source.index === destination.index - 1){ //when dragging 2 pseudo rows are near to each other
                return;
            }

            const draggableRow = hierarchyRows[source.index];
            const newParentRow = getNewParentNode(source.index, destination.index);

            const itemPlusTailLength = getDraggableItemLength(draggableRow?.hierarchyNode);
            if (newParentRow?.currentLevel && newParentRow.currentLevel + itemPlusTailLength > hierarchyLevelLimit) {
                dispatch(setGlobalToast(hierarchyLimitToast));
                return;
            }
            const newParentRowNode = newParentRow?.hierarchyNode;
            const draggableCustomField = draggableRow.customField as ICustomField;
            applyNewSiblingsOrder(newParentRowNode, source.index, destination.index, draggableCustomField);
        }
    }, [availableCustomFields, hierarchyRows, dispatch, getNewParentNode,
        applyNewSiblingsOrder, getDraggableItemLength]);

    const [currentDragDestinationIndex, setCurrentDragDestinationIndex] = useState(-1);
    const [currentDraggableId, setCurrentDraggableId] = useState<string | null>(null);
    const onDragUpdate = useCallback((dragUpdate: DragUpdate, _: ResponderProvided) => {
        const { destination, draggableId } = dragUpdate;
        setCurrentDraggableId(draggableId);
        if (destination?.droppableId === DropLocation.HierarchyTable){
            setCurrentDragDestinationIndex(destination.index);
        } else {
            setCurrentDragDestinationIndex(-1);
        }

    }, []);

    const currentDragDestinationIndexInStore = useMemo(() => {
        // draggable row disappears from visual array but it remains in store.
        const draggebleIndexInStore = hierarchyRows.findIndex(row => row.hierarchyNode?.id === currentDraggableId);
        if (draggebleIndexInStore === -1){ //adding new field, no need for correction
            return currentDragDestinationIndex;
        }
        if (currentDragDestinationIndex > draggebleIndexInStore){
            return currentDragDestinationIndex + 1;
        }
        return currentDragDestinationIndex;
    }, [currentDragDestinationIndex, currentDraggableId, hierarchyRows]);

    const hierarchyPageClasses = useHierarchyPageStyles();
    const currentClientHasAssignments = useSelector(selectCurrentClientHasAssignments);

    return (
        <FeatureSwitch feature={FeatureSwitches.enableDefaultHierarchyModule}>
            <Box mb={2}>
                <UpperText/>
            </Box>

            {
                currentClientHasAssignments && (
                    <Box margin={2}>
                        <Alert severity="warning">
                            {'You can’t modify the custom field hierarchy because the client has active employee'}
                        </Alert>
                    </Box>
                )
            }

            {
                isLoading
                    ? <CircularProgress/>
                    : (
                        <Box className={currentClientHasAssignments ? hierarchyPageClasses.disabled : ''}>
                            <DragDropContext onDragEnd={onDragEnd}
                                onDragUpdate={onDragUpdate}
                                enableDefaultSensors>
                                <Box display="flex" justifyContent="space-between"
                                    paddingX={3}>
                                    <AvailableCustomFields/>
                                    <HierarchyTable currentDragDestinationIndex={currentDragDestinationIndexInStore}
                                        currentDraggableId={currentDraggableId}/>
                                </Box>
                            </DragDropContext>
                            <SaveHierarchyButton/>
                        </Box>
                    )
            }
        </FeatureSwitch>
    );
};
