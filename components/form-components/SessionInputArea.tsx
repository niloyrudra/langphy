import { StyleSheet, View } from 'react-native'
import React from 'react'
import ActionPrimaryButton from './ActionPrimaryButton';
import TextInputComponent from './TextInputComponent';
import Error from '../Error';

const SessionInputArea = ({
    error, textContent, placeholderColor, onChange, onCheck, loading
}: {
    error: string;
    textContent: string;
    placeholderColor: string;
    onChange: (v: string) => void;
    onCheck: () => void;
    loading: boolean;
}) => (
    <View>
        {error ? <Error text={error} /> : null}
        <TextInputComponent
            maxLength={500}
            placeholder="Write here..."
            value={textContent}
            onChange={onChange}
            onBlur={() => {}}
            placeholderTextColor={placeholderColor}
            inputMode="text"
            contentContainerStyle={styles.textInput}
        />
        <ActionPrimaryButton
            buttonTitle="Check"
            onSubmit={onCheck}
            isLoading={loading}
            disabled={textContent.length === 0}
        />
    </View>
);

export default SessionInputArea

const styles = StyleSheet.create({
    textInput: {
        marginBottom: 12,
    }
})