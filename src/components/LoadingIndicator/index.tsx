import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';

interface LoadingIndicatorProps {
	color?: string;
}

export function LoadingIndicator({ color }: LoadingIndicatorProps) {
	const theme = useTheme();

	return (
		<ActivityIndicator
			color={color ? color : theme.colors.main}
			size="large"
			style={{ flex: 1 }}
		/>
	);
}
