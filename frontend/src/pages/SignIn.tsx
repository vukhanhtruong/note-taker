import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Fieldset,
  Container,
  Input,
  Button,
  Stack,
  Box,
  Heading,
} from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { Toaster, toaster } from "@/components/ui/toaster";
import { userAPI, SignInDTO } from "@/services/users";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(5, "Password must be at least 5 characters")
    .required("Password is required"),
});

export const SignIn: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInDTO>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data: SignInDTO) => {
    try {
      const response = await userAPI.signIn(data);

      if (response?.status === 200) {
        const responseData = response.data;
        localStorage.setItem("token", responseData.result.token);
        navigate("/dashboard");
      } else {
        toaster.create({
          title: "Login failed.",
          description: "Invalid email or password, please try again.",
          type: "error",
        });
      }
    } catch (e) {
      toaster.create({
        title: "Something went wrong",
        description: e.message,
        type: "error",
      });
    }
  };

  return (
    <Container centerContent>
      <Fieldset.Root
        size="lg"
        maxW="320px"
        invalid={Object.keys(errors).length > 0}
      >
        <Fieldset.Legend>
          <Heading size="4xl">Sign In</Heading>
        </Fieldset.Legend>
        <Fieldset.Content>
          <Stack as="form" onSubmit={handleSubmit(onSubmit)}>
            <Field label="Email" invalid={!!errors.email}>
              <Input placeholder="Email" {...register("email")} />
            </Field>
            <Field label="Password" invalid={!!errors.password}>
              <Input
                type="password"
                placeholder="Password"
                {...register("password")}
              />
            </Field>
            <Button colorScheme="teal" type="submit" w="full">
              Submit
            </Button>
          </Stack>
        </Fieldset.Content>
        <Fieldset.ErrorText position="absolute" bottom="-50px">
          <Box as="ul" listStyleType="circle" marginLeft="20px">
            {Object.keys(errors).length > 0 &&
              Object.entries(errors).map(([field, error]) => (
                <li key={field}>{error.message}</li>
              ))}
          </Box>
        </Fieldset.ErrorText>
      </Fieldset.Root>
      <Toaster />
    </Container>
  );
};
