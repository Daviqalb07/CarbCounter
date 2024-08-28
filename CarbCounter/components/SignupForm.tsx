import React from 'react';
import {
    View,
    Text,
    TextInput,
    KeyboardTypeOptions
} from 'react-native';
import {
    FormControl,
    FormControlLabel,
    FormControlLabelText,
    FormControlErrorText
} from '@/components/ui/form-control';
import {
    ButtonText,
    Button
} from './ui/button';


export interface SignupFormField {
    name: string;
    value: string;
    placeholder: string;
    error?: string;
    keyboardType?: KeyboardTypeOptions;
    secureTextEntry?: boolean;
    onChangeText: (text: string) => void;
}

export interface SignupFormProps {
    fields: SignupFormField[];
    onSubmit: () => void;
}

export function SignupForm(props: SignupFormProps) {
    return (
        <View className='flex-1 bg-white px-5 justify-center'>
            <Text className='text-3xl font-bold text-center mb-2.5 color-primary-700'>CarbCounter</Text>
            <Text className='text-xl font-medium text-center mb-5'>Crie sua conta</Text>

            {props.fields.map((field, index) => (
                <FormControl key={index} isInvalid={!!field.error} className='mb-3.5'>
                    <FormControlLabel>
                        <FormControlLabelText className='font-semibold text-lg'>{field.name}</FormControlLabelText>
                    </FormControlLabel>
                    <TextInput
                        className='border border-[#ccc] rounded-lg p-2.5 mt-1'
                        value={field.value}
                        onChangeText={field.onChangeText}
                        placeholder={field.placeholder}
                        keyboardType={field.keyboardType}
                        secureTextEntry={field.secureTextEntry}
                    />
                    {field.error && <FormControlErrorText>{field.error}</FormControlErrorText>}
                </FormControl>
            ))}

            <Button className='bg-primary-700 rounded-lg p-3' onPress={props.onSubmit}>
                <ButtonText className='text-white text-base text-center'>Cadastrar</ButtonText>
            </Button>
        </View>
    );
}


