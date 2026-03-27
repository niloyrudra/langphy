import api from "@/lib/api";
import { NlpData } from "@/types";
import { AxiosRequestConfig } from "axios";

export const fetchNLPData = async ( data: NlpData, config?: AxiosRequestConfig ) => {
    try {
        const res = await api.post(
            "/nlp/analyze/lesson",
            data,
            config
        );
        return res;
    }
    catch( error ) {
        console.warn("fetchNLPData error:", error);
        throw error;
    }
}

export const analysisNLP = async (expectedText: string, textContent: string) => {
    try {
        const res = await api.post( `/nlp/analyze/answer`, {
            expected: expectedText.trim(),
            user_answer: textContent.trim()
        });
        if ( res.status !== 200 ) return null;
        return res?.data ?? null;
    }
    catch(error) {
        console.error("Analysis NLP API service error:", error);
    }
}