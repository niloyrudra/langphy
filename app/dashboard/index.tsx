import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { ReactNode } from 'react'
import { useTheme } from '@/theme/ThemeContext';
import SIZES from '@/constants/size';
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from '@expo/vector-icons';
import { EditIconDark, EditIconLight, MilestonesGrdCardBgLight, ProfileLearningProgressCardBg, ProfileLessonIcon, ProfilePhraseIcon, ProfileStreaks_3_Icon, ProfileUnitIcon, ProfileWordsIcon, ProgressIcon, SteakIcon } from '@/utils/SVGImages';
import Title from '@/components/Title';
import { getCardContainerWidth } from '@/utils';
import { router } from 'expo-router';
import SafeAreaLayout from '@/components/layouts/SafeAreaLayout';
import { useAuth } from '@/context/AuthContext';
import LoadingScreenComponent from '@/components/LoadingScreenComponent';

type LearningProress = {
  id: number,
  learningCategoryTitle: string,
  score: number,
  ImgComponent: ReactNode
}

const learningProgressData: LearningProress[] = [
  {
    id: 1,
    learningCategoryTitle: "Total Words",
    score: 1000,
    ImgComponent: <ProfileWordsIcon />
  },
  {
    id: 2,
    learningCategoryTitle: "Total Phrases",
    score: 500,
    ImgComponent: <ProfilePhraseIcon />
  },
  {
    id: 3,
    learningCategoryTitle: "Total Units",
    score: 100,
    ImgComponent: <ProfileUnitIcon />
  },
  {
    id: 4,
    learningCategoryTitle: "Total Lessons",
    score: 40,
    ImgComponent: <ProfileLessonIcon />
  }
];

type Milestones = {
  id: number,
  milestonesTitle: string,
  isLocked: boolean;
  milestones: number,
  ImgComponent?: React.ReactNode
}

const milestonesData: Milestones[] = [
  {
    id: 1,
    milestonesTitle: "3 Day",
    isLocked: false,
    milestones: 3,
    ImgComponent: <ProfileStreaks_3_Icon />
  },
  {
    id: 2,
    milestonesTitle: "7 Day",
    isLocked: true,
    milestones: 7,
    ImgComponent: <ProfileStreaks_3_Icon />
  },
  {
    id: 3,
    milestonesTitle: "14 Day",
    isLocked: true,
    milestones: 14,
    ImgComponent: <ProfileStreaks_3_Icon />
  },
  {
    id: 4,
    milestonesTitle: "30 Day",
    isLocked: true,
    milestones: 30,
    ImgComponent: <ProfileStreaks_3_Icon />
  }
];

