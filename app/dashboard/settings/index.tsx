import React from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useTheme } from '@/theme/ThemeContext';
import SafeAreaLayout from '@/components/layouts/SafeAreaLayout';
import Title from '@/components/Title';
import { Ionicons } from '@expo/vector-icons';
import SettingSwitcher from '@/components/dashboard/SettingSwitcher';
import { router } from 'expo-router';
import ActionPrimaryButton from '@/components/form-components/ActionPrimaryButton';
import { SETTINGS_DATA } from '@/schemes/static-data';

const SettingsScreen = () => {
  const { colors } = useTheme();
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
                                onPress={() => router.push(item.route)}
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
            onSubmit={() => {
              router.push("/auth/login")    
            }}
          />
        </View>

      </ScrollView>
    </SafeAreaLayout>
  )
}

export default SettingsScreen;

const styles = StyleSheet.create({});