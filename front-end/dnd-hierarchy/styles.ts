import { makeStyles } from '@material-ui/core/styles';

export const useHierarchyPageStyles = makeStyles(theme => ({
    label: {
        fontSize: theme.typography.pxToRem(12),
        fontWeight: theme.typography.fontWeightMedium,
        marginBottom: theme.spacing(2),
    },
    disabled: {
        cursor: 'not-allowed',
        '& *': {
            pointerEvents: 'none',
        },
    },
}));
