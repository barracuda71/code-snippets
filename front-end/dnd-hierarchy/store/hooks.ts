import { useSelector } from 'react-redux';
import { ICustomFieldHierarchyNode } from 'store/entities/customFields/model';
import { useCallback } from 'react';
import { childrenByNodeIdSelector } from 'store/entities/customFields/selectors';

export const useGetNodeChildren = () => {
    const childrenByNodeId = useSelector(childrenByNodeIdSelector);
    return useCallback((node?: ICustomFieldHierarchyNode) => {
        if (!node?.id){
            return [];
        }
        return childrenByNodeId[node.id];
    }, [childrenByNodeId]);
};
