import { useSelector } from 'react-redux';
import { hierarchyUpperTextSelector } from 'modules/settings/submodules/components/HierarchyPage/store/selectors';
import { Typography } from '@material-ui/core';
import React from 'react';

export const UpperText = () => {
    const upperText = useSelector(hierarchyUpperTextSelector);
    return (
        <Typography>
            {upperText}
        </Typography>
    );
};
