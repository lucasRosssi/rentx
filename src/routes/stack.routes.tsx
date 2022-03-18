import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Splash } from '../screens/Splash';
import { SignIn } from '../screens/SignIn';
import { SignUpFirstStep } from '../screens/SignUp/SignUpFirstStep';
import { SignUpSecondStep } from '../screens/SignUp/SignUpSecondStep';
import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { Scheduling } from '../screens/Scheduling';
import { SchedulingDetails } from '../screens/SchedulingDetails';
import { Confirmation, ConfirmationProps } from '../screens/Confirmation';
import { MyCars } from '../screens/MyCars';

import { CarDTO } from '../dtos/CarDTO';
import { UserDTO } from '../dtos/UserDTO';

export type RootStackParamList = {
	Splash: undefined;
	SignIn: undefined;
	SignUpFirstStep: undefined;
	SignUpSecondStep: { user: UserDTO };
	Home: undefined;
	CarDetails: { car: CarDTO };
	Scheduling: { car: CarDTO };
	SchedulingDetails: { car: CarDTO; dates: string[] };
	Confirmation: ConfirmationProps;
	MyCars: undefined;
};

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

export function StackRoutes() {
	return (
		<Navigator initialRouteName="SignIn" screenOptions={{ headerShown: false }}>
			<Screen name="Splash" component={Splash} />
			<Screen
				name="SignIn"
				component={SignIn}
				options={{
					gestureEnabled: false,
				}}
			/>
			<Screen
				name="SignUpFirstStep"
				component={SignUpFirstStep}
				options={{
					animation: 'slide_from_right',
				}}
			/>
			<Screen
				name="SignUpSecondStep"
				component={SignUpSecondStep}
				options={{
					animation: 'slide_from_right',
				}}
			/>
			<Screen
				name="Home"
				component={Home}
				options={{
					animation: 'none',
					gestureEnabled: false,
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
