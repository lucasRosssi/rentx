import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { SignIn } from '../screens/SignIn';
import { SignUpFirstStep } from '../screens/SignUp/SignUpFirstStep';
import { SignUpSecondStep } from '../screens/SignUp/SignUpSecondStep';
import { Confirmation, ConfirmationProps } from '../screens/Confirmation';

import { UserDTO } from '../dtos/UserDTO';
import { AppStackRoutes } from './app.stack.routes';
import { AuthSplash } from '../screens/AuthSplash';

export type AuthRootParamList = {
	AuthSplash: undefined;
	SignIn: undefined;
	SignUpFirstStep: undefined;
	SignUpSecondStep: { user: UserDTO };
	Confirmation: ConfirmationProps;
	HomeStack: undefined;
};

const { Navigator, Screen } = createStackNavigator<AuthRootParamList>();

export function AuthRoutes() {
	return (
		<Navigator
			initialRouteName="AuthSplash"
			screenOptions={{ headerShown: false }}
		>
			<Screen
				name="AuthSplash"
				component={AuthSplash}
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
			<Screen
				name="HomeStack"
				component={AppStackRoutes}
				options={{
					animationEnabled: false,
				}}
			/>
		</Navigator>
	);
}
