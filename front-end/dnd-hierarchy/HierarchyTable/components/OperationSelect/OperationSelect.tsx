import React, { ChangeEvent, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useCellSelectStyles } from 'modules/settings/submodules/components/sharedStyles/tableCellStyles';
import { FormControl, Select } from '@material-ui/core';
import { HierarchyNodeOperation, HierarchyNodeOperationTitle } from 'store/entities/customFields/model';
import { IUpdateCustomFieldHierarchyNodePayload } from 'modules/settings/submodules/components/HierarchyPage/store/models';
import { updateCustomFieldHierarchyNode } from 'modules/settings/submodules/components/HierarchyPage/store/actions';

export interface IUpdateOperationSelectProps {
    id: string;
    operation: HierarchyNodeOperation;
    className?: string;
}

export const OperationSelect = (props: IUpdateOperationSelectProps) => {
    const { id, operation, className } = props;
    const dispatch = useDispatch();
    const handleChange = useCallback((newValue: HierarchyNodeOperation) => {
        const displayOnGridOperations = [HierarchyNodeOperation.Actionable];
        const resetDisplayOnGrid = !displayOnGridOperations.includes(newValue);
        const updateNodePayload: IUpdateCustomFieldHierarchyNodePayload = {
            id: id,
            data: {
                operation: newValue,
                ...(resetDisplayOnGrid ? { display_on_grid: false } : {}),
            },
        };
        dispatch(updateCustomFieldHierarchyNode.init(updateNodePayload));
    }, [dispatch, id]);

    const classes = useCellSelectStyles();
    const values = Object.values(HierarchyNodeOperation).map(enumValue => {
        return ({
            id: enumValue,
            description: HierarchyNodeOperationTitle[enumValue],
        });
    });
    const onChange = useCallback(({ target }: ChangeEvent<{value: any}>) => {
        handleChange(target.value);
    }, [handleChange]);
    return (
        <FormControl
            variant="outlined"
            size="small"
            className={className}
        >
            <Select
                classes={classes}
                native
                onChange={onChange}
                value={operation}
            >
                {values.map(optionValue => (
                    <option key={optionValue.id} value={optionValue.id}>
                        {optionValue.description}
                    </option>
                ))}
            </Select>
        </FormControl>
    );
};
