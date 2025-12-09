import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext';
import SIZES from '@/constants/size';
import SafeAreaLayout from '@/components/layouts/SafeAreaLayout';
import Title from '@/components/Title';
import { Ionicons } from '@expo/vector-icons';
import SettingSwitcher from '@/components/dashboard/SettingSwitcher';
import { router } from 'expo-router';
import ActionPrimaryButton from '@/components/form-components/ActionPrimaryButton';

const SETTINGS_DATA = [
  {
    subSettingTitle: "General",
    settingsElements: [
      {
        elementTitle: "Sound Effect",
        ImgComponent: null,
        hasSwitcher: true,
        actionType: "switcher",
        settingType: "sound_effect",
        route: undefined
      },
      {
        elementTitle: "Dark Mode",
        ImgComponent: null,
        hasSwitcher: true,
        actionType: "switcher",
        settingType: "toggle_theme",
        route: undefined
      }
    ]
  },
  {
    subSettingTitle: "Exercises",
    settingsElements: [
      {
        elementTitle: "Speaking Exercise",
        ImgComponent: null,
        hasSwitcher: true,
        actionType: "switcher",
        settingType: "speaking",
        route: undefined
      },
      {
        elementTitle: "Reading Exercise",
        ImgComponent: null,
        hasSwitcher: true,
        actionType: "switcher",
        settingType: "reading",
        route: undefined
      },
      {
        elementTitle: "Listening Exercise",
        ImgComponent: null,
        hasSwitcher: true,
        actionType: "switcher",
        settingType: "listening",
        route: undefined
      },
      {
        elementTitle: "Writing Exercise",
        ImgComponent: null,
        hasSwitcher: true,
        actionType: "switcher",
        settingType: "writing",
        route: undefined
      }
    ]
  },
  {
    subSettingTitle: "Notifications",
    settingsElements: [
      {
        elementTitle: "Practise Reminder",
        ImgComponent: null,
        hasSwitcher: true,
        actionType: "switcher",
        settingType: "push_notification",
        route: undefined
      }
    ]
  },
  {
    subSettingTitle: "Others",
    settingsElements: [
      {
        elementTitle: "Help Center",
        ImgComponent: null,
        actionType: "router",
        settingType: "",
        route: "/",
        hasSwitcher: false
      },
      {
        elementTitle: "Privacy Policy",
        ImgComponent: null,
        actionType: "router",
        settingType: "*",
        route: "/",
        hasSwitcher: false
      },
      {
        elementTitle: "Terms & Conditions",
        ImgComponent: null,
        actionType: "router",
        settingType: "*",
        route: "/",
        hasSwitcher: false
      },
      {
        elementTitle: "Achknowledgment",
        ImgComponent: null,
        actionType: "router",
        settingType: "*",
        route: "/",
        hasSwitcher: false
      },
      {
        elementTitle: "Feedback",
        ImgComponent: null,
        actionType: "router",
        settingType: "*",
        route: "/",
        hasSwitcher: false
      }
    ]
  },
];

const Settings = () => {
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
                          // alignItems: "center",
                          justifyContent: "space-between",
                          // width: '100%', // SIZES.screenWidth
                          height: 64
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            gap: 10,
                            // width: "auto",
                            // backgroundColor: "red"
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
                            height: "100%",
                            // backgroundColor: "red"
                          }}
                        >
                          {
                            item?.hasSwitcher && (<SettingSwitcher settingType={item.settingType} />)
                          }
                          {
                            item?.route && (
                              <TouchableOpacity
                                // onPress={() => router.push(`/dashboard/${item.route}`)}
                                onPress={() => console.log(item.actionType)}
                                style={{
                                  marginVertical: "auto"
                                }}
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

export default Settings;

const styles = StyleSheet.create({});