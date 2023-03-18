import { Box, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useLoginMutation } from "../generated/graphql";
import { gqlToFormikMap } from "../utils/gqlToFormiMap";
import register from "./register";

interface loginProps {}
const Login: React.FC<loginProps> = ({}) => {
  const router = useRouter();
  const [, login] = useLoginMutation();
  // const [, register] = useRegisterMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login(values);
          if (response.data?.login.errors) {
            setErrors(gqlToFormikMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            // user logged in
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box mt={4}>
              <InputField
                name="username"
                placeholder="please enter your username"
                label="Username"
              />
            </Box>
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="please enter your password"
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
                Login{" "}
              </Button>{" "}
            </Box>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Login;
