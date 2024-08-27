import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { Center } from "@/components/ui/center";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button"
import { Pressable } from '@/components/ui/pressable';
import { router } from 'expo-router';


export default function Index() {

  return (
    <>
      <Heading
        className="color-primary-700 text-center mt-24"
        size="2xl"
      >
        CarbCounter
      </Heading>

      <Center className="mt-24 px-12 items-center">
        <Heading className="text-center px-12" size="xl">
          Inicie uma revolução na sua vida alimentar.
        </Heading>

        <Button
          className="w-full mx-12 p-2 rounded-md bg-primary-700"
          onPress={() => router.navigate('/login')}
        >
          <ButtonText className="text-center color-white">Entrar</ButtonText>
        </Button>

        <Box className='flex flex-row justify-center my-4'>
          <Text>Não tem conta? </Text>
          <Pressable onPress={() => router.navigate('/signup/user')}>
            <Text underline className='color-primary-700'>Cadastre-se</Text>
          </Pressable>
          <Text>!</Text>
        </Box>

        <Box className="bg-gray-300 mx-12 h-[1px]" />

        <Box className='flex flex-row justify-center my-4'>
          <Text>Vai acompanhar alguém?</Text>
        </Box>

        <Button
          className="w-full mx-12 p-2 rounded-md bg-transparent border border-gray-300"
          onPress={() => router.navigate('/signup/professional')}
        >
          <ButtonText className="text-center color-primary-700">Sou Profissional</ButtonText>
        </Button>

        <Button
          className="w-full mx-12 my-4 p-2 rounded-md bg-transparent border border-gray-300"
          onPress={() => router.navigate('/signup/supervisor')}
        >
          <ButtonText className="text-center color-primary-700">Sou Supervisor</ButtonText>
        </Button>
      </Center >
    </>
  );
}
