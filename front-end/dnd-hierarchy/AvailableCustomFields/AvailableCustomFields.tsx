import React from 'react';
import { Box } from '@material-ui/core';
import { useSelector } from 'react-redux';
import {
    availableCustomFieldsSelector,
} from 'modules/settings/submodules/components/HierarchyPage/AvailableCustomFields/store/selectors';
import { AvailableCustomField } from 'modules/settings/submodules/components/HierarchyPage/AvailableCustomFields/AvailableCustomField/AvailableCustomField';
import { useHierarchyPageStyles } from 'modules/settings/submodules/components/HierarchyPage/styles';
import { DropLocation } from 'modules/settings/submodules/components/HierarchyPage/HierarchyPage';
import { Droppable } from 'react-beautiful-dnd';
import { useDroppableStyles } from 'shared/styles/droppableStyles';
import { useAvailableCustomFieldsStyles } from 'modules/settings/submodules/components/HierarchyPage/AvailableCustomFields/styles';
import clsx from 'clsx';

export const AvailableCustomFields = () => {
    const availableCustomFields = useSelector(availableCustomFieldsSelector);
    const hierarchyPageStyles = useHierarchyPageStyles();
    const droppableClasses = useDroppableStyles();
    const availableCustomFieldsClasses = useAvailableCustomFieldsStyles();
    return (
        <Box>
            <Box className={hierarchyPageStyles.label}>
                <label>Available Custom Fields</label>
            </Box>
            <Droppable droppableId={DropLocation.AvailableCustomFields}>
                {(provided, snapshot) => {
                    const { isDraggingOver } = snapshot;
                    return (
                        <Box { ...provided.droppableProps }
                            { ...{ ref: provided.innerRef } as any }
                            className={ clsx(availableCustomFieldsClasses.customFieldsBox,
                                isDraggingOver ? droppableClasses.highlighted : '') }>
                            {
                                availableCustomFields.map((field, index) => {
                                    return (
                                        <AvailableCustomField
                                            key={ field.id }
                                            customField={ field }
                                            index={ index }/>
                                    );
                                })
                            }
                            { provided.placeholder }
                        </Box>
                    );
                }}
            </Droppable>
        </Box>
    );
};
