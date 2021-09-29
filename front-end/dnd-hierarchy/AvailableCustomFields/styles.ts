import { makeStyles } from '@material-ui/core/styles';
import { colors } from 'shared/styles/constants';

export const useAvailableCustomFieldsStyles = makeStyles(theme => ({
    customFieldsBox: {
        maxWidth: theme.spacing(34),
        minHeight: theme.spacing(50),
    },
    customField: {
        border: `${colors.lightGray} 2px dashed`,
        display: 'flex',
        alignItems: 'center',
        margin: theme.spacing(1.5),
        cursor: 'move',
        width: theme.spacing(30),
    },
    customFieldIcon: {
        padding: theme.spacing(1),
        color: colors.darkGray,
    },
    customFieldText: {
        fontSize: '12px',
    },
}));
