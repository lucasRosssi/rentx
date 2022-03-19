import React, { useRef, useState } from 'react';
import { FlatList, ViewToken } from 'react-native';
import { BulletIndicator } from '../BulletIndicator';

import { Container, CarImageWrapper, CarImage } from './styles';

interface ImageSliderProps {
	imageUrl: {
		id: string;
		photo: string;
	}[];
}

interface ChangeIndexProps {
	viewableItems: ViewToken[];
	changed: ViewToken[];
}

export function ImageSlider({ imageUrl }: ImageSliderProps) {
	const [imageIndex, setImageIndex] = useState(0);

	const indexChanged = useRef((info: ChangeIndexProps) => {
		const index = info.viewableItems[0].index!;
		setImageIndex(index);
	});

	return (
		<Container>
			<BulletIndicator length={imageUrl.length} isActive={imageIndex} />

			<FlatList
				data={imageUrl}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<CarImageWrapper>
						<CarImage
							source={{ uri: item.photo }}
							resizeMode="contain"
							style={{ height: 230 }}
						/>
					</CarImageWrapper>
				)}
				horizontal
				showsHorizontalScrollIndicator={false}
				onViewableItemsChanged={indexChanged.current}
			/>
		</Container>
	);
}
