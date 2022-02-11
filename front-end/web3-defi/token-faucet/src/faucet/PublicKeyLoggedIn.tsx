import React from 'react';
import { Grid, IconButton, makeStyles, Typography } from '@material-ui/core';
import {useDataStore} from "../index";
import styled from "@emotion/styled";
import {observer} from "mobx-react-lite";

const CloseButton = styled(IconButton)`
    margin: -12px;
`

export const PublicKeyLoggedIn = observer(() => {

    const store = useDataStore();
    const handleDisconnet = async () => {
        await (window as any).web3Modal.clearCachedProvider();
        store.setPublicKey('');
    };
    return (
        <Grid container item xs={4}  alignItems="center" justifyContent="space-between">
            <img src="./assets/img/metamask.svg" alt="meta mask" />
            <Typography>
                {`${store.publicKey.slice(0, 5)}.....${store.publicKey.slice(-4)}`}
            </Typography>
            <CloseButton onClick={handleDisconnet}>
                <img src="./assets/img/close.svg" alt="close mask" />
            </CloseButton>
        </Grid>
    )
});