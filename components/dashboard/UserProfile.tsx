import { ActivityIndicator, Alert, StyleSheet, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import EditButton from './_partials/EditButton';
import { useTheme } from '@/theme/ThemeContext';
import ProfileNameAndId from './_partials/ProfileNameAndId';
import ProfileDOBAndEmail from './_partials/ProfileDOBAndEmail';
import ProfileStats from './_partials/ProfileStats';
import { useAuth } from '@/context/AuthContext';

const UserProfile = () => {
    const { colors } = useTheme();
    const { user, setUser } = useAuth();
    const [ loading, setLoading ] = React.useState<boolean>(false)

    React.useEffect(() => {
        const profileData = async () => {
        if (!user?.id) {
            Alert.alert("User not loaded yet");
            return;
        }
        
        try {
            setLoading(true)
            const res = await fetch(`${process.env.EXPO_PUBLIC_API_BASE}/profile/${user.id}`);

            if (!res?.ok) {
                const text = await res.text(); // NOT json
                console.error("Profile fetch failed:", res.status, text);
                return;
            }

            const {profile, message} = await res.json();

            if(profile) setUser({
                id: user?.id ?? "",
                email: user?.email ?? "",
                created_at: user?.created_at,
                provider: user?.provider ?? "",
                first_name: profile.first_name ?? "",
                last_name: profile.last_name ?? "",
                username: profile.username ?? "",
                profile_image: profile.profile_image ?? "",
            });

            if(message) Alert.alert(message);
            
        }
        catch(err) {
            setLoading(false)
        }
        finally {
            setLoading(false)
        }
        }
        if(user?.id) profileData();
    }, [user?.id]);

    return (
        <LinearGradient
            colors={[colors.profileGradientLight, colors.profileGradientDark]}
            style={styles.topCard}
        >
            {
                loading
                    ? (
                        <View style={{justifyContent: "center", alignItems:"center"}}>
                            <ActivityIndicator size={32} color={colors.primary} />
                        </View>
                        )
                    : (
                        <>
                            {/* Profile Edit Button */}
                            <EditButton />

                            {/* Name and ID */}
                            <ProfileNameAndId />

                            {/* Birth Date and Email Address */}
                            <ProfileDOBAndEmail />

                            {/* Stats */}
                            <ProfileStats />
                        </>
                    )
            }
            
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