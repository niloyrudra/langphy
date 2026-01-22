import React from 'react'
import { Alert, StyleSheet, View, SectionList } from 'react-native'
import { useTheme } from '@/theme/ThemeContext';
import SafeAreaLayout from '@/components/layouts/SafeAreaLayout';
import Title from '@/components/Title';
import { router } from 'expo-router';
import { SETTINGS_DATA } from '@/schemas/static-data';
import * as SecureStore from "expo-secure-store";
import SettingsElement from '@/components/settings/SettingsElement';
import SettingsElementAction from '@/components/settings/SettingsElementAction';
import ActionButton from '@/components/form-components/ActionButton';
import AccountDeletionModal from '@/components/modals/AccountDeletionModal';
import { useProfile } from '@/context/ProfileContext';
import STYLES from '@/constants/styles';

const SettingsScreen = () => {
  const { colors, theme } = useTheme();
  const { clear } = useProfile();
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

  const modalHandler = () => setShowModal(prevValue => !prevValue);

  return (
    <>
      <SafeAreaLayout>
        <View style={{flex: 1, marginBottom: 30}}>

          <SectionList
            sections={SETTINGS_DATA}
            keyExtractor={(item, index) => item.elementTitle+index}
            // onRefresh={}
            renderItem={({item, index}) => (
              <View style={[styles.settingItemContainer]}>
                <View
                  key={index.toString()}
                  style={[
                    styles.settingItem,
                    {backgroundColor: colors.profileCardBg},
                    // STYLES.boxShadowLight
                  ]}
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
              </View>
            )}
            renderSectionHeader={({section: {title}}) => (
              <Title title={title}
                containerStyle={styles.titleContainer}
                contentStyle={[styles.settingsTitle, {color: colors.settingsTitle}]}
              />
            )}
            scrollEnabled={true}
            ListFooterComponent={(
              <View style={styles.buttonContainer}>
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
                
                <ActionButton
                  buttonTitle='Delete Account'
                  onSubmit={modalHandler}
                  buttonStyle={{
                    borderWidth: 0
                  }}
                  textStyle={{
                    color: "#EF1313"
                  }}
                />
              </View>
            )}
          />


        </View>
      </SafeAreaLayout>

      {
        showModal && (
          <AccountDeletionModal
            isVisible={showModal}
            onModalVisible={modalHandler}
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
    marginBottom: 10,
  },
  titleContainer: {
    marginTop: 20,
    marginBottom: 10
  },
  settingsTitle: {
    fontSize: 16
  },
  settingItem: {
    paddingHorizontal: 20,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 64
  },
  buttonContainer: {
    marginTop: 10,
    gap: 10
  }
});