const Dashboard = () => {
  const { colors, theme } = useTheme();
  const { user, setUser } = useAuth();
  const [loading, setLoading] = React.useState<boolean>(false)

  React.useEffect(() => {
    const profileData = async () => {
      if (!user?.id) {
          Alert.alert("User not loaded yet");
          return;
      }
      console.log("User ID:",user?.id);
      try {
        setLoading(true)
        const res = await fetch(`${process.env.EXPO_PUBLIC_API_BASE}/profile/${user.id}`);

        // console.log("Profile", res)

        if (!res?.ok) {
          const text = await res.text(); // NOT json
          console.error("Profile fetch failed:", res.status, text);
          return;
        }

        const data = await res.json();

        console.log(data)
        const {profile, message} = data
        console.log("profile", profile)
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

  if(loading) return (<LoadingScreenComponent/>);

  return (
    <SafeAreaLayout>
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>

        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "flex-start",
            gap: 30
          }}
        >
          {/* User's Information */}
          <LinearGradient
            colors={[colors.profileGradientLight, colors.profileGradientDark]}
            style={styles.topCard}
          >
            {/* Profile Edit Button */}
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => router.push('/dashboard/profile-edit') }
            >
              {
                theme === "light"
                  ? (<EditIconLight width={28} height={28} />)
                  : (<EditIconDark width={28} height={28} />)
              }
            </TouchableOpacity>

            {/* Name and ID */}
            <View
              style={{
                gap: 5,
                marginBottom: 20,
                alignItems: "center"
              }}
            >
              <Text style={[styles.userDisplayName, {color: colors.text}]}>{user?.first_name ? `${user?.first_name} ${user?.last_name}` : 'Anonymous'}</Text>
              <Text style={[styles.userName, {color:colors.text}]}>User ID: {user?.username ?? "..."}</Text>
            </View>

            {/* Birth Date and Email Address */}
            <View
              style={{
                gap: 12,
                flexDirection: "row",
                marginBottom: 20,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent:"flex-start",
                  alignItems:"center",
                  gap: 4
                }}
              >
                <Ionicons name="calendar-outline" size={16} color={colors.text} />
                <Text style={[styles.userInfo, {color: colors.text}]}>{user?.created_at ? new Date( user.created_at ).toLocaleDateString() : '__/__/__'}</Text>
              </View>
              <View style={{width: 1, height: 10, backgroundColor: colors.text}} />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent:"flex-start",
                  alignItems:"center",
                  gap: 4
                }}
              >
                <Ionicons name="mail-outline" size={16} color={colors.text} />
                <Text style={[styles.userInfo, {color: colors.text}]}>{user?.email ?? "___"}</Text>
              </View>
            </View>

            {/* Stats */}
            <View
              style={{
                backgroundColor: colors.profileGradientBox,
                padding: 20,
                borderRadius: 12,
                flexDirection: "row",
                justifyContent:"space-evenly",
                alignItems: "center"
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  justifyContent:"center",
                  alignItems: "center",
                  gap: 5
                }}
              >
                <View
                  style={{
                    gap: 5,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems:"center"
                  }}
                >
                  <ProgressIcon width={24} height={24} />
                  <Text style={{fontSize: 20, fontWeight: "800", color: colors.text}}>50%</Text>
                </View>
                <Text style={{fontSize: 14, fontWeight:"600", textAlign:"center", color: colors.text}}>Progress</Text>
              </View>
              
              <View style={{width: 1, height: 36, backgroundColor: "#EDEDED"}} />

              <View
                style={{
                  flexDirection: "column",
                  justifyContent:"center",
                  alignItems: "center",
                  gap: 5
                }}
              >
                <View
                  style={{
                    gap: 5,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems:"center"
                  }}
                >
                  <SteakIcon width={24} height={24} />
                  <Text style={{fontSize: 20, fontWeight: "800", color: colors.text}}>1000</Text>
                </View>
                <Text style={{fontSize: 14, fontWeight:"600", textAlign:"center", color: colors.text}}>Streak</Text>
              </View>

            </View>

          </LinearGradient>

          {/* Learning Progress */}
          <View style={{gap: 10}}>
            <Title title="Learning Progress" contentStyle={{ fontSize: 20, fontWeight: "600" }} />
            {
              learningProgressData.map((item, idx) => (
                <View
                  key={idx.toString()}
                  style={{
                    height: 60,
                    borderRadius: 12,
                    marginBottom: 10,
                    backgroundColor: colors.profileCardBg,
                    flexDirection: "row",
                    flex: 1,
                    overflow: "hidden",
                    position: "relative"
                  }}
                >
                  {/* Background Image */}
                  <View
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0
                    }}
                  >
                    <ProfileLearningProgressCardBg />
                  </View>

                  <View
                    style={{
                      flex: 1,
                      width: "100%",
                      height: "100%",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      gap: 10,
                      paddingHorizontal: 20,
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        width: "100%",
                        height: "100%",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >

                      <View style={{width: 32, height: 32, borderRadius: 32, justifyContent: "center",  alignItems: "center", backgroundColor: colors.profileCardImgBgClr}}>
                        {item.ImgComponent}
                      </View>
                      <Text style={{fontSize: 14, fontWeight: "500", color: colors.text }}>{item.learningCategoryTitle}</Text>
                    </View>

                    <LinearGradient
                      colors={[colors.profileCardStatsGradientLight, colors.profileCardStatsGradientDark]}
                      style={{
                        width: 100,
                        height: 35,
                        borderRadius: 12,
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <Text style={{fontSize: 16, fontWeight: "600", color: colors.text }}>{item.score}</Text>

                    </LinearGradient>

                  </View>

                </View>
              ))
            }

          </View>

          {/* Milestones */}
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <Title title="Milestones" contentStyle={{ fontSize: 20, fontWeight: "600" }} />
              <TouchableOpacity
                onPress={() => router.push( '/dashboard/milestones' )}
                style={{
                  flexDirection: "row",
                  gap: 5,
                  alignItems: "center"
                }}
              >
                <Text style={{fontSize: 18, color:"#1B7CF5"}}>View All</Text>
                <Ionicons name="chevron-forward" size={24} color="#1B7CF5" />
              </TouchableOpacity>
            </View>
            
            {/* Milestones Items */}
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: SIZES.cardGap,
                marginTop: 10
              }}
            >
              {
                milestonesData.map( (item: Milestones) => (
                  <View
                    key={item.id.toString()}
                    style={{
                      height: 64,
                      minWidth: getCardContainerWidth() - (SIZES.cardGap/2),
                      flexDirection: "row",
                      flex: 1,
                      opacity: item.isLocked ? 0.35 : 1
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: colors.profileCardImgBgClr,
                        borderTopStartRadius: 12,
                        borderBottomStartRadius: 12
                      }}
                    >
                      {item.ImgComponent}
                    </View>

                    <View
                      style={{
                        flex: 1,
                        width: "60%",
                        height: "100%",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 5,
                        position: "relative",
                        overflow: 'hidden',
                        borderTopEndRadius: 12,
                        borderBottomEndRadius: 12,
                        backgroundColor: colors.profileCardBg,
                      }}
                    >

                      {/* Background Image */}
                      <View
                        style={{
                          position: "absolute",
                          bottom: 0,
                          right: 0
                        }}
                      >
                        <MilestonesGrdCardBgLight />
                      </View>

                      <Text style={{fontSize: 16, fontWeight: "800", color: colors.text }}>{item.milestonesTitle}</Text>
                      <Text style={{fontSize: 14, fontWeight: "400", color: colors.text }}>Streak</Text>
                    </View>

                  </View>
                ))
              }
            </View>

          </View>

        </View>

        <View style={{height: 30}} />

      </ScrollView>
    </SafeAreaLayout>
  );
}

export default Dashboard;

const styles = StyleSheet.create({
  topCard: {
    borderRadius: 16,
    padding: 20,
    position: "relative"
  },
  editButton: {
    position: "absolute",
    right: 10,
    top: 10
  },
  userDisplayName: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "800",
  },
  userName: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: "400",
  },
  userInfo: {
    fontSize: 14,
    fontWeight: "400",
  }
})