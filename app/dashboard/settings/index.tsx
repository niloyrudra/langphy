import React from 'react'
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useTheme } from '@/theme/ThemeContext';
import SafeAreaLayout from '@/components/layouts/SafeAreaLayout';
import Title from '@/components/Title';
import { Ionicons } from '@expo/vector-icons';
import SettingSwitcher from '@/components/dashboard/SettingSwitcher';
import { router } from 'expo-router';
import ActionPrimaryButton from '@/components/form-components/ActionPrimaryButton';
import { SETTINGS_DATA } from '@/schemas/static-data';
import { useAuth } from '@/context/AuthContext';
import * as SecureStore from "expo-secure-store";

const SettingsScreen = () => {
  const { colors } = useTheme();
  const { user, setUser } = useAuth();

  const handleSignout = async () => {
    try {
          const res = await fetch(
            `${process.env.EXPO_PUBLIC_API_BASE}/users/signout`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
            }
          );
          const data = await res.json();
    
          console.log(res.status, data)
    
          if( res.status === 200 && data! ) {  
            const { token, message } = data;

            // await SecureStore.setItemAsync("accessToken", token);
            await SecureStore.deleteItemAsync("accessToken");
            setUser(null);

            // await SecureStore.setItemAsync("accessToken", token);

            if(message) Alert.alert( message )
            else Alert.alert("Successfully signed out!");
            
            router.replace("/auth/login");
          }
          else {
            Alert.alert( "Signout failed!" )
          }
    
        }
    catch(err) {
      console.error("Signout Error:", err)
      Alert.alert("Signout failed!")
    }
    finally {
      // setEmail('')
      // setPassword('')
    }
  }

  return (
    <SafeAreaLayout>
      <ScrollView style={{flex: 1}}>

        <View style={{flex: 1, marginBottom: 30}}>
          {
            SETTINGS_DATA.map((item, idx) => (
              <View style={{ flex: 1, marginBottom: 30 }} key={idx.toString()}>
                
                <Title title={item.subSettingTitle} containerStyle={{marginTop: 20, marginBottom: 10}} contentStyle={{fontSize: 16, color: colors.settingsTitle}} />
                
                <View
                  style={{
                    flex: 1,
                    flexDirection: "column",
                    gap: 10
                  }}
                >
                  {
                    item.settingsElements.map((item, idx) => (
                      <View
                        key={idx.toString()}
                        style={{
                          paddingHorizontal: 20,
                          borderRadius: 12,
                          backgroundColor: colors.statsBackground,

                          flexDirection: "row",
                          justifyContent: "space-between",
                          height: 64
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            gap: 10
                          }}
                        >
                          <View style={{width: 40, height: 40, borderRadius: 40, backgroundColor: "#ddd"}} />
                          {/* <Title title={item.elementTitle} /> */}
                          <Text
                            style={{
                              fontSize: 16,
                              color: colors.text,
                              fontWeight: "600"
                            }}
                          >{item.elementTitle}</Text>
                        </View>
                        <View
                          style={{
                            alignItems: "center",
                            height: "100%"
                          }}
                        >
                          {
                            item.actionType == "switcher" && (<SettingSwitcher settingType={item.settingType} />)
                          }
                          {
                            item.actionType == "router" && (
                              <TouchableOpacity
                                onPress={() => router.push(item?.route)}
                                style={{ marginVertical: "auto" }}
                              >
                                <Ionicons name="chevron-forward" size={24} color={colors.text} />
                              </TouchableOpacity>
                            )
                          }
                        </View>
                      </View>
                    ))
                  }
                </View>
              </View>
            ))
          }

          <ActionPrimaryButton
            buttonTitle='Logout'
            onSubmit={handleSignout}
          />
        </View>

      </ScrollView>
    </SafeAreaLayout>
  )
}

export default SettingsScreen;

const styles = StyleSheet.create({});