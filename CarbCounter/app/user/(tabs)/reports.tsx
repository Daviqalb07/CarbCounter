import NutritionInfo from '@/components/NutritionInfo';
import { ScrollView } from "react-native";
import { View } from 'react-native';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Box } from '@/components/ui/box';
import { Button, ButtonIcon } from '@/components/ui/button';
import { ChevronDownIcon, ChevronRightIcon } from '@/components/ui/icon';
import {
    Select,
    SelectTrigger,
    SelectInput,
    SelectIcon,
    SelectPortal,
    SelectBackdrop,
    SelectContent,
    SelectDragIndicatorWrapper,
    SelectDragIndicator,
    SelectItem
} from '@/components/ui/select';
import { Divider } from '@/components/ui/divider';
import { useState } from 'react';
import { router } from "expo-router";

const ReportScreen = () => {
    const [selectedRange, setSelectedRange] = useState(7);

    const reportsData = [
        { date: '10 set 2024', calories: 600, carbs: 110 },
        { date: '09 set 2024', calories: 600, carbs: 110 },
        { date: '08 set 2024', calories: 600, carbs: 110 },
        { date: '07 set 2024', calories: 600, carbs: 110 },
    ];

    const handleTimeRangeSelection = (value: string) => {
        setSelectedRange(Number(value))
    }

    return (
        <View className="flex-1 p-4 mt-4">
            <HStack className="justify-between items-center">
                <Text className="text-2xl text-black font-bold">
                    Relatórios
                </Text>

                <Select
                    initialLabel="Últimos 7 dias"
                    selectedValue={selectedRange.toString()}
                    onValueChange={handleTimeRangeSelection}
                >
                    <SelectTrigger variant="rounded" size="md" className="w-44 border-primary-400 justify-between" >
                        <SelectInput className="text-primary-400" />
                        <SelectIcon className="mr-2 text-primary-400" as={ChevronDownIcon} />
                    </SelectTrigger>
                    <SelectPortal >
                        <SelectBackdrop />
                        <SelectContent >
                            <SelectDragIndicatorWrapper >
                                <SelectDragIndicator />
                            </SelectDragIndicatorWrapper>
                            <SelectItem label="Últimos 7 dias" value="7" />
                            <SelectItem label="Últimos 14 dias" value="14" />
                            <SelectItem label="Último mês" value="30" />
                        </SelectContent>
                    </SelectPortal>
                </Select>

            </HStack>

            <ScrollView >
                {reportsData.map((report, index) => (
                    <Box key={index} className="mt-4">
                        <VStack >
                            <Text className="font-bold text-xl">
                                {report.date}
                            </Text>

                            <Box className="my-2">
                                <NutritionInfo
                                    calories={report.calories}
                                    carbohydrates={report.carbs}
                                />
                            </Box>

                            <Button
                                variant="link"
                                className="justify-between px-2 mb-1"
                                onPress={() => {
                                    router.push("/user/reports/meals")
                                }}
                            >
                                <Text className="text-lg">Ver Refeições</Text>
                                <ButtonIcon as={ChevronRightIcon} />
                            </Button>

                            <Divider orientation="horizontal" className="mb-4" />
                        </VStack>
                    </Box>
                ))}
            </ScrollView>
        </View>
    );
};

export default ReportScreen;