import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

interface OptionProps {
	isActive?: boolean;
	isKeyboardShown?: boolean;
}

export const Container = styled.View`
	background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View<OptionProps>`
	width: 100%;
	height: ${({ isKeyboardShown }) =>
		isKeyboardShown ? RFValue(127) : RFValue(200)}px;
	background-color: ${({ theme }) => theme.colors.header};

	align-items: center;

	padding: 0 24px;
`;

export const HeaderTop = styled.View`
	width: 100%;

	flex-direction: row;
	justify-content: space-between;
	align-items: center;

	margin-top: ${getStatusBarHeight() + 32}px;
`;

export const HeaderTitle = styled.Text`
	font-family: ${({ theme }) => theme.fonts.secondary_600};
	font-size: ${RFValue(25)}px;
	color: ${({ theme }) => theme.colors.background_secondary};
`;

export const SignOutButton = styled(BorderlessButton)``;

export const PhotoContainer = styled.View`
	width: ${RFValue(180)}px;
	height: ${RFValue(180)}px;
	background-color: ${({ theme }) => theme.colors.shape};

	border-radius: ${RFValue(90)}px;

	align-items: center;
	justify-content: center;

	margin-top: ${RFValue(16)}px;
`;

export const Photo = styled.Image`
	width: ${RFValue(180)}px;
	height: ${RFValue(180)}px;

	border-radius: ${RFValue(90)}px;
`;

export const PhotoButton = styled(RectButton)`
	position: absolute;
	bottom: 10px;
	right: 10px;

	width: ${RFValue(40)}px;
	height: ${RFValue(40)}px;
	background-color: ${({ theme }) => theme.colors.main};

	align-items: center;
	justify-content: center;
`;

export const Initials = styled.Text`
	font-family: ${({ theme }) => theme.fonts.secondary_600};
	font-size: ${RFValue(40)}px;
	color: ${({ theme }) => theme.colors.main};
`;

export const Content = styled.View<OptionProps>`
	padding: 0 24px;
	margin-top: ${({ isKeyboardShown }) =>
		isKeyboardShown ? RFValue(10) : RFValue(100)}px;
`;

export const Options = styled.View`
	border-bottom-width: 1px;
	border-bottom-color: ${({ theme }) => theme.colors.line};

	flex-direction: row;
	justify-content: space-evenly;
`;

export const Option = styled.TouchableOpacity`
	padding: 10px 0;
	margin-bottom: 20px;
`;

export const RedBorder = styled.View`
	position: absolute;
	bottom: 0;

	width: 100%;
	height: 3px;
	background-color: ${({ theme }) => theme.colors.main};

	border-radius: 3px;
`;

export const OptionTitle = styled.Text<OptionProps>`
	font-family: ${({ theme, isActive }) =>
		isActive ? theme.fonts.secondary_600 : theme.fonts.secondary_500};
	font-size: ${RFValue(20)}px;
	color: ${({ theme, isActive }) =>
		isActive ? theme.colors.header : theme.colors.text_detail};
`;

export const Section = styled.View`
	margin-bottom: 20px;
`;
