import React from 'react';
import { Pressable, PressableProps } from 'react-native';
import { useTheme } from 'styled-components';
import { LoadingIndicator } from '../LoadingIndicator';

import { Container, Title } from './styles';

interface ButtonProps extends PressableProps {
	title: string;
	color?: string;
	isLoading?: boolean;
}

export function Button({
	title,
	color,
	isLoading,
	disabled,
	...rest
}: ButtonProps) {
	const theme = useTheme();

	return (
		<Pressable {...rest}>
			<Container color={color} enabled={!disabled}>
				{isLoading ? (
					<LoadingIndicator color={theme.colors.shape} />
				) : (
					<Title>{title}</Title>
				)}
			</Container>
		</Pressable>
	);
}
