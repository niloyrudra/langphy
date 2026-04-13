import api from "@/lib/api";
import { AxiosPromise } from "axios";

export const signIn = async (email: string, password: string) : Promise<AxiosPromise> => {
  const res = await api.post(
    "/users/signin/",
    {
      email,
      password,
    }
  );
  return res;
};

// export const signUp = async (email: string, password: string) : Promise<AxiosPromise> => {
//   const res = await api.post(
//     "/users/signup",
//     {
//       email,
//       password,
//     }
//   );
//   return res;
// };

export const requestOtp = (email: string, password: string) =>
    api.post("/users/signup/request-otp", { email, password });

export const verifyOtp = (email: string, password: string, otp: string) =>
    api.post("/users/signup/verify-otp", { email, password, otp });

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
  const res = await api.post("/users/signout/");
  return res;
};