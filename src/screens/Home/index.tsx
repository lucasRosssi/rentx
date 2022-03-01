import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';

import { api } from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';

import Logo from '../../assets/logo.svg';
import { LoadingIndicator } from '../../components/LoadingIndicator';
import { Car } from '../../components/Car';

import { CarList, Container, Header, TotalCars } from './styles';

export function Home() {
	const [cars, setCars] = useState<CarDTO[]>([]);
	const [loading, setLoading] = useState(true);
	const navigation = useNavigation();

	function handleCarDetails() {
		navigation.navigate('CarDetails');
	}

	useEffect(() => {
		async function fetchCars() {
			try {
				const response = await api.get('/cars');
				setCars(response.data);
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
			<StatusBar
				barStyle="light-content"
				backgroundColor="transparent"
				translucent
			/>
			<Header>
				<Logo
					width={RFValue(108)}
					height={RFValue(12)}
					style={{ marginBottom: RFValue(4) }}
				/>

				<TotalCars>Total de 12 carros</TotalCars>
			</Header>

			{loading ? (
				<LoadingIndicator />
			) : (
				<CarList
					data={cars}
					keyExtractor={(item) => String(item.id)}
					renderItem={({ item }) => (
						<Car data={item} onPress={handleCarDetails} />
					)}
				/>
			)}
		</Container>
	);
}
