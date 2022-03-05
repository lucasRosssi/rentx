import React, { useRef, useState } from 'react';
import { FlatList, ViewToken } from 'react-native';

import {
	Container,
	ImageIndexes,
	ImageIndex,
	CarImageWrapper,
	CarImage,
} from './styles';

interface ImageSliderProps {
	imageUrl: string[];
}

interface ChangeIndexProps {
	viewableItems: ViewToken[];
	changed: ViewToken[];
}

export function ImageSlider({ imageUrl }: ImageSliderProps) {
	const [imageIndex, setImageIndex] = useState(0);

	const imageIndexIndicator = imageUrl.map((_, index) => (
		<ImageIndex key={String(index)} active={index === imageIndex} />
	));

	const indexChanged = useRef((info: ChangeIndexProps) => {
		const index = info.viewableItems[0].index!;
		setImageIndex(index);
	});

	return (
		<Container>
			<ImageIndexes>{imageIndexIndicator}</ImageIndexes>

			<FlatList
				data={imageUrl}
				keyExtractor={(key) => key}
				renderItem={({ item }) => (
					<CarImageWrapper>
						<CarImage source={{ uri: item }} resizeMode="contain" />
					</CarImageWrapper>
				)}
				horizontal
				showsHorizontalScrollIndicator={false}
				onViewableItemsChanged={indexChanged.current}
			/>
		</Container>
	);
}
