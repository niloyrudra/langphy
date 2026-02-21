import { ColorValue, StyleSheet } from 'react-native'
import React from 'react'
import LangphyText from '@/components/text-components/LangphyText';

const ModalSectionTitle = ({title, color="#68F0F8"}: {title: string, color: ColorValue}) => {
    return (
        <LangphyText
            weight="bold"
            style={[styles.text, { color}]}
        >
            {title}
        </LangphyText>
    );
}

export default ModalSectionTitle;

const styles = StyleSheet.create({
    text: {fontSize: 16}
});