import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { Center } from "@/components/ui/center";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button"
import { Divider } from '@/components/ui/divider';
import { router } from 'expo-router';
import { Link, LinkText } from '@/components/ui/link';


export default function Index() {
  return (
    <>
      <Heading
        className="color-primary-700 text-center mt-24"
        size="2xl"
      >
        CarbCounter
      </Heading>

      <Center className="mt-24 px-10 items-center">
        <Heading className="text-center px-12 mb-4" size="xl">
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
          <Link
            onPress={() => router.navigate('/signup/user')}>
            <LinkText className='color-primary-700'>Cadastre-se</LinkText>
          </Link>
          <Text>!</Text>
        </Box>

        <Divider orientation='horizontal' />

        <Box className='flex flex-row justify-center my-4'>
          <Text>Vai acompanhar alguém?</Text>
        </Box>

        <Button
          action="default"
          className="w-full mx-12 p-2 rounded-md bg-transparent border border-gray-300"
          onPress={() => router.navigate('/signup/professional')}
        >
          <ButtonText className="text-center color-primary-700">Sou Profissional</ButtonText>
        </Button>

        <Button
          action="default"
          className="w-full mx-12 my-4 p-2 rounded-md bg-transparent border border-gray-300"
          onPress={() => router.navigate('/signup/supervisor')}
        >
          <ButtonText className="text-center color-primary-700">Sou Supervisor</ButtonText>
        </Button>
      </Center >
    </>
  );
}
