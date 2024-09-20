import React from 'react';
import { View, Text } from 'react-native';
import { HStack } from '@/components/ui/hstack';
import { Button } from '@/components/ui/button';
import { Icon, ChevronRightIcon, AddIcon } from '@/components/ui/icon';
import { Avatar } from '@/components/ui/avatar';

interface ViewerItemProps {
    name: string
}
const ViewerItem = (props: ViewerItemProps) => {
    const name = props.name
    return (
        <Button
            onPress={() => console.log('Ver perfil de', name)}
            variant="link"
            className="h-16 w-full my-2 justify-between items-center border-b border-gray-300"
        >

            <HStack className="items-center">
                <Avatar className="mr-4 bg-primary-500">
                    <Text className="text-2xl text-white">{name.charAt(0)}</Text>
                </Avatar>
                <Text className="text-xl">{name}</Text>
            </HStack>

            <Icon as={ChevronRightIcon} />
        </Button>
    )
}
export default function ViewersScreen() {
    const professionals = [
        { name: "Carla" },
        { name: "Synara" }
    ];

    const supervisors = [
        { name: "Danielo" }
    ];

    return (
        <View className="flex-1 p-4">
            <Text className="text-2xl font-bold my-4">
                Profissionais
            </Text>

            {professionals.map((professional) => (
                <ViewerItem
                    name={professional.name}
                />
            ))}

            <Text className="text-2xl font-bold my-4">
                Supervisores
            </Text>

            {supervisors.map((supervisor) => (
                <ViewerItem
                    name={supervisor.name}
                />
            ))}

            <Button
                className="absolute bottom-10 right-4 bg-primary-500 w-20 h-20 rounded-full items-center justify-center shadow-lg p-0"
                onPress={() => console.log("ADDING VIEWER")}
            >

                <Icon as={AddIcon} className="text-white h-12 w-12" />
            </Button>
        </View>
    );
};

