import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AuthRoutes } from './auth.routes';
import { useAuth } from '../hooks/auth';
import { AppStackRoutes } from './app.stack.routes';
import { LoadingIndicator } from '../components/LoadingIndicator';

export function Routes() {
	const { user, isLoading } = useAuth();

	if (isLoading) {
		return <LoadingIndicator />;
	} else {
		return (
			<NavigationContainer>
				{user.id ? <AppStackRoutes /> : <AuthRoutes />}
			</NavigationContainer>
		);
	}
}
