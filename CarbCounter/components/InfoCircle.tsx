import { View } from "react-native"
import { Text } from "./ui/text"

interface InfoCircleProps {
    value: number,
    text: string,
    color: string
}

export default function InfoCircle(props: InfoCircleProps) {
    return (
        <View
            className="w-24 h-24 rounded-full border-4 flex justify-center items-center"
            style={{ borderColor: props.color }}
        >
            <Text className="text-2xl font-bold" style={{ color: props.color }}>
                {props.value}
            </Text>
            <Text className="text-base" style={{ color: props.color }}>
                {props.text}
            </Text>
        </View>
    );
}