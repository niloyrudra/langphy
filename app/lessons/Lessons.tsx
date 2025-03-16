import { StyleSheet, View, StatusBar, Text, Dimensions } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import FloatingDictionaryIcon from '@/components/action-components/FloatingDictionaryIcon';
import SpeakerComponent from '@/components/action-components/SpeakerComponent';
import LessonComponent from '@/components/lesson-components/LessonComponent';
import SpeakerAltComponent from '@/components/action-components/SpeakerAltComponent';

const Lessons = () => {
  return (
    <SafeAreaProvider>

      <SafeAreaView
        style={styles.container}
      >
        <View>
          {/* Source Language Section */}
          <LessonComponent
            language="English"
            iconComponent={<SpeakerComponent/>}
          >
            <Text style={styles.text}>Hello!</Text>
          </LessonComponent>

          <View style={{marginTop:30,marginBottom:50,borderBottomWidth:1,borderBottomColor:"#EDEDED"}} />

          {/* Acting Language Section */}
          <LessonComponent
            language="German"
            iconComponent={<SpeakerAltComponent />}
            style={{borderColor:"#1B7CF5"}}
            buttonStyle={{backgroundColor:"#D9EFFF"}}
          >
            <Text style={styles.mainText}>Moin Moin!</Text>
            <Text style={styles.subText}>(Very friendly way to say hello in North Germany)</Text>
          </LessonComponent>
        </View>

        {/* Dictionary Floating Button */}
        <FloatingDictionaryIcon />

      </SafeAreaView>

    </SafeAreaProvider>
  );
}

export default Lessons

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    margin: 0,
    padding: 0
  },
  text: {
    fontSize: 16,
    color: "#000000",
    fontWeight: "500",
  },
  mainText: {
    fontSize: 16,
    color: "#000000",
    fontWeight: "600",
  },
  subText: {
    fontSize: 12,
    fontWeight: "400",
    color: "#999999"
  }
})