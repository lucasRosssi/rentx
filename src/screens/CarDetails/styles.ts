import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
	getBottomSpace,
	getStatusBarHeight,
} from 'react-native-iphone-x-helper';
import Animated from 'react-native-reanimated';

export const Container = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.colors.background_secondary};
`;

export const Header = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;

	position: absolute;
	margin-top: ${getStatusBarHeight() + 18}px;
	margin-left: 24px;
`;

export const CarImages = styled(Animated.View)`
	margin-top: ${getStatusBarHeight() + 32}px;
`;

export const Content = styled(Animated.ScrollView).attrs({
	contentContainerStyle: {
		padding: 24,
		alignItems: 'center',
	},
	showsVerticalScrollIndicator: false,
	scrollEventThrottle: 16,
})``;

export const Details = styled.View`
	width: 100%;

	flex-direction: row;
	align-items: center;
	justify-content: space-between;

	margin-top: 12px;
`;

export const Description = styled.View``;

export const Brand = styled.Text`
	font-family: ${({ theme }) => theme.fonts.secondary_500};
	font-size: ${RFValue(10)}px;
	color: ${({ theme }) => theme.colors.text_detail};
	text-transform: uppercase;
`;

export const Name = styled.Text`
	font-family: ${({ theme }) => theme.fonts.secondary_500};
	font-size: ${RFValue(25)}px;
	color: ${({ theme }) => theme.colors.title};
`;

export const Rent = styled.View``;

export const Period = styled.Text`
	font-family: ${({ theme }) => theme.fonts.secondary_500};
	font-size: ${RFValue(10)}px;
	color: ${({ theme }) => theme.colors.text_detail};
	text-transform: uppercase;
`;

export const Price = styled.Text`
	font-family: ${({ theme }) => theme.fonts.secondary_500};
	font-size: ${RFValue(25)}px;
	color: ${({ theme }) => theme.colors.main};
`;

export const About = styled.Text`
	font-family: ${({ theme }) => theme.fonts.primary_400};
	font-size: ${RFValue(15)}px;
	color: ${({ theme }) => theme.colors.text};
	text-align: justify;
	line-height: ${RFValue(25)}px;

	margin-top: 23px;
`;

export const Accessories = styled.View`
	width: 100%;

	flex-direction: row;
	flex-wrap: wrap;
	align-items: center;
	justify-content: space-between;
`;

export const Footer = styled.View`
	width: 100%;
	background-color: ${({ theme }) => theme.colors.background_secondary};

	padding: 24px 24px ${getBottomSpace() + 24}px;
`;
