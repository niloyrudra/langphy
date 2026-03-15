import { StyleSheet, View } from 'react-native';
import React from 'react';
import { useTheme } from '@/theme/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';

const ProgressBar = ({completion}: {completion: number}) => {
    const {colors}  = useTheme();
    const width = React.useMemo(() => ({width: (completion / 100)*52}), [completion]);
    return (
        <View style={[styles.container, {backgroundColor: colors.progressBarBackground}]}>
            <LinearGradient
                style={[styles.image, width]}
                colors={["#48E4EF", "#1B7CF5"]}
            />
        </View>
    );
}

export default ProgressBar

const styles = StyleSheet.create({
    container: {
        width: 52,
        height: 8,
        borderRadius: 20,
        justifyContent:"center",
        alignItems: "flex-start"
    },
    image: {
        height: 8,
        objectFit: "fill",
        borderRadius: 30,
        overflow: "hidden"
    }
});