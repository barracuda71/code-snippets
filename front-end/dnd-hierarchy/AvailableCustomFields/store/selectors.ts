import { selectCustomFieldsList, selectIsLoadingCustomFields } from 'store/entities/customFields/selectors';
import { createSelector } from 'reselect';
import { hierarchyRowsSelector } from 'modules/settings/submodules/components/HierarchyPage/HierarchyTable/store/selectors';
import { selectCurrentClientId } from 'store/entities/clients/clientsSelectors';

export const availableCustomFieldsSelector = createSelector(
    selectCustomFieldsList,
    hierarchyRowsSelector,
    selectCurrentClientId,
    (allCustomFields, hierarchyRows, clientId) => {
        return allCustomFields.filter(field => {
            return !hierarchyRows.some(row => row.customField?.id === field.id)
                && (field.all_clients || (clientId && field.client_ids.includes(clientId)));
        });
    },
);

export const isAvailableCustomFieldsLoadingSelector = createSelector(
    selectIsLoadingCustomFields,
    isLoading => {
        return isLoading;
    },
);
