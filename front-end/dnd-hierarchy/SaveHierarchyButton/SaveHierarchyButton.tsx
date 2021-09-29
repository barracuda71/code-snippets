import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@material-ui/core';
import { updateCustomFieldHierarchy } from 'modules/settings/submodules/components/HierarchyPage/store/actions';
import ConfirmationDialog from 'shared/components/modals/ConfirmationDialog';
import { selectIsCustomFieldsHierarchySaving } from 'store/entities/customFields/selectors';
import ButtonWithLoader from 'shared/components/buttons/ButtonWithLoader';
import { isClientHasCustomFieldValues } from 'modules/settings/submodules/components/HierarchyPage/store/selectors';

export const SaveHierarchyButton = () => {
    const dispatch = useDispatch();
    const useConfirmation = useSelector(isClientHasCustomFieldValues);
    const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);

    const openConfirmation = useCallback(() => {
        setIsOpenConfirmation(true);
    }, [setIsOpenConfirmation]);
    const onCancelConfirmation = useCallback(() => {
        setIsOpenConfirmation(false);
    }, [setIsOpenConfirmation]);

    const onSaveHandler = useCallback(() => {
        setIsOpenConfirmation(false);
        dispatch(updateCustomFieldHierarchy.init());
    }, [dispatch, setIsOpenConfirmation]);
    const isCustomFieldsHierarchySaving = useSelector(selectIsCustomFieldsHierarchySaving);
    return (
        <Box margin={2}>
            <ButtonWithLoader
                variant="contained"
                color="secondary"
                isLoading={isCustomFieldsHierarchySaving}
                onClick={useConfirmation ? openConfirmation : onSaveHandler}
            >
                Save
            </ButtonWithLoader>
            <ConfirmationDialog
                open={isOpenConfirmation}
                onConfirm={onSaveHandler}
                onCancel={onCancelConfirmation}
            >
                Changes in the hierarchy can lead to changes in the binding of custom field values.
                Please check the custom field values after saving the hierarchy
            </ConfirmationDialog>
        </Box>
    );
};
