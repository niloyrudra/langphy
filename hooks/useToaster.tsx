import { StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React from 'react'

interface ToasterProps {
    message: string;
    timer: 'short' | 'long';
    position?: 'top' | 'center' | 'bottom';
}

export const useToaster = () => {

    const showToaster = ( {message, timer='short', position}: ToasterProps ) => {
        ToastAndroid.show(
            message,
            timer === 'long' ? ToastAndroid.LONG : ToastAndroid.SHORT,
        );
    }

    return (
        showToaster
    );

}

const styles = StyleSheet.create({})