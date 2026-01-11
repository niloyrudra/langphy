import { StyleSheet, View, Text, Alert, TouchableOpacity } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ModalLayout from './_partials/ModalLayout';
import ActionButton from '../form-components/ActionButton';
import Title from '../Title';
import { useAuth } from '@/context/AuthContext';
import { router } from 'expo-router';
import * as SecureStore from "expo-secure-store";

interface AccountDeletionModalProps {
    isVisible: boolean;
    onModalVisible: () => void;
}

const AccountDeletionModal = ({isVisible, onModalVisible}: AccountDeletionModalProps) => {
    const insets = useSafeAreaInsets();
    const {user, setUser } = useAuth();
    const {colors, theme} = useTheme();

    const handleAccountDeletion = async () => {
        try {
        const userId = user?.id;
        if(!userId) return Alert.alert( "User id is missing!" );

        const res = await fetch(
            `${process.env.EXPO_PUBLIC_API_BASE}/users/delete`,
            {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId
            })
            }
        );
        
        const data = await res.json();
        
        console.log(res.status, data)

        if( res.status === 200 && data! ) {  
            const { message } = data;

            // await SecureStore.setItemAsync("accessToken", token);
            await SecureStore.deleteItemAsync("accessToken");
            setUser(null);

            // await SecureStore.setItemAsync("accessToken", token);

            if(message) Alert.alert( message )
            else Alert.alert("Successfully account deleted!");
            
            router.replace("/auth/login");
        }
        else {
            Alert.alert( "Account deletion failed!" )
        }
        }
        catch(err: any) {
            console.error("Delete Account action error:", err);
            Alert.alert( "Account deletion failed!" )
        }
    }

    return (
        <ModalLayout
            isVisible={isVisible}
            onModalVisible={onModalVisible}
            gradianColor={[colors.accountDeletionModalBg, colors.accountDeletionModalBg]} // ['#081A33', '#081A33', '#1FCAD7', '#3FA1FF']
            conainerStyle={{
                // width: '90%'
            }}
        >

            {/* Modal Content */}
            <View style={{ gap: 15 }}>
                {/* Model Header */}
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        // height: 60
                    }}
                >
                    <Title title="Delete" />

                    <TouchableOpacity
                        onPress={onModalVisible}
                    >
                        <Ionicons name="close" color={colors.text} size={20} />
                    </TouchableOpacity>
                </View>

                <View>
                    <Text
                        style={{
                            color: colors.accountDeletionModalText
                        }}
                    >
                        Are you sure you want to delete your account? All your data, progress will permanently be deleted.
                    </Text>
                </View>
                
                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                    <ActionButton
                        buttonTitle='Yes'
                        onSubmit={handleAccountDeletion}
                        buttonStyle={{
                            width: '45%',
                            backgroundColor: "transparent",
                            borderWidth: 1,
                            borderColor: "#EF1313" // colors.redDanger
                        }}
                        textStyle={{
                            color: "#EF1313" // colors.redDanger
                        }}
                    />
                    
                    <ActionButton
                        buttonTitle='No'
                        onSubmit={onModalVisible}
                        buttonStyle={{
                            width: '45%',
                            backgroundColor: colors.text
                        }}
                        textStyle={{
                            color: theme === 'light' ? "#FFFFFF" : "#142C57"
                        }}
                    />
                </View>

            </View>

        </ModalLayout>                    
    );
}

export default AccountDeletionModal;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        // bottom: 0
    },
    modalView: {
        position: "relative",
        borderRadius: 12,
        // borderStartStartRadius: 20,
        // borderEndStartRadius: 20,
        // borderTopWidth: 6,
        // borderLeftWidth: 1,
        // borderRightWidth: 1,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        fontSize: 20,
        fontWeight: "700"
    },
    contentWrapper: {
        marginTop: 10,
        flexDirection: "column",
        gap: 5
    }
});