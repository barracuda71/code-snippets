import { makeStyles } from '@material-ui/core/styles';

export const useHierarchyTableStyles = makeStyles(theme => ({
    bodyCell: {
        height: theme.spacing(5),
    },
    hierarchyTable: {
        minWidth: '60%',
    },
}));
