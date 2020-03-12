import React from 'react';
import styled from 'styled-components';

const HeaderText = styled.h5`
    font-size: 24px;
    text-align: center;
    color: rgba(0, 255, 178, 0.5);
    font-family: 'Calibri';
    font-weight: bold;
`;

export const WidgetHeader = (props) => {
    return (
        <div>
            <HeaderText>{props.text}</HeaderText>
        </div>
    );
}