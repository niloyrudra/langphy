import api from "@/lib/api";
import * as SecureStore from "expo-secure-store";

export const signIn = async (email: string, password: string) => {
  const { data } = await api.post("/users/signin", {
    email,
    password,
  });

  await SecureStore.setItemAsync("accessToken", data.accessToken);
  return data.user;
};

export const signUp = async (email: string, password: string) => {
  const { data } = await api.post("/users/signup", {
    email,
    password,
  });

  await SecureStore.setItemAsync("accessToken", data.accessToken);
  return data.user;
};

export const signOut = async () => {
  await SecureStore.deleteItemAsync("accessToken");
};