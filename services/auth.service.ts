import api from "@/lib/api";
import { AxiosPromise } from "axios";
// import * as SecureStore from "expo-secure-store";

export const signIn = async (email: string, password: string) : Promise<AxiosPromise> => {
  const res = await api.post(
    "/users/signin",
    {
      email,
      password,
    }
  );
  return res;
};

export const signUp = async (email: string, password: string) : Promise<AxiosPromise> => {
  const res = await api.post(
    "/users/signup",
    {
      email,
      password,
    }
  );
  return res;
};

export const resetPasswordByEmail = async (email: string, password: string) : Promise<AxiosPromise> => {
  // try {
    const res = await api.put(
      `/users/reset-password`,
      {
        email,
        password
      }
    );
    return res;
  // }
  // catch(error) {
  //   console.error("resetPasswordByEmail error:", error);
  //   return null;
  // }
};

export const signOut = async () : Promise<AxiosPromise> => {
  const res = await api.post("/users/signout");
  return res;
};
// export const signOut = async () => {
//   await SecureStore.deleteItemAsync("accessToken");
// };