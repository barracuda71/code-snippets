import React from 'react';
import { Box } from '@material-ui/core';
import {
    useHierarchyPageStyles,
} from 'modules/settings/submodules/components/HierarchyPage/styles';

import GridTable from 'shared/components/table/GridTable/GridTable';
import { useDefaultTableStyles } from 'shared/components/table/GridTable/defaultStyles';
import { useSelector } from 'react-redux';
import OpenWithIcon from '@material-ui/icons/OpenWith';
import { useAvailableCustomFieldsStyles } from 'modules/settings/submodules/components/HierarchyPage/AvailableCustomFields/styles';
import { useHierarchyTableStyles } from 'modules/settings/submodules/components/HierarchyPage/HierarchyTable/styles';
import clsx from 'clsx';
import { DropLocation } from 'modules/settings/submodules/components/HierarchyPage/HierarchyPage';

import { hierarchyRowsSelector } from 'modules/settings/submodules/components/HierarchyPage/HierarchyTable/store/selectors';
import { ICustomFieldHierarchyRow } from 'modules/settings/submodules/customFields/store/models';
import { OperationSelect } from 'modules/settings/submodules/components/HierarchyPage/HierarchyTable/components/OperationSelect/OperationSelect';
import DisplayOnGridCheckBox
    from 'modules/settings/submodules/components/HierarchyPage/HierarchyTable/components/DisplayOnGridCheckbox/DisplayOnGridCheckbox';
import { HierarchyNodeOperation } from 'store/entities/customFields/model';

export interface IHierarchyTableProps{
    currentDragDestinationIndex: number;
    currentDraggableId: string | null;
}

export interface ICustomFieldHierarchyRowWithClasses extends ICustomFieldHierarchyRow {
    className?: string;
}

export const HierarchyTable = ({ currentDragDestinationIndex, currentDraggableId }:IHierarchyTableProps) => {
    const hierarchyPageClasses = useHierarchyPageStyles();
    const usedCustomFieldsRows = useSelector(hierarchyRowsSelector);
    const customFieldClasses = useAvailableCustomFieldsStyles();
    const classes = useHierarchyTableStyles();
    const cells = [
        {
            key: 'CUSTOM_FIELD',
            title: 'CUSTOM FIELD',
            render: function NameCell({ customField, currentLevel, className }: ICustomFieldHierarchyRowWithClasses){
                const marginLeft = (currentLevel - 1) * 4;
                return (
                    <Box className={className} marginLeft={marginLeft}>
                        <OpenWithIcon className={customFieldClasses.customFieldIcon} fontSize="small"/>
                        <Box component="span" marginLeft={1}
                            marginRight={8}>
                            {customField?.name}
                        </Box>
                    </Box>
                );
            },
        },
        {
            key: 'OPERATION',
            title: 'OPERATION',
            width: '200px',
            render: function OperationCell({ className, hierarchyNode }: ICustomFieldHierarchyRowWithClasses){
                return (
                    <Box className={className}>
                        <OperationSelect id={hierarchyNode?.id || ''}
                            operation={hierarchyNode?.operation || HierarchyNodeOperation.Actionable}/>
                    </Box>

                );
            },
        },
        {
            key: 'DISPLAY_ON_GRID',
            title: 'DISPLAY ON GRID',
            width: '200px',
            render: function DisplayOnGridCell({ className, hierarchyNode }: ICustomFieldHierarchyRowWithClasses){
                const shouldHide = hierarchyNode?.operation !== HierarchyNodeOperation.Actionable;
                return (
                    <Box className={className}>
                        {
                            !shouldHide && (
                                <DisplayOnGridCheckBox id={hierarchyNode?.id || ''}
                                    isChecked={hierarchyNode?.display_on_grid || false}/>
                            )
                        }
                    </Box>
                );
            },
        }];
    const tableClasses = useDefaultTableStyles();
    return (
        <Box className={classes.hierarchyTable}>
            <Box className={hierarchyPageClasses.label}>
                <label>Selected Custom Fields</label>
            </Box>
            <GridTable
                rowData={usedCustomFieldsRows}
                getKey={row => row.hierarchyNode?.id || row.tempId.toString()}
                getRowId={row => row.hierarchyNode?.id || row.tempId.toString()}
                isPseudoRow={row => row.isSortingPseudoRow}
                cells={cells}
                isLoading={false}
                headerCellClassName={tableClasses.headCell}
                bodyCellClassName={clsx(classes.bodyCell, tableClasses.bodyCell)}
                className={tableClasses.tableBorder}
                stickyHeader
                droppableRows
                droppableId={DropLocation.HierarchyTable}
                currentDragDestinationIndex={currentDragDestinationIndex}
                currentDraggableId={currentDraggableId}
            />
        </Box>

    );
};
