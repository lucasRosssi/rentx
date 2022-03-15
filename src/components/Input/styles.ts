import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
	width: 100%;
	height: ${RFValue(55)}px;

	flex-direction: row;

	margin-bottom: 8px;
`;

export const IconBox = styled.View`
	height: 100%;
	width: ${RFValue(55)}px;
	background-color: ${({ theme }) => theme.colors.background_secondary};

	align-items: center;
	justify-content: center;

	margin-right: 2px;
`;

export const TextInput = styled.TextInput`
	flex: 1;
	height: 100%;
	background-color: ${({ theme }) => theme.colors.background_secondary};

	font-family: ${({ theme }) => theme.fonts.primary_400};
	font-size: ${RFValue(15)}px;
	color: ${({ theme }) => theme.colors.title};

	padding-left: 23px;
`;

export const ShowPassword = styled.TouchableOpacity`
	position: absolute;
	right: 16px;

	height: 100%;

	justify-content: center;
`;

export const RedBorder = styled.View`
	position: absolute;
	bottom: 0;

	height: 2px;
	width: 100%;
	background-color: ${({ theme }) => theme.colors.main};
`;
