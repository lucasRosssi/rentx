import { FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

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

export const CarList = styled(FlatList).attrs({
	contentContainerStyle: { padding: 24 },
	showsVerticalScrollIndicator: false,
})``;
