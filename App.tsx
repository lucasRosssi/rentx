import React from 'react';
import { LogBox } from 'react-native';
import AppLoading from 'expo-app-loading';
import {
	useFonts,
	Archivo_400Regular,
	Archivo_500Medium,
	Archivo_600SemiBold,
} from '@expo-google-fonts/archivo';
import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';

import theme from './src/styles/theme';
import { ThemeProvider } from 'styled-components';
import { AppProvider } from './src/hooks';

import { Routes } from './src/routes';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

LogBox.ignoreLogs([
	"[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

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
			<AppProvider>
				<GestureHandlerRootView style={{ flex: 1 }}>
					<Routes />
				</GestureHandlerRootView>
			</AppProvider>
		</ThemeProvider>
	);
}
