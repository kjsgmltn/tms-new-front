/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { darken } from 'polished';

const container = css`
	width: 200px;
	height: 60px;
	cursor: pointer;
	font-size: 14px;
	display: flex;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;
	&:hover {
		background-color: ${darken(0.05, '#ffffff')};
	}
	&:active {
		background-color: ${darken(0.1, '#ffffff')};
	}
`;

const Button = ({ label, handleClick, ...props }) => (
	<div css={[container, { ...props }]} onClick={handleClick}>
		{label}
	</div>
);

export default Button;
