import React from 'react';
import { useTheme } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeSvg from '../assets/home.svg';
import CarSvg from '../assets/car.svg';
import PeopleSvg from '../assets/people.svg';

import { Home } from '../screens/Home';
import { MyCars } from '../screens/MyCars';
import { AppStackRoutes } from './app.stack.routes';
import { Platform } from 'react-native';

export type AppTabRootParamList = {
	HomeStack: undefined;
	Profile: undefined;
	MyCars: undefined;
};

const { Navigator, Screen } = createBottomTabNavigator<AppTabRootParamList>();

export function AppTabRoutes() {
	const theme = useTheme();

	return (
		<Navigator
			initialRouteName="HomeStack"
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				tabBarActiveTintColor: theme.colors.main,
				tabBarInactiveTintColor: theme.colors.text_detail,
				tabBarStyle: {
					paddingVertical: Platform.OS === 'ios' ? 20 : 0,
					height: RFValue(78),
					backgroundColor: theme.colors.background_primary,
				},
			}}
		>
			<Screen
				name="HomeStack"
				component={AppStackRoutes}
				options={{
					tabBarIcon: ({ color }) => (
						<HomeSvg width={RFValue(24)} height={RFValue(24)} fill={color} />
					),
				}}
			/>
			<Screen
				name="Profile"
				component={Home}
				options={{
					tabBarIcon: ({ color }) => (
						<PeopleSvg width={RFValue(24)} height={RFValue(24)} fill={color} />
					),
				}}
			/>
			<Screen
				name="MyCars"
				component={MyCars}
				options={{
					tabBarIcon: ({ color }) => (
						<CarSvg width={RFValue(24)} height={RFValue(24)} fill={color} />
					),
				}}
			/>
		</Navigator>
	);
}
