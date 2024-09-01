import React from 'react';
import { Image } from './ui/image';
import { Card } from './ui/card';
import { VStack } from './ui/vstack';
import { HStack } from './ui/hstack';
import { Text } from './ui/text';
import { Box } from './ui/box';

interface MealCardProps {
    mealName: string,
    mealTime: string,
    calories: number,
    carbs: number,
    imageUrl: string
}

const MealCard = (props: MealCardProps) => {
    return (
        <Box className="px-5 mb-5">
            <Card className="bg-white rounded-xl overflow-hidden shadow p-0">
                <Image
                    className="w-full h-32"
                    resizeMode="cover"
                    source={{ uri: props.imageUrl }}
                    alt="Meal Image"
                />
                <HStack className="w-full flex-row justify-between items-center">
                    <VStack className="p-4 w-1/2">
                        <Text className="text-lg font-bold text-black">{props.mealName}</Text>
                        <Text className="text-sm text-gray-500">{props.mealTime}</Text>
                    </VStack>
                    <VStack className="p-4 w-1/2 flex-end">
                        <HStack className="gap-2">
                            <Text className="text-lg text-black">{props.calories} kcal</Text>
                            <Text className="text-lg text-black">{props.carbs}g CHO</Text>
                        </HStack>
                    </VStack>
                </HStack>
            </Card >
        </Box>
    );
};

export default MealCard