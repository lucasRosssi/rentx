import React, { useEffect, useState } from 'react';
import { BackHandler, StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

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

	function handleCarDetails(car: CarDTO) {
		navigation.navigate('CarDetails', { car });
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

	useFocusEffect(() => {
		const backHandler = BackHandler.addEventListener(
			'hardwareBackPress',
			() => true
		);

		return () => backHandler.remove();
	});

	return (
		<Container>
			<StatusBar
				barStyle="light-content"
				backgroundColor="transparent"
				translucent
			/>
			<Header>
				<Logo width={108} height={12} style={{ marginBottom: RFValue(4) }} />

				<TotalCars>
					{loading ? '' : `Total de ${cars.length} automóveis`}
				</TotalCars>
			</Header>

			{loading ? (
				<LoadingIndicator />
			) : (
				<CarList
					data={cars}
					keyExtractor={(item) => String(item.id)}
					renderItem={({ item }) => (
						<Car data={item} onPress={() => handleCarDetails(item)} />
					)}
				/>
			)}
		</Container>
	);
}
