import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { AppSplash } from '../screens/AppSplash';
import { CarDetails } from '../screens/CarDetails';
import { Scheduling } from '../screens/Scheduling';
import { SchedulingDetails } from '../screens/SchedulingDetails';
import { Confirmation, ConfirmationProps } from '../screens/Confirmation';
import { MyCars } from '../screens/MyCars';

import { Car as ModelCar } from '../database/models/Car';
import { AppTabRoutes } from './app.tab.routes';
import { CarDTO } from '../dtos/CarDTO';

export type AppStackRootParamList = {
	AppSplash: undefined;
	HomeTab: undefined;
	CarDetails: { car: ModelCar };
	Scheduling: { car: CarDTO };
	SchedulingDetails: { car: CarDTO; dates: string[] };
	Confirmation: ConfirmationProps;
	MyCars: undefined;
};

const { Navigator, Screen } = createStackNavigator<AppStackRootParamList>();

export function AppStackRoutes() {
	return (
		<Navigator
			initialRouteName="AppSplash"
			screenOptions={{ headerShown: false }}
		>
			<Screen name="AppSplash" component={AppSplash} />

			<Screen
				name="HomeTab"
				component={AppTabRoutes}
				options={{
					gestureEnabled: false,
					animationEnabled: false,
				}}
			/>
			<Screen name="CarDetails" component={CarDetails} />
			<Screen name="Scheduling" component={Scheduling} />
			<Screen name="SchedulingDetails" component={SchedulingDetails} />
			<Screen name="Confirmation" component={Confirmation} />
			<Screen name="MyCars" component={MyCars} />
		</Navigator>
	);
}
