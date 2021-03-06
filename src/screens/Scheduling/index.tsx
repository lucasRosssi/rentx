import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';

import { format } from 'date-fns';
import { getPlatformDate } from '../../utils/getPlatformDate';
import { CarDTO } from '../../dtos/CarDTO';

import { StatusBar } from 'react-native';
import { BackButton } from '../../components/BackButton';
import ArrowSvg from '../../assets/arrow.svg';
import { Button } from '../../components/Button';
import {
	Calendar,
	DayProps,
	generateInterval,
	MarkedDatesProps,
} from '../../components/Calendar';

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

interface RentalPeriod {
	start: number;
	startFormatted: string;
	end: number;
	endFormatted: string;
}

interface Params {
	car: CarDTO;
}

export function Scheduling() {
	const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>(
		{} as DayProps
	);
	const [markedDates, setMarkedDates] = useState<MarkedDatesProps>(
		{} as MarkedDatesProps
	);
	const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
		{} as RentalPeriod
	);

	const noSelectedPeriod = !rentalPeriod.start || !rentalPeriod.end;

	const theme = useTheme();
	const navigation = useNavigation();
	const route = useRoute();
	const { car } = route.params as Params;

	function handleConfirmRental() {
		if (!rentalPeriod.start || !rentalPeriod.end) {
			return;
		}
		navigation.navigate('SchedulingDetails', {
			car,
			dates: Object.keys(markedDates),
		});
	}

	function handleChangeDate(date: DayProps) {
		let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
		let end = date;

		if (start.timestamp > end.timestamp) {
			start = end;
			end = start;
		}

		setLastSelectedDate(end);
		const interval = generateInterval(start, end);
		setMarkedDates(interval);

		const firstDate = Object.keys(interval)[0];
		const lastDate = Object.keys(interval)[Object.keys(interval).length - 1];

		setRentalPeriod({
			start: start.timestamp,
			end: end.timestamp,
			startFormatted: format(
				getPlatformDate(new Date(firstDate)),
				'dd/MM/yyyy'
			),
			endFormatted: format(getPlatformDate(new Date(lastDate)), 'dd/MM/yyyy'),
		});
	}

	return (
		<Container>
			<Header>
				<StatusBar
					barStyle="light-content"
					translucent
					backgroundColor="transparent"
				/>
				<BackButton color={theme.colors.shape} />

				<Title>
					Escolha uma {'\n'}
					data de in??cio e {'\n'}
					fim do aluguel
				</Title>

				<RentalPeriod>
					<DateInfo>
						<DateTitle>DE</DateTitle>
						<DateValue selected={!!rentalPeriod.startFormatted}>
							{rentalPeriod.startFormatted}
						</DateValue>
					</DateInfo>

					<ArrowSvg />

					<DateInfo>
						<DateTitle>AT??</DateTitle>
						<DateValue selected={!!rentalPeriod.endFormatted}>
							{rentalPeriod.endFormatted}
						</DateValue>
					</DateInfo>
				</RentalPeriod>
			</Header>

			<Content>
				<Calendar markedDates={markedDates} onDayPress={handleChangeDate} />
			</Content>

			<Footer>
				<Button
					title={noSelectedPeriod ? 'Selecione um per??odo' : 'Confirmar'}
					onPress={handleConfirmRental}
					disabled={noSelectedPeriod}
					color={
						noSelectedPeriod ? theme.colors.text_detail : theme.colors.main
					}
				/>
			</Footer>
		</Container>
	);
}
