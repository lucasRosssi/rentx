import React, { useEffect, useState } from 'react';
import { BackHandler, StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useNetInfo } from '@react-native-community/netinfo';
import { synchronize } from '@nozbe/watermelondb/sync';

import { database } from '../../database';
import { Car as ModelCar } from '../../database/models/Car';
import { api } from '../../services/api';

import Logo from '../../assets/logo.svg';
import { LoadingIndicator } from '../../components/LoadingIndicator';
import { Car } from '../../components/Car';

import { CarList, Container, Header, TotalCars } from './styles';

export function Home() {
	const [cars, setCars] = useState<ModelCar[]>([]);
	const [loading, setLoading] = useState(true);

	const navigation = useNavigation();
	const netInfo = useNetInfo();

	function handleCarDetails(car: ModelCar) {
		navigation.navigate('CarDetails', { car });
	}

	async function offlineSynchronize() {
		await synchronize({
			database,
			pullChanges: async ({ lastPulledAt }) => {
				const response = await api.get(
					`cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`
				);

				const { changes, latestVersion } = response.data;
				return { changes, timestamp: latestVersion };
			},
			pushChanges: async ({ changes }) => {
				const user = changes.users;
				if (user.updated.length > 0) {
					await api.post(`/users/sync`, user);
				}
			},
		});
	}

	useEffect(() => {
		let isMounted = true;

		async function fetchCars() {
			try {
				const carCollection = database.get<ModelCar>('cars');
				const cars = await carCollection.query().fetch();

				if (isMounted) {
					setCars(cars);
				}
			} catch (error) {
				console.log(error);
			} finally {
				if (isMounted) {
					setLoading(false);
				}
			}
		}

		fetchCars();
		return () => {
			isMounted = false;
		};
	}, []);

	useEffect(() => {
		if (netInfo.isConnected === true) {
			offlineSynchronize();
		}
	}, [netInfo.isConnected]);

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
