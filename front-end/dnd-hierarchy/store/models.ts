import { HierarchyNodeOperation, ICustomFieldHierarchyNode } from 'store/entities/customFields/model';

export interface ICreateCustomFieldHierarchyNode {
    parent_id: string | null,
    custom_field_id: string,
    client_id: string | null,
    siblings_order: number,
    display_on_grid: boolean,
    operation: HierarchyNodeOperation,
}

export interface IUpdateCustomFieldHierarchyNodeRequest {
    parent_id?: string | null,
    custom_field_id?: string,
    siblings_order?: number,
    display_on_grid?: boolean,
    operation?: HierarchyNodeOperation,
}

export interface IUpdateCustomFieldHierarchyNodePayload {
    id: string,
    data: IUpdateCustomFieldHierarchyNodeRequest,
    isDragged: boolean,
}

export interface IAttachChildrenToGrandparentPayload {
    draggingNode: ICustomFieldHierarchyNode,
}
