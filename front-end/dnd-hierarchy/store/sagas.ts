import { deleteCustomFieldHierarchyNode, getCustomFieldsHierarchyNodes } from 'store/entities/customFields/actions';
import { withBackendErrorHandler } from 'store/utils/sagas/withBackendErrorHandler';
import { call, put, select, takeEvery, takeLatest } from 'typed-redux-saga';
import {
    attachChildrenToGrandParent,
    createCustomFieldHierarchyNode,
    updateCustomFieldHierarchy,
    updateCustomFieldHierarchyNode,
} from 'modules/settings/submodules/components/HierarchyPage/store/actions';
import { HierarchyType, ICustomFieldHierarchyNode } from 'store/entities/customFields/model';
import { v4 as uuidv4 } from 'uuid';
import { childrenByNodeIdSelector, selectCustomFieldHierarchyNodesByIds } from 'store/entities/customFields/selectors';
import { hierarchyRowsSelector } from 'modules/settings/submodules/components/HierarchyPage/HierarchyTable/store/selectors';
import { customFieldsHierarchyNodesApi } from 'modules/settings/submodules/components/HierarchyPage/store/api';

function* createCustomFieldsHierarchyNodeSaga({
    payload,
}: ReturnType<typeof createCustomFieldHierarchyNode.init>) {
    const node: ICustomFieldHierarchyNode = {
        id: uuidv4(),
        custom_field_id: payload.custom_field_id,
        client_id: payload.client_id,
        parent_id: payload.parent_id,
        siblings_order: payload.siblings_order,
        hierarchy_type: HierarchyType.Assignment,
        operation: payload.operation,
        display_on_grid: payload.display_on_grid,
    };
    yield put(createCustomFieldHierarchyNode.success(node));
    yield put(getCustomFieldsHierarchyNodes.success([node]));
}

function* createCustomFieldsHierarchyNodeWatcher() {
    yield* takeLatest(
        createCustomFieldHierarchyNode.initType,
        withBackendErrorHandler(
            createCustomFieldsHierarchyNodeSaga,
            createCustomFieldHierarchyNode.error,
            'Unable to create custom field hierarchy node',
        ),
    );
}

function* deleteCustomFieldHierarchyNodeSaga(
    { payload: id }: ReturnType<typeof deleteCustomFieldHierarchyNode.init>,
) {
    const nodesById = yield* select(selectCustomFieldHierarchyNodesByIds);
    const draggingNode = nodesById[id];
    yield put(attachChildrenToGrandParent({ draggingNode: draggingNode }));
    yield put(deleteCustomFieldHierarchyNode.success(id));
}

function* deleteCustomFieldHierarchyNodeWatcher() {
    yield* takeLatest(
        deleteCustomFieldHierarchyNode.initType,
        withBackendErrorHandler(
            deleteCustomFieldHierarchyNodeSaga,
            deleteCustomFieldHierarchyNode.error,
            'Unable to delete Custom Field Hierarchy Node',
        ),
    );
}

function* attachChildrenToGrandParentSaga({ payload }: ReturnType<typeof attachChildrenToGrandParent>){
    const { draggingNode } = payload;
    const childrenByNodeId = yield* select(childrenByNodeIdSelector);
    const children = childrenByNodeId[draggingNode.id];
    const childrenAttachedToGrandParent = children.map(child => {
        return {
            ...child,
            parent_id: draggingNode.parent_id,
        };
    });
    yield put(getCustomFieldsHierarchyNodes.success(childrenAttachedToGrandParent));
}

function* attachChildrenToGrandParentSagaWatcher() {
    yield* takeEvery(
        attachChildrenToGrandParent.action,
        attachChildrenToGrandParentSaga,
    );
}

function* updateCustomFieldHierarchyNodeSaga({
    payload,
}: ReturnType<typeof updateCustomFieldHierarchyNode.init>) {
    const { id, data, isDragged } = payload;

    const nodesById = yield* select(selectCustomFieldHierarchyNodesByIds);
    const draggingNode = nodesById[id];

    const hierarchyPositionChanged = (data.parent_id && draggingNode.parent_id !== data.parent_id)
        || (data.siblings_order && draggingNode.siblings_order !== data.siblings_order);

    if (hierarchyPositionChanged && isDragged) {
        yield put(attachChildrenToGrandParent({ draggingNode: draggingNode }));
    }

    const draggedNodeNewState: ICustomFieldHierarchyNode = {
        id,
        custom_field_id: draggingNode.custom_field_id,
        client_id: draggingNode.client_id,
        parent_id: data.parent_id !== undefined ? data.parent_id : draggingNode.parent_id,
        siblings_order: data.siblings_order || draggingNode.siblings_order,
        operation: data.operation || draggingNode.operation,
        display_on_grid: data.display_on_grid !== undefined ? data.display_on_grid : draggingNode.display_on_grid,
        hierarchy_type: HierarchyType.Assignment,
    };
    yield put(getCustomFieldsHierarchyNodes.success([draggedNodeNewState]));

    yield put(updateCustomFieldHierarchyNode.success(draggedNodeNewState));
}

function* updateCustomFieldHierarchySaga() {
    const hierarhcyRows = yield* select(hierarchyRowsSelector);
    const nodes = hierarhcyRows.map(row => row.hierarchyNode)
        .filter(node => Boolean(node)) as ICustomFieldHierarchyNode[];

    yield* call(customFieldsHierarchyNodesApi.updateCustomFieldHierarchy, nodes);
    yield put(updateCustomFieldHierarchy.success());
}

function* updateCustomFieldHierarchyWatcher() {
    yield* takeLatest(
        updateCustomFieldHierarchy.initType,
        withBackendErrorHandler(
            updateCustomFieldHierarchySaga,
            updateCustomFieldHierarchy.error,
            'Unable to update Custom Field Hierarchy',
        ),
    );
}

function* updateCustomFieldHierarchyNodeWatcher() {
    yield* takeEvery(
        updateCustomFieldHierarchyNode.initType,
        withBackendErrorHandler(
            updateCustomFieldHierarchyNodeSaga,
            updateCustomFieldHierarchyNode.error,
            'Unable to update Custom Field Hierarchy Node',
        ),
    );
}

export const customFieldsHierarchySagas = [
    createCustomFieldsHierarchyNodeWatcher,
    deleteCustomFieldHierarchyNodeWatcher,
    updateCustomFieldHierarchyNodeWatcher,
    updateCustomFieldHierarchyWatcher,
    attachChildrenToGrandParentSagaWatcher,
];
