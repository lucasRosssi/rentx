import React from 'react';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components';
import {
	useFonts,
	Archivo_400Regular,
	Archivo_500Medium,
	Archivo_600SemiBold,
} from '@expo-google-fonts/archivo';
import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';

import { Home } from './src/screens/Home';
import theme from './src/styles/theme';
import { CarDetails } from './src/screens/CarDetails';
import { Scheduling } from './src/screens/Scheduling';
import { SchedulingDetails } from './src/screens/SchedulingDetails';

export default function App() {
	const [fontsLoaded] = useFonts({
		Archivo_400Regular,
		Archivo_500Medium,
		Archivo_600SemiBold,
		Inter_400Regular,
		Inter_500Medium,
	});

	if (!fontsLoaded) {
		return <AppLoading />;
	}

	return (
		<ThemeProvider theme={theme}>
			<SchedulingDetails />
		</ThemeProvider>
	);
}
