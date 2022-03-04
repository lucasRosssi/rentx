import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface Props {
	color?: string;
}

export const Container = styled(RectButton)<Props>`
	width: 100%;
	height: ${RFValue(60)}px;

	padding: 19px;
	align-items: center;
	justify-content: center;

	background-color: ${({ color, theme }) =>
		color ? color : theme.colors.main};
`;

export const Title = styled.Text`
	font-family: ${({ theme }) => theme.fonts.primary_500};
	font-size: ${RFValue(15)}px;
	color: ${({ theme }) => theme.colors.shape};
`;
