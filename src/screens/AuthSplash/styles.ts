import styled from 'styled-components/native';

export const Container = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.colors.header};

	align-items: center;
	justify-content: center;
`;

export const Header = styled.View`
	width: 100%;
	height: 113px;

	position: absolute;
	top: 0

	background-color: ${({ theme }) => theme.colors.header};

	flex-direction: row;
	align-items: flex-end;
	justify-content: space-between;

	padding: 28px 24px;
`;
