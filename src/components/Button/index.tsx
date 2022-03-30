import React from 'react';
import { ActivityIndicator, Pressable, PressableProps } from 'react-native';
import { useTheme } from 'styled-components';

import { Container, Title } from './styles';

interface ButtonProps extends PressableProps {
	title: string;
	color?: string;
	textColor?: string;
	isLoading?: boolean;
}

export function Button({
	title,
	color,
	textColor,
	isLoading,
	disabled,
	...rest
}: ButtonProps) {
	const theme = useTheme();

	return (
		<Pressable disabled={disabled} {...rest}>
			<Container color={color} enabled={!disabled}>
				{isLoading ? (
					<ActivityIndicator color={theme.colors.shape} />
				) : (
					<Title textColor={textColor}>{title}</Title>
				)}
			</Container>
		</Pressable>
	);
}
