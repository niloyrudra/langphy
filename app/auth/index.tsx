import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
// import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '@/theme/ThemeContext';
import { useRouter } from 'expo-router';

const Index = () => {
  const router = useRouter();
  const { colors } = useTheme();
  return (
    <View
      style={{
        flex:1,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <TouchableOpacity
        onPress={() => router.push('/auth/login') }
      >
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Index

const styles = StyleSheet.create({
  container: {
    flex:1
  }
})