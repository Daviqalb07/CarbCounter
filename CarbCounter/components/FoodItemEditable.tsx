import { Box } from "./ui/box";
import { Text } from "./ui/text";
import { Button, ButtonIcon } from "./ui/button";
import { EditIcon, CloseCircleIcon } from "./ui/icon";

interface FoodItemEditableProps {
    name: string,
    portion: string,
    onEdit: () => void,
    onDelete: () => void
}

export default function FoodItemEditable(props: FoodItemEditableProps) {
    return (
        <Box className="flex-row items-center justify-between mb-2">
            <Text className="font-bold">{props.name}</Text>

            <Box className="flex-row items-center space-x-4">
                <Text className="mr-5">{props.portion}</Text>

                <Button
                    action="default"
                    className="p-2 bg-transparent"
                    onPress={props.onEdit}
                >
                    <ButtonIcon as={EditIcon} className="text-typography-500" />
                </Button>

                <Button
                    action="default"
                    className="p-2 bg-transparent"
                    onPress={props.onDelete}
                >
                    <ButtonIcon as={CloseCircleIcon} className="text-red-500" />
                </Button>

            </Box>
        </Box>
    );
}