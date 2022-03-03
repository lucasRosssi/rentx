import React from 'react';
import { Pressable, PressableProps } from 'react-native';

import { Container, Title } from './styles';

interface ButtonProps extends PressableProps {
	title: string;
	color?: string;
}

export function Button({ title, color, disabled, ...rest }: ButtonProps) {
	return (
		<Pressable {...rest}>
			<Container color={color} enabled={!disabled}>
				<Title>{title}</Title>
			</Container>
		</Pressable>
	);
}
