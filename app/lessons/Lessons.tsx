import { StyleSheet, FlatList, View, ImageBackgroundProps, StatusBar, Text, Dimensions } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import LessonCard from '@/components/LessonCard';
import FloatingDictionaryIcon from '@/components/action-components/FloatingDictionaryIcon';
import SpeakerIconComponent from '@/components/action-components/SpeakerIconComponent';

interface Lesson {
  id: string,
  title: string,
  completion: number,
  imgSource: ImageBackgroundProps | undefined
}

const LESSONS = [
  {
    id: '1',
    title: 'Hello',
    completion: 80,
    imgSource: require('@/assets/images/categories/sub-categories/open-archive.png')
  },
  {
    id: '2',
    title: 'Good Day!',
    completion: 60,
    imgSource: require('@/assets/images/categories/sub-categories/open-archive.png')
  },
  {
    id: '3',
    title: 'Good Bye!',
    completion: 40,
    imgSource: require('@/assets/images/categories/sub-categories/open-archive.png')
  },
];

const Category = () => {
  return (
    <SafeAreaProvider>

      <SafeAreaView
        style={styles.container}
      >
        <View style={styles.speakerButtonWrapper}>
          <View style={styles.speakerButton}>
            <Text style={styles.languageText}>English</Text>
            <SpeakerIconComponent />
          </View>

          <Text style={styles.text}>Hello!</Text>
        </View>

        {/* Dictionary Floating Button */}
        <FloatingDictionaryIcon />

      </SafeAreaView>

    </SafeAreaProvider>
  );
}

export default Category

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    margin: 0,
    padding: 0
  },
  speakerButtonWrapper: {
    position: "relative",
    justifyContent: "center",
    alignItems: "flex-start",
    height: 92,
    borderRadius: 16,
    paddingVertical: 30, // 40
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#08C1D2",
    backgroundColor: "#ffffff",
    fontWeight: "600"
  },
  speakerButton: {
    position: "absolute",
    top: -22,
    left: Dimensions.get("screen").width/2 - (34+50),
    zIndex: 2,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 130,
    height: 44,
    borderRadius: 100,
    paddingVertical: 6,
    paddingHorizontal: 8,

    gap: 12,
    backgroundColor: "#CFFDFE",
    fontWeight: "600"
  },
  languageText: {
    fontSize: 16,
    color: "#142C57",
    fontWeight: "700",
    marginLeft: 10
  },
  text: {
    fontSize: 16,
    color: "#000000",
    fontWeight: "500",
  }
})