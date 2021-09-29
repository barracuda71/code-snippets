import {
    childrenByNodeIdSelector, rootAssignmentNodesSelector, selectCustomFieldsByIds,
} from 'store/entities/customFields/selectors';
import { createSelector } from 'reselect';

import { ICustomFieldHierarchyNode } from 'store/entities/customFields/model';
import { ICustomFieldHierarchyRow } from 'modules/settings/submodules/customFields/store/models';

const getSortingPseudoRow = (currentLevel: number): ICustomFieldHierarchyRow => {
    const random = Math.floor(Math.random() * 100_000_000);
    return {
        currentLevel,
        isSortingPseudoRow: true,
        tempId: random,
    };
};

export const hierarchyRowsSelector = createSelector(
    selectCustomFieldsByIds,
    childrenByNodeIdSelector,
    rootAssignmentNodesSelector,
    (customFieldsByIds,
        childrenByNodeId,
        rootNodes) => {

        const initialLevel = 1;
        const currentResultRows: ICustomFieldHierarchyRow[] = [
            getSortingPseudoRow(initialLevel),
        ];

        const addSubHierarchy = (
            currentLevel: number,
            currentNode: ICustomFieldHierarchyNode,
        ) => {
            const field = customFieldsByIds[currentNode?.custom_field_id];
            if (field){
                const row: ICustomFieldHierarchyRow = {
                    customField: field,
                    hierarchyNode: currentNode,
                    currentLevel,
                    isSortingPseudoRow: false,
                    tempId: 0,
                };

                currentResultRows.push(row);
                const pseudoRow = getSortingPseudoRow(currentLevel);
                currentResultRows.push(pseudoRow);
                const childrenNodes = childrenByNodeId[currentNode.id];
                childrenNodes.forEach(node => {
                    addSubHierarchy(currentLevel + 1, node);
                });
            }
        };
        rootNodes.forEach(node => {
            addSubHierarchy(initialLevel, node);
        });
        return currentResultRows;
    },
);
