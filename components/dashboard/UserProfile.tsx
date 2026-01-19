import { ActivityIndicator, Alert, StyleSheet, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import EditButton from './_partials/EditButton';
import { useTheme } from '@/theme/ThemeContext';
import ProfileNameAndId from './_partials/ProfileNameAndId';
import ProfileDOBAndEmail from './_partials/ProfileDOBAndEmail';
import ProfileStats from './_partials/ProfileStats';
import { useProfile } from '@/context/ProfileContext';

const UserProfile = () => {
    const { colors } = useTheme();
    const {profile, refreshProfile, loading} = useProfile();

    React.useEffect(() => {
        (async () => !profile && refreshProfile())()
    }, [profile]);

    if (loading) {
        return (
            <LinearGradient
                colors={[colors.profileGradientLight, colors.profileGradientDark]}
                style={styles.topCard}
            >
                <ActivityIndicator size={32} color={colors.primary} />
            </LinearGradient>
        );
    }

    // if (!profile) return null;

    return (
        <LinearGradient
            colors={[colors.profileGradientLight, colors.profileGradientDark]}
            style={styles.topCard}
        >
            {/* Profile Edit Button */}
            <EditButton />

            {/* Name and ID */}
            <ProfileNameAndId />

            {/* Birth Date and Email Address */}
            <ProfileDOBAndEmail />

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