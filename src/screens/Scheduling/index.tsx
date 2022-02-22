import React from 'react';
import { useTheme } from 'styled-components';

import { StatusBar } from 'react-native';
import { BackButton } from '../../components/BackButton';
import ArrowSvg from '../../assets/arrow.svg';

import {
	Container,
	Header,
	Title,
	RentalPeriod,
	DateInfo,
	DateTitle,
	DateValue,
	Content,
	Footer,
} from './styles';
import { Button } from '../../components/Button';

export function Scheduling() {
	const theme = useTheme();

	return (
		<Container>
			<Header>
				<StatusBar
					barStyle="light-content"
					translucent
					backgroundColor="transparent"
				/>
				<BackButton onPress={() => {}} color={theme.colors.shape} />

				<Title>
					Escolha uma {'\n'}
					data de início e {'\n'}
					fim do aluguel
				</Title>

				<RentalPeriod>
					<DateInfo>
						<DateTitle>DE</DateTitle>
						<DateValue selected={false}>28/02/2022</DateValue>
					</DateInfo>

					<ArrowSvg />

					<DateInfo>
						<DateTitle>ATÉ</DateTitle>
						<DateValue selected={false}>05/03/2022</DateValue>
					</DateInfo>
				</RentalPeriod>
			</Header>

			<Content></Content>

			<Footer>
				<Button title="Confirmar" onPress={() => {}} />
			</Footer>
		</Container>
	);
}
