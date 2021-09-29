import React from 'react';
import OpenWithIcon from '@material-ui/icons/OpenWith';
import { useAvailableCustomFieldsStyles } from 'modules/settings/submodules/components/HierarchyPage/AvailableCustomFields/styles';
import { Draggable } from 'react-beautiful-dnd';
import { Box } from '@material-ui/core';
import { ICustomField } from 'store/entities/customFields/model';
export interface IAvailableCustomFieldProps {
    customField: ICustomField;
    index: number;
}

export const AvailableCustomField = ({ customField, index } : IAvailableCustomFieldProps) => {
    const classes = useAvailableCustomFieldsStyles();

    return (
        <Draggable draggableId={customField.id} index={index}>
            {provided => (
                <Box
                    className={classes.customField}
                    {...{ ref: provided.innerRef } as any} //ref is only officially supported since material ui v5
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <OpenWithIcon className={classes.customFieldIcon} fontSize="small"/>
                    <span className={classes.customFieldText}>
                        {customField.name}
                    </span>
                </Box>
            )}
        </Draggable>
    );
};
