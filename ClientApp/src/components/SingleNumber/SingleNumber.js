import React from 'react';
import styled from 'styled-components';

const NumberText = styled.p`
    font-size: 96px;
    font-weight: bold;
    text-align: center;
`;

export const SingleNumber = (props) => {
    return (
        <div width={props.size.width} height={props.size.height} >
            <NumberText>{props.data}</NumberText>
        </div>
    );
}
