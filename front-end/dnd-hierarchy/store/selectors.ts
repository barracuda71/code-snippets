import { isAvailableCustomFieldsLoadingSelector } from 'modules/settings/submodules/components/HierarchyPage/AvailableCustomFields/store/selectors';
import { createSelector } from 'reselect';
import { selectCustomFieldValuesByIds, selectIsLoadingCustomFieldsHierarchyNodes } from 'store/entities/customFields/selectors';
import { selectCurrentClientId } from 'store/entities/clients/clientsSelectors';

export const isDefaultHierarchyPageLoadingSelector = createSelector(
    isAvailableCustomFieldsLoadingSelector,
    selectIsLoadingCustomFieldsHierarchyNodes,
    (isAvailableFieldsLoading, isHierarchyNodesLoading) => {
        return isAvailableFieldsLoading || isHierarchyNodesLoading;
    },
);

export const hierarchyUpperTextSelector = createSelector(
    selectCurrentClientId,
    currentClientId => {
        if (currentClientId) {
            return 'Drag and drop the available custom fields into the table below to create a hierarchy for this client. For each custom field selected, choose an operation. Read-only: field will display in the details only. Actionable: field will be added to the time and expense control. Hidden: not shown to the user, but will be available as a data point. To display the custom field as a column on the employees and manager\'s timesheet table, check the "Display on grid" checkbox.';
        }
        return 'Drag and drop the available custom fields into the table below to create a global defaulted hierarchy. This will automatically create this hierarchy if the same custom fields are used within a client. For each custom field selected, choose an operation. Read-only: field will display in the details only. Actionable: field will be added to the time and expense control. Hidden: not shown to the user, but will be available as a data point.';
    },
);

export const isClientHasCustomFieldValues = createSelector(
    selectCurrentClientId,
    selectCustomFieldValuesByIds,
    (clientId, valuesByIds) => {
        return clientId && Object.values(valuesByIds).some(value => value.client_id === clientId);
    },
);
