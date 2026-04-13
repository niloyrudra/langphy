import { ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/theme/ThemeContext';
import ProfileNameAndId from './_partials/ProfileNameAndId';
import ProfileDOBAndEmail from './_partials/ProfileDOBAndEmail';
import ProfileStats from './_partials/ProfileStats';
import EditButton from './_partials/EditButton';
import { DBProfile } from '@/db/profile.repo';
import { getCompletedLessons } from '@/db/progress.repo';

const TOTAL_LESSON_COUNT: number = 7728+7711+7711+7711+2385+2385;

const UserProfile = ({profile, isLoading, isFetching}: {profile: DBProfile | null, isLoading: boolean, isFetching: boolean}) => {
    const { colors } = useTheme();
    const displayName = React.useCallback(() => {
        if(!isLoading) {
            if( !profile?.first_name && !profile?.last_name ) return "Anonymous"
            else if( profile?.first_name && !profile?.last_name ) return profile?.first_name
            else if( !profile?.first_name && profile?.last_name ) return profile?.last_name
            else if( profile.first_name && profile.last_name ) return profile.first_name + " " + profile.last_name
            else return "Anonymous"
        } 
    }, [profile?.first_name, profile?.last_name, isLoading]);

    const [progressPercent, setProgressPercent] = React.useState<number>(0.0)

    React.useEffect(() => {
        const loadLessonData = async () => {
            try {
                const completedLessonCount = await getCompletedLessons();
                const progressPercentage = completedLessonCount > 0 ? ( (completedLessonCount/TOTAL_LESSON_COUNT)*100 ).toFixed(1) : 0;
                // const progressPercentage = completedLessonCount > 0 ? Math.round( (completedLessonCount/TOTAL_LESSON_COUNT)*100 )/100 : 0;
                setProgressPercent(progressPercentage as number);
            }
            catch(error) {
                console.error("Profile Stats loadLessonData error:", error);
            }
        }
        loadLessonData();
    }, []);

    // console.log(progressPercent)

    if (isLoading || isFetching) {
        return (
            <LinearGradient
                colors={[colors.profileGradientLight, colors.profileGradientDark]}
                style={styles.topCard}
            >
                <ActivityIndicator size={32} color={colors.primary} />
            </LinearGradient>
        );
    }

    return (
        <LinearGradient
            colors={[colors.profileGradientLight, colors.profileGradientDark]}
            style={styles.topCard}
        >
            {/* Profile Edit Button */}
            <EditButton />

            {/* Name and ID */}
            <ProfileNameAndId
                displayName={displayName() ?? ""}
                username={profile?.username ?? "..."}
            />

            {/* Birth Date and Email Address */}
            <ProfileDOBAndEmail
                email={profile?.email ?? "..."}
                joinAt={profile?.created_at ?? ""}
            />

            {/* Stats */}
            <ProfileStats progressPercent={progressPercent} />
        </LinearGradient>
    );
}

export default UserProfile;

const styles = StyleSheet.create({
  topCard: {
    borderRadius: 16,
    padding: 20,
    position: "relative"
  }
})