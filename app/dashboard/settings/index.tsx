import React, { useCallback } from 'react'
import { StyleSheet, View, SectionList } from 'react-native'
import { useTheme } from '@/theme/ThemeContext';
import SafeAreaLayout from '@/components/layouts/SafeAreaLayout';
import Title from '@/components/Title';
import { router } from 'expo-router';
import { SETTINGS_DATA } from '@/static-data/static-data';
import * as SecureStore from "expo-secure-store";
import SettingsElement from '@/components/settings/SettingsElement';
import SettingsElementAction from '@/components/settings/SettingsElementAction';
import ActionButton from '@/components/form-components/ActionButton';
import AccountDeletionModal from '@/components/modals/AccountDeletionModal';
import { useSettings } from '@/hooks/useSettings';
import LoadingScreenComponent from '@/components/LoadingScreenComponent';
import { authSnapshot } from '@/snapshots/authSnapshot';
import { signOut } from '@/services/auth.service';
import { toastError, toastLoading, toastSuccess } from '@/services/toast.service';
import { SettingsFieldType } from '@/types';

const SettingsScreen = () => {
  const { colors, theme } = useTheme();
  const userId = authSnapshot.getUserId() ?? "";
  const { data: settings, isLoading, isFetching, refetch } = useSettings(userId as string);
  const [ showModal, setShowModal ] = React.useState<boolean>(false);

  // Handlers
  const handleSignout = useCallback(async () => {
    const toastId = toastLoading("Signing out...");
    try {
      const axiosRes = await signOut();

      if( axiosRes.status === 200 && axiosRes.data ) {
        SecureStore.deleteItemAsync("accessToken"),
        authSnapshot.clear();

        toastSuccess("Successfully signed out!", { id: toastId! });

        router.replace("/auth/login");
      }
      else {
        toastError( "Signout failed!", { id: toastId! } )
      }
    }
    catch(err) {
      console.error("Signout Error:", err)
      toastError("Signout failed!", { id: toastId! })
    }
  }, [router, authSnapshot, SecureStore, toastError, toastSuccess]);

  const isServiceEnabled = useCallback(( serviceType: SettingsFieldType ): boolean => {
    if(!settings) return false;
    switch (serviceType) {
      case 'sound_effect':
        return settings.sound_effect ?? false;
      case 'theme':
        return settings.theme === 'dark' ? true : false;
      case 'practice_service':
        return settings.practice_service ?? false;
      case 'quiz_service':
        return settings.quiz_service ?? false;
      case 'speaking_service':
        return settings?.speaking_service ?? false;
      case 'listening_service':
        return settings.listening_service ?? false;
      case 'reading_service':
        return settings.reading_service ?? false;
      case 'writing_service':
        return settings.writing_service ?? false;
      case 'notifications':
        return settings.notifications ?? false;
      default:
        return false;
    }
  }, [settings])

  const modalHandler = useCallback(() => setShowModal(prevValue => !prevValue), [setShowModal]);
  const onRefresh = React.useCallback( () => refetch(), [refetch] );

  if( isLoading || isFetching ) return (<LoadingScreenComponent />);

  return (
    <>
      <SafeAreaLayout>
        <View style={styles.container}>
          <SectionList
            sections={SETTINGS_DATA}
            keyExtractor={(item, index) => item.elementTitle+index}
            refreshing={isFetching}
            onRefresh={onRefresh}
            showsVerticalScrollIndicator={false}
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

                  {/* Switch / Route */}
                  <SettingsElementAction
                    actionType={item.actionType}
                    enabled={isServiceEnabled(item.settingType)}
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
                  buttonStyle={[
                    styles.logoutButton,
                    {
                      borderColor: theme === 'light' ? "#142C57" : "#FFFFFF",
                    }
                  ]}
                  textStyle={styles.textLogout}
                />
                
                <ActionButton
                  buttonTitle='Delete Account'
                  onSubmit={modalHandler}
                  buttonStyle={styles.deleteButton}
                  textStyle={styles.textDanger}
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
    marginTop: 40,
    gap: 10
  },
  logoutButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
  },
  deleteButton: {
    borderWidth: 0
  },
  textLogout: {
    color: "#142C57"
  },
  textDanger: {
    color: "#EF1313"
  }
});