import { useAuth } from "@/context/AuthContext"
import { useProfile } from "@/context/ProfileContext";
import { useStreaks } from "@/context/StreaksContext";

export const useDashboard = () => {
    const { user } = useAuth();
    const { profile } = useProfile();
    const { streaks } = useStreaks();

    return {
        user,
        profile,
        streaks
    }
}