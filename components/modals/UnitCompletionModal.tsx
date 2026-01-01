import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ModalLayout from './_partials/ModalLayout';
import ActionPrimaryButton from '../form-components/ActionPrimaryButton';
import { DolphinCongratulationsIcon, TargetIcon, WatchIcon } from '@/utils/SVGImages';
import StatsCard from './_partials/StatsCard';

type UnitCompletionModalProps = {
    isVisible: boolean;
    onModalVisible: () => void;
    stats: {
        total: number;
        correct: number;
        accuracy: number;
        time: string;
    };
    onContinue: () => void;
}

const UnitCompletionModal = ({isVisible, onModalVisible, stats, onContinue}: UnitCompletionModalProps) => {
  return (
    <ModalLayout
        isVisible={isVisible}
        onModalVisible={onModalVisible}
        gradianColor={['#081A33', '#081A33', '#081A33', '#1FCAD7', '#3FA1FF']}
        conainerStyle={{
            // flex: 1,
            borderStartStartRadius: 0,
            borderEndStartRadius: 0,
            borderTopWidth:0,
            borderLeftWidth:0,
            borderRightWidth:0,
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
        }}
    >
        <View
            style={{
                // flex: 1,
                justifyContent: 'space-between',
                paddingVertical: 30,
                paddingHorizontal: 20,
                // backgroundColor: 'black',
                height: Dimensions.get('window').height,
            }}
        >
            <View
                style={{flex: 1}}
            >
                <View style={{height: "20%"}} />

                {/* Top Greetings */}
                <View style={{alignItems: 'center', justifyContent: 'center', padding: 20}}>
                    <View style={{marginBottom: 20, alignItems: 'center', justifyContent: 'center'}}>
                        <DolphinCongratulationsIcon width={146.61} height={160.73} />
                    </View>
                    {/* <Text style={{fontSize: 24, fontWeight: '800', marginBottom: 5, color: 'gold'}}>Congratulations!</Text> */}
                    <Text style={{fontSize: 32, fontWeight: '800', marginBottom: 5, color: '#68F0F8'}}>Lesson Complete</Text>
                    <Text style={{fontSize: 12, color: '#EEF8FF', textAlign: 'center'}}>Great job! Keep learning and improve your skills!</Text>
                </View>

                {/* Stats Section */}
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        paddingHorizontal: 20,
                        gap: 10,
                        // width: "80%"
                    }}
                >
 
                    <StatsCard
                        title='Accuracy'
                        IconComponent={<TargetIcon width={56} height={56} />}
                        statsValue={stats.accuracy+"%"}
                        feedbackText='Impressive'
                    />

                    <StatsCard
                        title='Time'
                        IconComponent={<WatchIcon width={56} height={56} />}
                        statsValue={stats.time}
                        statsUnit="min"
                    />

                </View>
            </View>

            <View
                style={{marginTop: "auto"}}
            >
                <ActionPrimaryButton
                    buttonTitle="Continue"
                    onSubmit={onContinue}
                />
            </View>

        </View>
    </ModalLayout>
  )
}

export default UnitCompletionModal;

const styles = StyleSheet.create({})