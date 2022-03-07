import React, { useEffect, useState } from 'react';
import { FlatList, StatusBar } from 'react-native';
import { useTheme } from 'styled-components';

import { CarDTO } from '../../dtos/CarDTO';
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

interface CarProps {
	id: string;
	user_id: string;
	car: CarDTO;
	startDate: string;
	endDate: string;
}

export function MyCars() {
	const [cars, setCards] = useState<CarProps[]>([]);
	const [loading, setLoading] = useState(true);

	const theme = useTheme();

	useEffect(() => {
		async function fetchCars() {
			try {
				const response = await api.get('/schedules_byuser?user_id=1');
				setCards(response.data);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		}

		fetchCars();
	}, []);

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
										<CarFooterDate>{item.startDate}</CarFooterDate>
										<AntDesign
											name="arrowright"
											size={20}
											color={theme.colors.title}
											style={{ marginHorizontal: 10 }}
										/>
										<CarFooterDate>{item.endDate}</CarFooterDate>
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
