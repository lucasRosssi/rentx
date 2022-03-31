import React, { useState } from 'react';
import { FlatList, StatusBar } from 'react-native';
import { useTheme } from 'styled-components';

import { Car as ModelCar } from '../../database/models/Car';
import { api } from '../../services/api';

import { AntDesign } from '@expo/vector-icons';
import { BackButton } from '../../components/BackButton';
import { Car } from '../../components/Car';
import { LoadingIndicator } from '../../components/LoadingIndicator';

import {
	Container,
	Header,
	Title,
	Subtitle,
	Content,
	Appointments,
	AppointmentsTitle,
	AppointmentsQuantity,
	CarWrapper,
	CarFooter,
	CarFooterTitle,
	CarFooterPeriod,
	CarFooterDate,
} from './styles';
import { format } from 'date-fns';
import { getPlatformDate } from '../../utils/getPlatformDate';
import { useFocusEffect } from '@react-navigation/native';

interface DataProps {
	id: string;
	car: ModelCar;
	start_date: string;
	end_date: string;
}

export function MyCars() {
	const [cars, setCars] = useState<DataProps[]>([]);
	const [loading, setLoading] = useState(true);

	const theme = useTheme();

	useFocusEffect(() => {
		async function fetchCars() {
			try {
				const response = await api.get('/rentals');
				const dataFormatted = response.data.map((data: DataProps) => {
					return {
						id: data.id,
						car: data.car,
						start_date: format(
							getPlatformDate(new Date(data.start_date)),
							'dd/MM/yyyy'
						),
						end_date: format(
							getPlatformDate(new Date(data.end_date)),
							'dd/MM/yyyy'
						),
					};
				});
				setCars(dataFormatted);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		}

		fetchCars();
	});

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
					Seus agendamentos{'\n'}
					estão aqui
				</Title>
				<Subtitle>Conforto, segurança e praticidade</Subtitle>
			</Header>

			<Content>
				<Appointments>
					<AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
					<AppointmentsQuantity>
						{loading ? '' : cars.length}
					</AppointmentsQuantity>
				</Appointments>

				{loading ? (
					<LoadingIndicator />
				) : (
					<FlatList
						data={cars}
						keyExtractor={(item) => item.id}
						showsVerticalScrollIndicator={false}
						renderItem={({ item }) => (
							<CarWrapper>
								<Car data={item.car} disabled />
								<CarFooter>
									<CarFooterTitle>Período</CarFooterTitle>
									<CarFooterPeriod>
										<CarFooterDate>{item.start_date}</CarFooterDate>
										<AntDesign
											name="arrowright"
											size={20}
											color={theme.colors.title}
											style={{ marginHorizontal: 10 }}
										/>
										<CarFooterDate>{item.end_date}</CarFooterDate>
									</CarFooterPeriod>
								</CarFooter>
							</CarWrapper>
						)}
					/>
				)}
			</Content>
		</Container>
	);
}
