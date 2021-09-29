import styled from "@emotion/styled";
import React from 'react';


const Root = styled.div`
    background-color: #191332;
    height: 320px;
    width: 576px;
    border-radius: 8px;
    padding: 20px 24px 24px 24px;
    margin-top: 112px;
`;

const Title = styled.div`
    text-align: center;
    color: white;
    font-size: 14px;
    margin-bottom: 19px;
`;

const Body = styled.div`
    padding: 12px 16px;
    background: #191332;
    border: 1px solid #29294D;
    box-sizing: border-box;
    border-radius: 8px;
`;
const Label = styled.div`
    color: #959EBD;
`;
const Row = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 23px;
    padding-bottom: 24px;
`;

export const Faucet = () => {
    return (
        <Root>
            <Title>
                FAUCET
            </Title>
            <Body>
                <Label>Ethereum Rinkeby</Label>
                <Row>
                </Row>
            </Body>
        </Root>
    );
}

