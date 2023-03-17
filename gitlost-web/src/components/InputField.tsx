import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  placeholder: string;
  helperFont?: string;
  helperFontSize?: "large" | "medium" | "small";
};

export const InputField: React.FC<InputFieldProps> = ({
  size: _,
  ...props
}) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor="name">{props.label}</FormLabel>
      <Input
        {...field}
        id={field.name}
        {...props}
        placeholder={props.placeholder}
      />
      <FormHelperText
        fontSize={props.helperFontSize ? props.helperFontSize : "small"}
      >
        {props.helperFont}
      </FormHelperText>
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
