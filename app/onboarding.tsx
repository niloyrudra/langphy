import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

// Constants
import STYLES from "@/constants/styles"
import { useTheme } from '@/theme/ThemeContext'
import OnBoardingStudyDurationCard from '@/components/OnBoardingStudyDurationCard';
import { router } from 'expo-router';
import ActionPrimaryButton from '@/components/form-components/ActionPrimaryButton';

type DurationDataProps = {
  id: string,
  duration: string,
  label: string
};

const DAILY_LESSON_DURATION_OPTIONS = [
  {
    id: '1',
    duration: '5-m',
    label: "5 mins daily"
  },
  {
    id: '2',
    duration: '10-m',
    label: "10 mins daily"
  },
  {
    id: '3',
    duration: '15-m',
    label: "15 mins daily"
  },
  {
    id: '4',
    duration: '20-m',
    label: "20 mins daily"
  }
];

const OnBoarding = () => {
  const {colors} = useTheme();

  return (
    <View style={[STYLES.defaultContainer, {backgroundColor: colors.background}]}>

      <Text style={[styles.welcomeText, {color: colors.text}]}>What is your daily learning goal?</Text>

      <View style={{ flex: 1 }}>

        <FlatList
          data={DAILY_LESSON_DURATION_OPTIONS}
          keyExtractor={({id}:DurationDataProps) => id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            gap:16,
          }}
          ListHeaderComponent={(<View style={{height:20}}/>)}
          renderItem={({item}: {item: DurationDataProps}) => (
            <OnBoardingStudyDurationCard label={item.label} duration={item.duration} />
          )}
          ListFooterComponent={(<View style={{height:20}} />)}
        />
      </View>


      <View
        style={{
          flex: 1,
          justifyContent:"flex-end",
          gap: 10
        }}
      >
        <ActionPrimaryButton
          buttonTitle='Continue'
          onSubmit={() => router.replace("/lessons")}
        />
        
        <TouchableOpacity
          style={[STYLES.childContentCentered, {padding:16}]}
          onPress={() => router.replace("/lessons")}
        >
          <Text style={{ fontSize: 16, lineHeight: 22, fontWeight: "800", color: colors.skipTextColor }}>Skip for Now</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default OnBoarding

const styles = StyleSheet.create({
  welcomeText: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "600"
  }
});