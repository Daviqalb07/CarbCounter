import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { Icon, ChevronRightIcon } from '@/components/ui/icon';

interface ListItemProps {
  onPress: () => void,
  label: string,
  itemColor: string
}
const ListItem = (props: ListItemProps) => (
  <Button
    onPress={props.onPress}
    variant="link"
    className="h-14 my-2 border-b border-gray-300 justify-between"
  >
    <ButtonText className={`text-lg text-${props.itemColor} font-normal`}>{props.label}</ButtonText>
    <Icon as={ChevronRightIcon} className={`text-${props.itemColor}`} />
  </Button>
);

export default function ProfileScreen() {
  return (
    <View className="flex-1 px-10 py-4">
      <Text className="text-2xl text-black text-center font-bold my-6">Perfil</Text>

      <ListItem
        label={"Editar perfil"}
        onPress={() => console.log("Ver profissionais e supervisores")}
        itemColor="black"
      />

      <ListItem
        label={"Ver profissionais e supervisores"}
        onPress={() => console.log("Editar perfil")}
        itemColor="black"
      />

      <ListItem
        label={"Sobre o CarbCounter"}
        onPress={() => console.log("Sobre o Carbcounter")}
        itemColor="black"
      />

      <ListItem
        label="Sair"
        onPress={() => console.log("Sair")}
        itemColor="red-500"
      />


    </View >
  );
};
