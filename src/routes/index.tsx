import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AuthRoutes } from './auth.routes';
import { useAuth } from '../hooks/auth';
import { AppStackRoutes } from './app.stack.routes';

export function Routes() {
	const { user } = useAuth();

	return (
		<NavigationContainer>
			{user.id ? <AppStackRoutes /> : <AuthRoutes />}
		</NavigationContainer>
	);
}
