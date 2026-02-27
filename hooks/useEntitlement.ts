import { useEffect, useState } from "react"

export const useEntitlement = () => {
    const [ isPremium, setIsPremium ] = useState<boolean>(false);

    useEffect(() => {}, []);

    return {
        isPremium
    }
}