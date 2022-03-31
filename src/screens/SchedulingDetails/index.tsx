import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useNetInfo } from '@react-native-community/netinfo';

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
	const [loading, setLoading] = useState(false);

	const netInfo = useNetInfo();
	const theme = useTheme();
	const navigation = useNavigation();
	const route = useRoute();
	const { car, dates } = route.params as Params;
	const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);

	const carAccessories =
		carUpdated.accessories &&
		carUpdated.accessories.map((accessory) => (
			<Accessory
				key={accessory.type}
				name={accessory.name}
				icon={getAccessoryIcon(accessory.type)}
			/>
		));

	async function handleConfirmRental() {
		setLoading(true);
		try {
			api
				.post(`/rentals`, {
					user_id: 1,
					car_id: car.id,
					start_date: new Date(dates[0]),
					end_date: new Date(dates[dates.length - 1]),
					total: dates.length * car.price,
				})
				.then(() =>
					navigation.navigate('Confirmation', {
						title: 'Carro alugado!',
						message: `Agora você só precisa ir\naté a concessionária da RENTX\npegar o seu automóvel`,
						nextNavigation: 'Home',
					})
				)
				.catch(() => {
					setLoading(false);
					Alert.alert('Não foi possível confirmar o agendamento');
				});
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
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

	useEffect(() => {
		async function fetchOnlineData() {
			const response = await api.get(`/cars/${car.id}`);
			setCarUpdated(response.data);
		}

		if (netInfo.isConnected === true) {
			fetchOnlineData();
		}
	}, [netInfo.isConnected]);

	return (
		<Container>
			<Header>
				<BackButton />
			</Header>

			<CarImages>
				<ImageSlider
					imageUrl={
						!!carUpdated.photos
							? carUpdated.photos
							: [{ id: car.thumbnail, photo: car.thumbnail }]
					}
				/>
			</CarImages>

			<Content>
				<Details>
					<Description>
						<Brand>{car.brand}</Brand>
						<Name>{car.name}</Name>
					</Description>

					<Rent>
						<Period>{car.period}</Period>
						<Price>R$ {car.price}</Price>
					</Rent>
				</Details>

				{carUpdated.accessories && <Accessories>{carAccessories}</Accessories>}

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
							R$ {car.price} x{dates.length} diárias
						</RentalPriceQuota>
						<RentalPriceTotal>R$ {car.price * dates.length}</RentalPriceTotal>
					</RentalPriceDetails>
				</RentalPrice>
			</Content>

			<Footer>
				<Button
					title="Agendar agora"
					color={theme.colors.success}
					onPress={handleConfirmRental}
					isLoading={loading}
					disabled={loading}
				/>
			</Footer>
		</Container>
	);
}
