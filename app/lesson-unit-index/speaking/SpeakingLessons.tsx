import React from 'react';
import { TouchableOpacity, View } from 'react-native'
import SIZES from '@/constants/size';
import STYLES from '@/constants/styles';
import { useTheme } from '@/theme/ThemeContext';
import SafeAreaLayout from '@/components/layouts/SafeAreaLayout';
import ChallengeScreenTitle from '@/components/challenges/ChallengeScreenTitle';
import ActionPrimaryButton from '@/components/form-components/ActionPrimaryButton';
import { RecorderDarkInactiveIcon, RecorderLightActiveIcon } from '@/utils/SVGImages';
import ChallengeScreenQuerySection from '@/components/challenges/ChallengeScreenQuerySection';


const SpeakingLessons = () => {
  const { theme } = useTheme();
  const [isRecorderActive, setIsRecorderActive] = React.useState(true)

  return (
    <SafeAreaLayout>
      
      {/* Content */}
      <View
        style={{flex: 1}}>
        <View style={{flex: 1}}>

          {/* Title Section */}
          <ChallengeScreenTitle title="Speak This Sentence" />

          {/* Writing Section Starts */}
          <View
            style={{
              flex:1,
              marginBottom: 80
            }}
          >

            <ChallengeScreenQuerySection query="Hello! My name is Anna." onTap={() => console.log("Tapping Query Button")} />

            <View style={{flex:1}}/>

            {/* Writing Text Field/Input/Area Section */}
            <View style={STYLES.childContentCentered}>

              {
                theme === 'light'
                ? (isRecorderActive
                    ? (<TouchableOpacity
                          disabled={!isRecorderActive}
                        >
                          <RecorderLightActiveIcon width={SIZES.speakerNRecorderDimensions} height={SIZES.speakerNRecorderDimensions} />
                        </TouchableOpacity>
                      )
                    : (
                        <TouchableOpacity
                          disabled={!isRecorderActive}
                          style={{opacity:0.4}}
                        >
                          <RecorderLightActiveIcon width={SIZES.speakerNRecorderDimensions} height={SIZES.speakerNRecorderDimensions} />
                        </TouchableOpacity>
                      )
                  )
                : (isRecorderActive
                  ? (<TouchableOpacity
                        disabled={!isRecorderActive}
                      >
                        <RecorderLightActiveIcon width={SIZES.speakerNRecorderDimensions} height={SIZES.speakerNRecorderDimensions} />
                      </TouchableOpacity>
                    )
                  : (
                      <TouchableOpacity
                        disabled={!isRecorderActive}
                      >
                        <RecorderDarkInactiveIcon width={SIZES.speakerNRecorderDimensions} height={SIZES.speakerNRecorderDimensions} />
                      </TouchableOpacity>
                    )
                )
              }

            </View>
            
          </View>
        
        </View>

        {/* Action Buttons */}
        <ActionPrimaryButton
          buttonTitle='Check'
          onSubmit={() => console.log("Submitted")}
          disabled={true}
        />

      </View>
  
    </SafeAreaLayout>
  );
}

export default SpeakingLessons;