import { makeHighPriorityStyles } from 'utils/stylesWrapper';
import { Theme } from '@material-ui/core/styles';

export const useDisplayOnGridCheckBoxStyles = makeHighPriorityStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(1),
    },
}));
