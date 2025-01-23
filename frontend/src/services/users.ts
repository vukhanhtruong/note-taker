import { AxiosResponse } from "axios";
import axios from "../helpers/axios";

export interface SignInDTO {
  email?: string;
  password?: string;
}

export interface SignUpDTO {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const signIn = async (data: SignInDTO): Promise<AxiosResponse> => {
  try {
    return await axios("/v1/users/signin", {
      method: "POST",
      data: { email: data.email, password: data.password },
    });
  } catch (error) {
    console.error("SignIn: ", error);
  }
};

const signUp = async (data: SignUpDTO): Promise<AxiosResponse> => {
  try {
    return await axios("/v1/users/signup", {
      method: "POST",
      data: { email: data.email, password: data.password },
    });
  } catch (error) {
    console.error("Error updating note: ", error);
  }
};
export const userAPI = { signIn, signUp };
