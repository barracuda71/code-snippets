import { createRequestActions, createSingleAction, RequestType } from 'store/utils';
import { ICustomFieldHierarchyNode } from 'store/entities/customFields/model';
import {
    IAttachChildrenToGrandparentPayload,
    ICreateCustomFieldHierarchyNode,
    IUpdateCustomFieldHierarchyNodePayload,
} from 'modules/settings/submodules/components/HierarchyPage/store/models';

export const createCustomFieldHierarchyNode = createRequestActions<ICreateCustomFieldHierarchyNode,
ICustomFieldHierarchyNode>(
    RequestType.Create,
    'CUSTOM_FIELD_HIERARCHY_NODE',
);

export const updateCustomFieldHierarchyNode = createRequestActions<IUpdateCustomFieldHierarchyNodePayload,
ICustomFieldHierarchyNode>(
    RequestType.Update,
    'CUSTOM_FIELD_HIERARCHY_NODE',
);

const attachChildrenToGrandparentActionType = 'CUSTOM_FIELD_HIERARCHY_NODE/Attach_children_to_grandparent';
export const attachChildrenToGrandParent = createSingleAction<IAttachChildrenToGrandparentPayload,
    typeof attachChildrenToGrandparentActionType>(attachChildrenToGrandparentActionType);

export const updateCustomFieldHierarchy = createRequestActions<void,
void>(
    RequestType.Update,
    'CUSTOM_FIELD_HIERARCHY',
);
