import React from 'react';
import styled from 'styled-components';

const HeaderElement = styled.div`
    background-color: black;
    height: 60px;

`;

const Image = styled.img`
    height: 40px;
    margin: 10px;
    display: inline;
`;

const Logo = () => {
    return (
        <Image src="logo_main_green.e13d2500.svg"/>
    );
}

const Title = styled.p`
    display: inline;
    font-size: 32px;
    vertical-align: middle;
`;

export const Header = (props) => {
    return (
        <HeaderElement>
            <Logo/>
            <Title>
                Academetrics
            </Title>
        </HeaderElement>
    );
}