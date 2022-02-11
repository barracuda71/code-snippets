import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface Props {
    title?: string;
    text: string;
    isOpen: boolean;
    onButtonClicked: () => void;
}

export function AlertDialog(props: Props) {
    const {isOpen, onButtonClicked, text, title} = props;

    return (
        <Dialog open={isOpen}>
                {
                    title && (
                        <DialogTitle>
                            {title}
                        </DialogTitle>
                    )
                }

                <DialogContent>
                    <DialogContentText>
                        {text}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onButtonClicked} autoFocus>
                        OK
                    </Button>
                </DialogActions>
        </Dialog>
    );
}