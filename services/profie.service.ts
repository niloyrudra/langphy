import api from "@/lib/api";
import { AxiosPromise } from "axios";

export const resetPassword = async ( password: string ) : Promise<AxiosPromise> => {
    const res = await api.put(
        "/users/profile/reset-password",
        {
            password
        }
    );
    return res
}