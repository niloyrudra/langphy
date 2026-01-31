import React, { useCallback } from 'react'
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
import api from '@/lib/api';
import { useSettings } from '@/hooks/useSettings';
import { useAuth } from '@/context/AuthContext';
import LoadingScreenComponent from '@/components/LoadingScreenComponent';

const SettingsScreen = () => {
  const { colors, theme } = useTheme();
  const {user} = useAuth();
  const { data: settings, isLoading, isFetching } = useSettings(user?.id as string);
  // const { clear } = useProfile();
  const [showModal, setShowModal] = React.useState<boolean>(false);

  const handleSignout = useCallback(async () => {
    try {
      const axiosRes = await api.post("/users/signout");
      if( axiosRes.status === 200 && axiosRes.data ) {  
        await SecureStore.deleteItemAsync("accessToken");
        // clear();
        Alert.alert("Successfully signed out!");
        
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
  }, [router])

  const modalHandler = useCallback(() => setShowModal(prevValue => !prevValue), [setShowModal]);

  if( isLoading || isFetching ) return (<LoadingScreenComponent />);

  return (
    <>
      <SafeAreaLayout>
        <View style={styles.container}>

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
                    {backgroundColor: colors.profileCardBg}
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
  container: {
    flex: 1,
    marginBottom: 30
  },
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