import React from "react";
import { Formik, Form } from "formik";
import { Input } from "@chakra-ui/input";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { Box, Button } from "@chakra-ui/react";
import { useMutation } from "urql";
import { RegisterDocument, useRegisterMutation } from "../generated/graphql";
import { gqlToFormikMap } from "../utils/gqlToFormiMap";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [, register] = useRegisterMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: "", username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register(values);
          if (response.data?.register.errors) {
            setErrors(gqlToFormikMap(response.data.register.errors));
          } else if (response.data?.register.user) {
            // user logged in
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box mt={4}>
              <InputField
                name="email"
                placeholder="please enter a valid email"
                label="Emai"
              />
            </Box>
            <Box mt={4}>
              <InputField
                name="username"
                placeholder="please enter a unique username"
                label="Username"
              />
            </Box>
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="choose a strong password"
                label="Password"
                type="password"
              />
            </Box>
            <Box mt={4}>
              <Button
                mt={4}
                type="submit"
                w="100%"
                isLoading={isSubmitting}
                colorScheme="teal"
              >
                Register{" "}
              </Button>{" "}
            </Box>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
