import { Box, makeStyles, MenuItem, Select } from '@material-ui/core';
import {useDataStore} from "../index";
import React, {useCallback} from "react";
import {observer} from "mobx-react-lite";
import styled from "@emotion/styled";

const TokenImg = styled.img`
  width: 32px;
  height: 32px;
`

const MenuItemContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-family: Rubik;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
`

const useStyles = makeStyles({
  root: {
    height: 32,
    color: '#fff',
    backgroundColor: 'transparent',
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
    '& .MuiSelect-selectMenu': {
      fontSize: 14,
    },
    '& .MuiSelect-select:focus': {
      backgroundColor: 'unset',
    },
    '& .MuiSelect-icon': {
      color: 'white',
    },
  },
});

export const TokenSelect = observer(() => {
  const classes = useStyles();
  const store = useDataStore();
  const onChangeHandler = useCallback((event) => {
    store.setCurrentToken(event.target.value)
  }, []);
  return (
    <Select
      variant="outlined"
      displayEmpty
      className={classes.root}
      value={store.currentToken}
      onChange={onChangeHandler}
    >
      <MenuItem value="" disabled>
        Select Token
      </MenuItem>
      {store.tokens.map(token => (
        <MenuItem key={token} value={token}>
          <MenuItemContent>
            <TokenImg src={`./assets/img/${token}.svg`} alt={token} />
            <Box ml={1}>{token}</Box>
          </MenuItemContent>
        </MenuItem>
      ))}
    </Select>
  );
});