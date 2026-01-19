import React from 'react'
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import { useTheme } from '@/theme/ThemeContext';
import SafeAreaLayout from '@/components/layouts/SafeAreaLayout';
import Title from '@/components/Title';
import { router } from 'expo-router';
import { SETTINGS_DATA } from '@/schemas/static-data';
import { useAuth } from '@/context/AuthContext';
import * as SecureStore from "expo-secure-store";
import SettingsElement from '@/components/settings/SettingsElement';
import SettingsElementAction from '@/components/settings/SettingsElementAction';
import ActionButton from '@/components/form-components/ActionButton';
import AccountDeletionModal from '@/components/modals/AccountDeletionModal';
import { useProfile } from '@/context/ProfileContext';
// import SIZES from '@/constants/size';

const SettingsScreen = () => {
  const { colors, theme } = useTheme();
  const { user } = useAuth();
  const { profile, clear } = useProfile();
  const [showModal, setShowModal] = React.useState<boolean>(false);

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
            const { message } = data;

            // await SecureStore.setItemAsync("accessToken", token);
            await SecureStore.deleteItemAsync("accessToken");
            // setUser(null);
            clear();

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
    <>
      <SafeAreaLayout>
        <ScrollView style={{flex: 1}}>

          <View style={{flex: 1, marginBottom: 30}}>
            {
              SETTINGS_DATA.map((item, idx) => (
                <View style={{ flex: 1, marginBottom: 30 }} key={idx.toString()}>
                  
                  <Title title={item.subSettingTitle} containerStyle={{marginTop: 20, marginBottom: 10}} contentStyle={{fontSize: 16, color: colors.settingsTitle}} />
                  
                  <View style={[styles.settingItemContainer]}>
                    {
                      item.settingsElements.map((item, idx) => (
                        <View
                          key={idx.toString()}
                          style={[styles.settingItem, {backgroundColor: colors.profileCardBg}]}
                        >
                          <SettingsElement
                            title={item.elementTitle}
                            Icon={theme === 'light' ? <item.ImgComponentLight /> : <item.ImgComponentDark />}
                          />

                          <SettingsElementAction
                            actionType={item.actionType}
                            settingType={item.settingType}
                            route={item?.route}
                          />
                          
                        </View>
                      ))
                    }
                  </View>
                </View>
              ))
            }

            <ActionButton
              buttonTitle='Logout'
              onSubmit={handleSignout}
              buttonStyle={{
                backgroundColor: theme === 'light' ? "transparent" : "#FFFFFF",
                borderColor: theme === 'light' ? "#142C57" : "#FFFFFF",
                borderWidth: 1,
              }}
              textStyle={{
                color: theme === 'light' ? "#142C57" : "#142C57"
              }}
            />
            
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 30
              }}
            >
              <TouchableOpacity
                onPress={() => setShowModal(true)}
              >
                <Text
                  style={{
                    color: "#EF1313",
                    fontWeight: "800",
                    fontSize: 16
                  }}
                >Delete Account</Text>
              </TouchableOpacity>
            </View>
            
          </View>

        </ScrollView>
      </SafeAreaLayout>

      {
        showModal && (
          <AccountDeletionModal
            isVisible={showModal}
            onModalVisible={() => setShowModal(false)}
          />
        )
      }

    </>
  )
}

export default SettingsScreen;

const styles = StyleSheet.create({
  settingItemContainer: {
    flex: 1,
    flexDirection: "column",
    gap: 10
  },
  settingItem: {
    paddingHorizontal: 20,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 64
  }
});