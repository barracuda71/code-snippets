import baseApi from 'shared/utils/baseApi';
import { clientConfigurationsService } from 'store/entities/configuration/configurationApi';
import { ICustomFieldHierarchyNode } from 'store/entities/customFields/model';

import {
    ICreateCustomFieldHierarchyNode,
    IUpdateCustomFieldHierarchyNodeRequest,
} from 'modules/settings/submodules/components/HierarchyPage/store/models';

const customFieldsHierarchyRoute = 'custom_fields_hierarchy';

export const customFieldsHierarchyNodesApi = {
    async createCustomFieldHierarchyNode(request: ICreateCustomFieldHierarchyNode): Promise<ICustomFieldHierarchyNode> {
        const { data } = await baseApi.create<ICreateCustomFieldHierarchyNode, ICustomFieldHierarchyNode>(
            clientConfigurationsService,
            customFieldsHierarchyRoute,
            request,
        );
        return data;
    },
    async deleteCustomFieldHierarchyNode(id: string): Promise<string> {
        const { data } = await baseApi.delete<{ status: string }>(
            `/${clientConfigurationsService}/${customFieldsHierarchyRoute}`, id,
        );
        return data.status;
    },
    async updateCustomFieldHierarchyNode(
        id: string,
        body: IUpdateCustomFieldHierarchyNodeRequest)
        : Promise<ICustomFieldHierarchyNode> {

        const { data } = await baseApi.patch<IUpdateCustomFieldHierarchyNodeRequest, ICustomFieldHierarchyNode>(
            `${clientConfigurationsService}/${customFieldsHierarchyRoute}/${id}`,
            body,
        );
        return data;
    },
    async updateCustomFieldHierarchy(nodes: ICustomFieldHierarchyNode[]) {
        const { data } = await baseApi.post(
            `${clientConfigurationsService}/${customFieldsHierarchyRoute}/edit`,
            { nodes: nodes },
        );
        return data;
    },
};
