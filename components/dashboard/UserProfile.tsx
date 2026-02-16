import { ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import EditButton from './_partials/EditButton';
import { useTheme } from '@/theme/ThemeContext';
import ProfileNameAndId from './_partials/ProfileNameAndId';
import ProfileDOBAndEmail from './_partials/ProfileDOBAndEmail';
import ProfileStats from './_partials/ProfileStats';
import { useProfile } from '@/hooks/useProfile';
import { authSnapshot } from '@/snapshots/authSnapshot';

const UserProfile = () => {
    const { colors } = useTheme();
    const userId = authSnapshot.getUserId() ?? "";
    const { data: profile, isLoading, isFetching } = useProfile(userId as string);

    const displayName = React.useCallback(() => {
        if(!isLoading) {
            if( !profile?.first_name && !profile?.last_name ) return "Anonymous"
            else if( profile?.first_name && !profile?.last_name ) return profile?.first_name
            else if( !profile?.first_name && profile?.last_name ) return profile?.last_name
            else if( profile.first_name && profile.last_name ) return profile.first_name + " " + profile.last_name
            else return "Anonymous"
        } 
    }, [profile?.first_name, profile?.last_name, isLoading]);

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
            <ProfileStats />
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