import React from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from 'react-native-paper';
import { Control, useController } from 'react-hook-form';

interface TextInputProps extends RNTextInputProps {
  control: Control<any>;
  name: string;
  defaultValue?: string;
  rules?: Object;
}

export const MyTextInput: React.FC<TextInputProps> = ({
  control,
  name,
  rules,
  defaultValue,
  ...rest
}) => {
  const { field, fieldState } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  return (
    <RNTextInput
      value={field.value}
      onChangeText={field.onChange}
      onBlur={field.onBlur}
      {...rest}
    />
  );
};
