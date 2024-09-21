import { Box } from "./ui/box"
import { HStack } from "./ui/hstack"
import { Text } from "./ui/text"

interface NutritionInfoProps {
    calories: number,
    carbohydrates: number
}

const NutritionInfo = (props: NutritionInfoProps) => {
    return (
        <HStack className="justify-between items-center gap-5">
            <Box className="flex-1 flex-col gap-2 bg-white rounded-lg px-5 py-2 mx-1">
                <Text className="text-center text-lg font-bold">Calorias</Text>
                <Box className="flex flex-row gap-1 items-end justify-center">
                    <Text className="text-center text-2xl text-primary-700">{props.calories}</Text>
                    <Text className="text-primary-700 text-lg">kcal</Text>
                </Box>
            </Box>
            <Box className="flex-1 flex-col gap-2 bg-white rounded-lg px-5 py-2 mx-1">
                <Text className="text-center text-lg font-bold">Carboidratos</Text>
                <Box className="flex flex-row gap-1 items-end justify-center">
                    <Text className="text-center text-2xl text-primary-700">{props.carbohydrates}</Text>
                    <Text className="text-primary-700 text-lg">g</Text>
                </Box>
            </Box>
        </HStack>
    )
}

export default NutritionInfo