export const MILESTONE_DAYS = [3, 7, 14, 21, 30, 50, 100] as const;
export type MilestoneDay = typeof MILESTONE_DAYS[number];

export const MILESTONE_META: Record<MilestoneDay, { label: string; badge: string; message: string }> = {
    3:   { label: "First Wave",      badge: "🌊", message: "You've made your first splash. The ocean awaits!" },
    7:   { label: "Tide Rider",      badge: "🐬", message: "A full week riding the tide. You're in the current now!" },
    14:  { label: "Deep Diver",      badge: "🤿", message: "Two weeks deep. You're exploring waters most never reach." },
    21:  { label: "Ocean Scout",     badge: "🔱", message: "21 days — you've mapped your course. The horizon is yours." },
    30:  { label: "Pod Leader",      badge: "🐋", message: "A full month. You lead the pod now — others follow your wake." },
    50:  { label: "Reef Guardian",   badge: "🪸", message: "50 days. You've become part of the reef — steady and alive." },
    100: { label: "Ocean Sovereign", badge: "🌐", message: "100 days. The ocean bows to no one — and neither do you." },
};

export function getMilestone(days: number): MilestoneDay | null {
    return (MILESTONE_DAYS as readonly number[]).includes(days)
        ? (days as MilestoneDay)
        : null;
}


// export const MILESTONE_DAYS = [3, 7, 14, 21, 30, 50, 100] as const;
// export type MilestoneDay = typeof MILESTONE_DAYS[number];
 
// export const MILESTONE_META: Record<MilestoneDay, { label: string; badge: string; message: string }> = {
//     3:   { label: "3-Day Streak",    badge: "🌱", message: "You're building a habit. Keep it up!" },
//     7:   { label: "1-Week Warrior",  badge: "🔥", message: "A full week of learning. You're on fire!" },
//     14:  { label: "2-Week Streak",   badge: "⚡", message: "Two weeks strong. Your German is growing!" },
//     21:  { label: "21-Day Champion", badge: "💎", message: "21 days — science says this is now a habit!" },
//     30:  { label: "30-Day Legend",   badge: "🏆", message: "One whole month. Truly legendary dedication!" },
//     50:  { label: "50-Day Master",   badge: "👑", message: "50 days. You're in rare company now." },
//     100: { label: "100-Day King",    badge: "🌟", message: "100 days. You are unstoppable." },
// };
 
// export function getMilestone(days: number): MilestoneDay | null {
//     return (MILESTONE_DAYS as readonly number[]).includes(days)
//         ? (days as MilestoneDay)
//         : null;
// }