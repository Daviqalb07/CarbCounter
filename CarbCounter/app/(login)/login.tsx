import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { Center } from "@/components/ui/center";
import { Input, InputField } from '@/components/ui/input';
import { Button, ButtonText } from "@/components/ui/button";
import { VStack } from '@/components/ui/vstack';


export default function Index() {
  return (
    <>
      <Heading
        className="color-primary-700 text-center mt-24"
        size="2xl"
      >
        CarbCounter
      </Heading>
      <Heading
        className="text-center -mt-4 mb-4"
        size="lg"
      >
        Acesse sua conta
      </Heading>
      <Center className="mt-24 mx-12">
        <VStack space="xl" className="mb-8">
          <Text>Email</Text>
          <Input className='w-full mb-2 rounded-md p-2'>
            <InputField placeholder="Digite seu email" />
          </Input>
          <Text>Senha</Text>
          <Input className='w-full rounded-md p-2'>
            <InputField placeholder="Digite sua senha" />
          </Input>
        </VStack>
        <Button size="sm" className="w-full p-2 rounded-md bg-primary-700">
          <ButtonText className="text-center color-white">Entrar</ButtonText>
        </Button>
      </Center>
    </>
  );
}
