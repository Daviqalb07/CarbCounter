import { Box } from "./ui/box"
import { Text } from "./ui/text"

interface FoodItemCompleteInfoProps {
    name: string,
    portion: string,
    calories: number,
    carbohydrates: number
}

export default function FoodItemCompleteInfo(props: FoodItemCompleteInfoProps) {
    return (
        <Box className="flex-col mb-2">
            <Text className="font-bold text-lg">{props.name}</Text>
            <Text>Porção: {props.portion}</Text>
            <Text>Calorias: {props.calories} kcal</Text>
            <Text>Carboidratos: {props.carbohydrates} g CHO</Text>
        </Box>
    );
}