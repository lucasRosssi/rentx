import { Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

const screenWidth = Dimensions.get('window').width;
const accessorySize = screenWidth * 0.26;

export const Container = styled.View`
	width: ${RFValue(accessorySize)}px;
	height: ${RFValue(accessorySize)}px;

	justify-content: center;
	align-items: center;

	background-color: ${({ theme }) => theme.colors.background_primary};

	padding: 16px;
	margin-bottom: 8px;
`;

export const Name = styled.Text`
	font-family: ${({ theme }) => theme.fonts.primary_500};
	font-size: ${RFValue(13)}px;
	color: ${({ theme }) => theme.colors.text};
`;
