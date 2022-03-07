import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

import { FlatList, FlatListProps } from 'react-native';
import { CarDTO } from '../../dtos/CarDTO';
import { RectButton } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

export const Container = styled.View`
	flex: 1;

	background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
	width: 100%;
	height: 113px;

	background-color: ${({ theme }) => theme.colors.header};

	flex-direction: row;
	align-items: flex-end;
	justify-content: space-between;

	padding: 28px 24px;
`;

export const TotalCars = styled.Text`
	font-size: ${RFValue(15)}px;
	font-family: ${({ theme }) => theme.fonts.primary_400};
	color: ${({ theme }) => theme.colors.text};
`;

export const CarList = styled(
	FlatList as new (props: FlatListProps<CarDTO>) => FlatList<CarDTO>
).attrs({
	contentContainerStyle: { padding: 24 },
	showsVerticalScrollIndicator: false,
})``;

export const MyCarsButton = styled(
	Animated.createAnimatedComponent(RectButton)
)`
	width: ${RFValue(60)}px;
	height: ${RFValue(60)}px;

	background-color: ${({ theme }) => theme.colors.main};

	align-items: center;
	justify-content: center;

	border-radius: ${RFValue(30)}px;
`;

export const MyCarsButtonWrapper = styled(Animated.View)`
	position: absolute;
	bottom: 13px;
	right: 22px;
`;
