import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

// Constants
import STYLES from "@/constants/styles"
import { useTheme } from '@/theme/ThemeContext'
import OnBoardingStudyDurationCard from '@/components/OnBoardingStudyDurationCard';
import { router } from 'expo-router';
import ActionPrimaryButton from '@/components/form-components/ActionPrimaryButton';
import LangphyText from '@/components/text-components/LangphyText';

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

      <LangphyText weight="semibold" style={[styles.welcomeText, {color: colors.text}]}>What is your daily learning goal?</LangphyText>

      <View style={styles.flex}>

        <FlatList
          data={DAILY_LESSON_DURATION_OPTIONS}
          keyExtractor={({id}:DurationDataProps) => id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          ListHeaderComponent={(<View style={styles.space}/>)}
          renderItem={({item}: {item: DurationDataProps}) => (
            <OnBoardingStudyDurationCard label={item.label} duration={item.duration} />
          )}
          ListFooterComponent={(<View style={styles.space} />)}
        />
      </View>


      <View style={styles.buttonContainer}>
        <ActionPrimaryButton
          buttonTitle='Continue'
          onSubmit={() => router.replace("/lessons")}
        />
        
        <TouchableOpacity
          style={[STYLES.childContentCentered, styles.skipButton]}
          onPress={() => router.replace("/lessons")}
        >
          <LangphyText weight="extrabold" style={[styles.skipText, { color: colors.skipTextColor }]}>Skip for Now</LangphyText>
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default OnBoarding

const styles = StyleSheet.create({
  flex: {flex:1},
  space: {
    height: 20
  },
  listContainer: {
    gap:16,
  },
  buttonContainer: {
    flex: 1,
    justifyContent:"flex-end",
    gap: 10
  },
  welcomeText: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "600"
  },
  skipButton: {
    padding: 16
  },
  skipText: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "800"
  }
});