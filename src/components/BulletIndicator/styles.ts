import styled from 'styled-components/native';

interface Props {
	active?: boolean;
}

export const Container = styled.View`
	flex-direction: row;
	align-self: flex-end;
	padding-right: 24px;
`;

export const ImageIndex = styled.View<Props>`
	width: 6px;
	height: 6px;

	background-color: ${({ theme, active }) =>
		active ? theme.colors.title : theme.colors.shape};

	margin-left: 8px;
	border-radius: 3px;
`;
