// import api from "@/lib/api";
// import { AxiosPromise } from "axios";

export const speechEvaluate = async (formData: FormData) : Promise<Response> => {
    const res = await fetch(
            `${process.env.EXPO_PUBLIC_API_BASE}/speech/evaluate`,
            {
                method: "POST",
                body: formData,
            }
        );
    return res;
}

export const getSpeechResultByJobId = async (job_id: string) : Promise<Response> => { // AxiosPromise
    // const res = await api.get(`/speech/result/${job_id}`);
    const res = await fetch(`${process.env.EXPO_PUBLIC_API_BASE}/speech/result/${job_id}`);
    return res;
}