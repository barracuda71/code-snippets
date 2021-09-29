import React, { useCallback } from 'react';
import { Checkbox } from '@material-ui/core';
import { IUpdateCustomFieldHierarchyNodePayload } from 'modules/settings/submodules/components/HierarchyPage/store/models';
import { updateCustomFieldHierarchyNode } from 'modules/settings/submodules/components/HierarchyPage/store/actions';
import { useDispatch } from 'react-redux';
import useCheckBoxStyles from 'shared/components/table/tableApprovalCells/CheckBox/CheckBoxStyles';
import { useDisplayOnGridCheckBoxStyles } from 'modules/settings/submodules/components/HierarchyPage/HierarchyTable/components/DisplayOnGridCheckbox/styles';

interface IDisplayOnGridCheckBoxProps {
    isChecked: boolean;
    id: string;
}

export default function DisplayOnGridCheckBox({ isChecked, id }: IDisplayOnGridCheckBoxProps) {
    const initialClasses = useCheckBoxStyles();
    const classes = useDisplayOnGridCheckBoxStyles();
    const dispatch = useDispatch();
    const handleCheckChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.checked;

        const updateNodePayload: IUpdateCustomFieldHierarchyNodePayload = {
            id: id,
            data: {
                display_on_grid: newValue,
            },
        };
        dispatch(updateCustomFieldHierarchyNode.init(updateNodePayload));
    }, [dispatch, id]);

    return (
        <Checkbox
            checked={isChecked}
            onChange={handleCheckChange}
            color="default"
            size={'small'}
            classes={{ checked: initialClasses.root, root: classes.root }}
        />
    );
}
