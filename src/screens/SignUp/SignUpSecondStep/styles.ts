import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
	background-color: ${({ theme }) => theme.colors.background_primary};

	padding: ${getStatusBarHeight() + 31}px 24px 0;
`;

export const Header = styled.View`
	width: 100%;

	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

export const Title = styled.Text`
	font-family: ${({ theme }) => theme.fonts.secondary_600};
	font-size: ${RFValue(40)}px;
	color: ${({ theme }) => theme.colors.title};

	margin-top: ${RFValue(60)}px;
	margin-bottom: 16px;
`;

export const Subtitle = styled.Text`
	font-family: ${({ theme }) => theme.fonts.primary_400};
	font-size: ${RFValue(15)}px;
	color: ${({ theme }) => theme.colors.text};
	line-height: ${RFValue(25)}px;
`;

export const Form = styled.View`
	width: 100%;
	margin-top: ${RFValue(64)}px;
	margin-bottom: 16px;
`;

export const FormTitle = styled.Text`
	font-family: ${({ theme }) => theme.fonts.secondary_600};
	font-size: ${RFValue(20)}px;
	color: ${({ theme }) => theme.colors.title};

	margin-bottom: 24px;
`;
