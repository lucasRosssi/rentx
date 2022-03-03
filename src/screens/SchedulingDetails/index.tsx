import React, { useEffect, useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';

import { api } from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { getPlatformDate } from '../../utils/getPlatformDate';
import { format } from 'date-fns';

import { Feather } from '@expo/vector-icons';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Button } from '../../components/Button';

import {
	Container,
	Header,
	CarImages,
	Content,
	Details,
	Description,
	Brand,
	Name,
	Rent,
	Period,
	Price,
	Accessories,
	Footer,
	RentalPeriod,
	CalendarIcon,
	DateInfo,
	DateTitle,
	DateValue,
	RentalPrice,
	RentalPriceDetails,
	RentalPriceLabel,
	RentalPriceQuota,
	RentalPriceTotal,
} from './styles';
import { Alert } from 'react-native';

interface Params {
	car: CarDTO;
	dates: string[];
}

interface RentalPeriod {
	start: string;
	end: string;
}

export function SchedulingDetails() {
	const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
		{} as RentalPeriod
	);

	const theme = useTheme();
	const navigation = useNavigation();
	const route = useRoute();
	const { car, dates } = route.params as Params;

	const carAccessories = car.accessories.map((accessory) => (
		<Accessory
			key={accessory.type}
			name={accessory.name}
			icon={getAccessoryIcon(accessory.type)}
		/>
	));

	async function handleConfirmRental() {
		try {
			const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);

			const unavailable_dates = [
				...schedulesByCar.data.unavailable_dates,
				...dates,
			];

			api
				.put(`/schedules_bycars/${car.id}`, {
					id: car.id,
					unavailable_dates,
				})
				.then(() => navigation.navigate('SchedulingComplete'))
				.catch(() => Alert.alert('Não foi possível confirmar o agendamento'));
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		setRentalPeriod({
			start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
			end: format(
				getPlatformDate(new Date(dates[dates.length - 1])),
				'dd/MM/yyyy'
			),
		});
	}, []);

	return (
		<Container>
			<Header>
				<BackButton />
			</Header>

			<CarImages>
				<ImageSlider imageUrl={car.photos} />
			</CarImages>

			<Content>
				<Details>
					<Description>
						<Brand>{car.brand}</Brand>
						<Name>{car.name}</Name>
					</Description>

					<Rent>
						<Period>{car.rent.period}</Period>
						<Price>R$ {car.rent.price}</Price>
					</Rent>
				</Details>

				<Accessories>{carAccessories}</Accessories>

				<RentalPeriod>
					<CalendarIcon>
						<Feather
							name="calendar"
							size={RFValue(24)}
							color={theme.colors.shape}
						/>
					</CalendarIcon>

					<DateInfo>
						<DateTitle>DE</DateTitle>
						<DateValue>{rentalPeriod.start}</DateValue>
					</DateInfo>

					<Feather
						name="chevron-right"
						size={RFValue(10)}
						color={theme.colors.text}
					/>

					<DateInfo>
						<DateTitle>ATÉ</DateTitle>
						<DateValue>{rentalPeriod.end}</DateValue>
					</DateInfo>
				</RentalPeriod>

				<RentalPrice>
					<RentalPriceLabel>TOTAL</RentalPriceLabel>
					<RentalPriceDetails>
						<RentalPriceQuota>
							R$ {car.rent.price} x{dates.length} diárias
						</RentalPriceQuota>
						<RentalPriceTotal>
							R$ {car.rent.price * dates.length}
						</RentalPriceTotal>
					</RentalPriceDetails>
				</RentalPrice>
			</Content>

			<Footer>
				<Button
					title="Agendar agora"
					color={theme.colors.success}
					onPress={handleConfirmRental}
				/>
			</Footer>
		</Container>
	);
}
