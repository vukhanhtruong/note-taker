import React from "react";
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
import { useNavigate } from "react-router-dom";
import { userAPI, SignUpDTO } from "@/services/users";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

export const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpDTO>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data: SignUpDTO) => {
    try {
      const response = await userAPI.signUp(data);

      if (response?.status === 200) {
        toaster.create({
          title: "Sign up successfully",
          description: "Navigating to sign-in page",
          type: "success",
        });

        setTimeout(() => {
          navigate("/signin");
        }, 1000);
      }
    } catch (error) {
      toaster.create({
        title: error.response.data.message,
        // description: error.message,
        type: "error",
      });
      console.error(error);
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
          <Heading size="4xl">Sign Up</Heading>
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
            <Field label="Confirm Password" invalid={!!errors.confirmPassword}>
              <Input
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword")}
              />
            </Field>
            <Button colorScheme="teal" type="submit" w="full">
              Submit
            </Button>
          </Stack>
        </Fieldset.Content>
        <Fieldset.ErrorText position="absolute" bottom="-70px">
          {Object.keys(errors).length > 0 && (
            <Box as="ul" listStyleType="circle" marginLeft="20px">
              {Object.entries(errors).map(([field, error]) => (
                <li key={field}>{error.message}</li>
              ))}
            </Box>
          )}
        </Fieldset.ErrorText>
        <Toaster />
      </Fieldset.Root>
    </Container>
  );
};
