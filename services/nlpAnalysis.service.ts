import api from "@/lib/api";

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