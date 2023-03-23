import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
  Textarea,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  placeholder: string;
  textarea?: boolean;
  helperFont?: string;
  helperFontSize?: "large" | "medium" | "small";
};

export const InputField: React.FC<InputFieldProps> = ({
  size: _,
  textarea = false,
  ...props
}) => {
  let InputOrTextArea = Input;
  if (textarea) {
    InputOrTextArea = Textarea as any;
  }
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor="name">{props.label}</FormLabel>
      <InputOrTextArea {...field} id={field.name} {...props} />
      <FormHelperText
        fontSize={props.helperFontSize ? props.helperFontSize : "small"}
      >
        {props.helperFont}
      </FormHelperText>
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
