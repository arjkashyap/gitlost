import { Box, Button } from "@chakra-ui/react";
import { Form, Formik, FormikHelpers } from "formik";
import { withUrqlClient } from "next-urql";
import router from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useCreateProjectMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { gqlToFormikMap } from "../utils/gqlToFormiMap";
import login from "./login";

interface PushProjectProps {}

const PushProject: React.FC<PushProjectProps> = ({}) => {
  const [, createProject] = useCreateProjectMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ name: "", description: "", content: "" }}
        onSubmit={async (values, { setErrors }) => {
          console.log(values);
          const { error } = await createProject(values);
          if (!error) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box mt={4}>
              <InputField
                name="name"
                placeholder="enter a title for your project"
                label="Project Title"
              />
            </Box>
            <Box mt={4}>
              <InputField
                name="description"
                placeholder="enter a short description for the project"
                label="Project Description"
              />
            </Box>
            <Box mt={4}>
              <InputField
                name="content"
                placeholder="<html></html>"
                label="HTML Content"
                textarea
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
                Create Project
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(PushProject);
