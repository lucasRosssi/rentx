import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { api } from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';

import { Ionicons } from '@expo/vector-icons';
import Logo from '../../assets/logo.svg';
import { LoadingIndicator } from '../../components/LoadingIndicator';
import { Car } from '../../components/Car';

import { CarList, Container, Header, TotalCars, MyCarsButton } from './styles';

export function Home() {
	const [cars, setCars] = useState<CarDTO[]>([]);
	const [loading, setLoading] = useState(true);

	const theme = useTheme();
	const navigation = useNavigation();

	function handleCarDetails(car: CarDTO) {
		navigation.navigate('CarDetails', { car });
	}

	function handleOpenMyCars() {
		navigation.navigate('MyCars');
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

				<TotalCars>{loading ? '' : `Total de ${cars.length} carros`}</TotalCars>
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

			<MyCarsButton onPress={handleOpenMyCars}>
				<Ionicons
					name="ios-car-sport"
					size={RFValue(32)}
					color={theme.colors.shape}
				/>
			</MyCarsButton>
		</Container>
	);
}
