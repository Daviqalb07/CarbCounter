import { Heading } from '@/components/ui/heading';
import { Center } from "@/components/ui/center";
import { Input, InputField } from '@/components/ui/input';
import { Button, ButtonText } from "@/components/ui/button";
import { VStack } from '@/components/ui/vstack';
import { router } from 'expo-router';
import { FormControl, FormControlLabel, FormControlLabelText } from '@/components/ui/form-control';


export default function Index() {

  const handleLogin = () => {
    router.dismissAll()
    router.replace('/user')
  }

  return (
    <>
      <Heading
        className="color-primary-700 text-center mt-24"
        size="2xl"
      >
        CarbCounter
      </Heading>
      <Heading
        className="text-center mb-4"
        size="lg"
      >
        Acesse sua conta
      </Heading>
      <Center className="mt-24 mx-12">
        <VStack space="md" className="w-full">
          <FormControl>
            <FormControlLabel>
              <FormControlLabelText>Email</FormControlLabelText>
            </FormControlLabel>
            <Input className='w-full rounded-md p-2'>
              <InputField placeholder="Digite seu email" />
            </Input>
          </FormControl>
          <FormControl>
            <FormControlLabel>
              <FormControlLabelText>Senha</FormControlLabelText>
            </FormControlLabel>
            <Input className='w-full rounded-md p-2'>
              <InputField placeholder="Digite sua senha" />
            </Input>
          </FormControl>
          <Button
            className="mt-8 w-full p-2 rounded-md bg-primary-700"
            onPress={handleLogin}
          >
            <ButtonText className="text-center color-white">
              Entrar
            </ButtonText>
          </Button>
        </VStack>
      </Center>
    </>
  );
}
