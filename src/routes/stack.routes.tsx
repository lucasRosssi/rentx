import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Splash } from '../screens/Splash';
import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { Scheduling } from '../screens/Scheduling';
import { SchedulingDetails } from '../screens/SchedulingDetails';
import { SchedulingComplete } from '../screens/SchedulingComplete';
import { MyCars } from '../screens/MyCars';

import { CarDTO } from '../dtos/CarDTO';
import { SignIn } from '../screens/SignIn';

export type RootStackParamList = {
	Splash: undefined;
	SignIn: undefined;
	Home: undefined;
	CarDetails: { car: CarDTO };
	Scheduling: { car: CarDTO };
	SchedulingDetails: { car: CarDTO; dates: string[] };
	SchedulingComplete: undefined;
	MyCars: undefined;
};

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

export function StackRoutes() {
	return (
		<Navigator initialRouteName="SignIn">
			<Screen
				name="Splash"
				component={Splash}
				options={{
					headerShown: false,
				}}
			/>
			<Screen
				name="SignIn"
				component={SignIn}
				options={{
					headerShown: false,
					animation: 'none',
					gestureEnabled: false,
				}}
			/>
			<Screen
				name="Home"
				component={Home}
				options={{
					headerShown: false,
					animation: 'none',
					gestureEnabled: false,
				}}
			/>
			<Screen
				name="CarDetails"
				component={CarDetails}
				options={{
					headerShown: false,
				}}
			/>
			<Screen
				name="Scheduling"
				component={Scheduling}
				options={{
					headerShown: false,
				}}
			/>
			<Screen
				name="SchedulingDetails"
				component={SchedulingDetails}
				options={{
					headerShown: false,
				}}
			/>
			<Screen
				name="SchedulingComplete"
				component={SchedulingComplete}
				options={{
					headerShown: false,
				}}
			/>
			<Screen
				name="MyCars"
				component={MyCars}
				options={{
					headerShown: false,
				}}
			/>
		</Navigator>
	);
}
