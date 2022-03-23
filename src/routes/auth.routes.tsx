import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { Splash } from '../screens/Splash';
import { SignIn } from '../screens/SignIn';
import { SignUpFirstStep } from '../screens/SignUp/SignUpFirstStep';
import { SignUpSecondStep } from '../screens/SignUp/SignUpSecondStep';
import { Confirmation, ConfirmationProps } from '../screens/Confirmation';

import { CarDTO } from '../dtos/CarDTO';
import { UserDTO } from '../dtos/UserDTO';

export type AuthRootParamList = {
	Splash: undefined;
	SignIn: undefined;
	SignUpFirstStep: undefined;
	SignUpSecondStep: { user: UserDTO };
	Confirmation: ConfirmationProps;
};

const { Navigator, Screen } = createStackNavigator<AuthRootParamList>();

export function AuthRoutes() {
	return (
		<Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
			<Screen
				name="Splash"
				component={Splash}
				options={{
					animationEnabled: false,
				}}
			/>
			<Screen
				name="SignIn"
				component={SignIn}
				options={{
					gestureEnabled: false,
				}}
			/>
			<Screen name="SignUpFirstStep" component={SignUpFirstStep} />
			<Screen name="SignUpSecondStep" component={SignUpSecondStep} />
			<Screen name="Confirmation" component={Confirmation} />
		</Navigator>
	);
}
