import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext';
import SIZES from '@/constants/size';
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from '@expo/vector-icons';
import { ProgressIcon, SteakIcon } from '@/utils/SVGImages';
import Title from '@/components/Title';
import { getCardContainerWidth } from '@/utils';
import { router } from 'expo-router';
import GridLayout from '@/components/layouts/GridLayout';
import SafeAreaLayout from '@/components/layouts/SafeAreaLayout';

const learningProgressData = [
  {
    id: 1,
    learningCategoryTitle: "Total Words",
    score: 1000,
    ImgComponent: ""
  },
  {
    id: 2,
    learningCategoryTitle: "Total Phrases",
    score: 500,
    ImgComponent: ""
  },
  {
    id: 3,
    learningCategoryTitle: "Total Units",
    score: 100,
    ImgComponent: ""
  },
  {
    id: 4,
    learningCategoryTitle: "Total Lessons",
    score: 40,
    ImgComponent: ""
  }
];

type Milestones = {
  id: number,
  milestonesTitle: string,
  milestones: number,
  ImgComponent?: React.ReactNode
}

const milestonesData: Milestones[] = [
  {
    id: 1,
    milestonesTitle: "3 Day",
    milestones: 3,
    ImgComponent: ""
  },
  {
    id: 2,
    milestonesTitle: "7 Day",
    milestones: 7,
    ImgComponent: ""
  },
  {
    id: 3,
    milestonesTitle: "14 Day",
    milestones: 14,
    ImgComponent: ""
  },
  {
    id: 4,
    milestonesTitle: "30 Day",
    milestones: 30,
    ImgComponent: ""
  }
];

const Dashboard = () => {
  const { colors, theme } = useTheme();
  return (
    <SafeAreaLayout>
      <ScrollView style={{flex: 1}}>

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
            colors={['#CFFDFE', '#8ED4FF']}
            style={styles.topCard}
          >
            {/* Name and ID */}
            <View
              style={{
                gap: 5,
                marginBottom: 20,
                alignItems: "center"
              }}
            >
              <Text style={styles.userDisplayName}>John Doe</Text>
              <Text style={styles.userName}>User ID: johndoe</Text>
            </View>

            {/* Birth Date and Email Address */}
            <View
              style={{
                gap: 20,
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
                <Text style={styles.userInfo}>12.12.2025</Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent:"flex-start",
                  alignItems:"center",
                  gap: 4
                }}
              >
                <Ionicons name="mail-outline" size={16} color={colors.text} />
                <Text style={styles.userInfo}>john.doe@gmail.com</Text>
              </View>
            </View>

            {/* Stats */}
            <View
              style={{
                backgroundColor: colors.statsBackground,
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
          <View>
            <Title title="Learning Progress" contentStyle={{ fontSize: 20, fontWeight: "600" }} />
            <FlatList
              data={learningProgressData}
              keyExtractor={({id}) => id.toString()}
              ListHeaderComponent={(<View style={{height: 10}} />)}
              renderItem={({item}) => (
                <View
                  style={{
                    height: 60,
                    borderRadius: 12,
                    marginBottom: 10,
                    backgroundColor: colors.statsBackground,
                    flexDirection: "row",
                    flex: 1,
                    overflow: "hidden"
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
                      paddingHorizontal: 20
                    }}
                  >
                    <View style={{width: 40, height: 40, borderRadius: 40, backgroundColor: "#ddd"}} />
                    <Text style={{fontSize: 14, fontWeight: "500", color: colors.text }}>{item.learningCategoryTitle}</Text>
                  </View>

                  <View
                    style={{
                      height: "100%",
                      width: 120,
                      backgroundColor: "#A6F7FB",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <Text style={{fontSize: 16, fontWeight: "600" }}>{item.score}</Text>
                  </View>
                </View>
              )}
              
            />
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
            
            {/* Milestones */}
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
                      borderWidth: 1,
                      borderColor: "#eee",
                      minWidth: getCardContainerWidth() - (SIZES.cardGap/2),
                      borderRadius: 12,
                      gap: SIZES.cardGap,
                      backgroundColor: colors.statsBackground,
                      flexDirection: "row",
                      flex: 1,
                      overflow: "hidden",
                    }}
                  >
                    <View style={{width: "40%", height: "100%", backgroundColor: "#ddd"}} />
                    <View
                      style={{
                        flex: 1,
                        width: "60%",
                        height: "100%",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 5,
                        // paddingHorizontal: 20
                      }}
                    >
                      <Text style={{fontSize: 16, fontWeight: "800", color: colors.text }}>{item.milestonesTitle}</Text>
                      <Text style={{fontSize: 14, fontWeight: "400", color: colors.text }}>Streak</Text>
                    </View>

                  </View>
                ))
              }
            </View>

          </View>

        </View>

      </ScrollView>
    </SafeAreaLayout>
  );
}

export default Dashboard;

const styles = StyleSheet.create({
  topCard: {
    borderRadius: 16,
    padding: 20
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