import React from 'react';
import { Text, View } from 'react-native'
import QuizOptionCardList from '@/components/list-loops/QuizOptions';
import ChallengeScreenTitle from '@/components/challenges/ChallengeScreenTitle';
import ActionPrimaryButton from '@/components/form-components/ActionPrimaryButton';
import ChallengeScreenQuerySection from '@/components/challenges/ChallengeScreenQuerySection';
import SessionLayout from '@/components/layouts/SessionLayout';
import { router, useLocalSearchParams } from 'expo-router';
import { getCardContainerWidth } from '@/utils';
import { QuizSessionType, SelectiveResultType } from '@/types';
import LoadingScreenComponent from '@/components/LoadingScreenComponent';
import UnitCompletionModal from '@/components/modals/UnitCompletionModal';
import SessionResultModal from '@/components/modals/SessionResultModal';
import { useTheme } from '@/theme/ThemeContext';
import { MaterialIcons } from '@expo/vector-icons';
import api from '@/lib/api';

const QuizSession = () => {
  const {colors} = useTheme();
  const cardWidth = getCardContainerWidth();
  const { categoryId, slug, unitId } = useLocalSearchParams();
  const goToNextRef = React.useRef<(() => void) | null>(null);
  
  const [showCompletionModal, setShowCompletionModal] = React.useState<boolean>(false);
  const [ selectedOption, setSelectedOption ] = React.useState<string | null>(null);
  const [ isSelectionHappened, setIsSelectionHappened ] = React.useState<boolean>(false)
  const [ activeIndex, setActiveIndex ] = React.useState<number>(0);
  const [ error, setError ] = React.useState<string>('')
  const [ data, setData ] = React.useState<QuizSessionType[]>([]);
  const [ loading, setLoading ] = React.useState<boolean>(false);
  const [ result, setResult ] = React.useState<SelectiveResultType | null>(null)
    
  const handleSelect = (option: string) => {
    setSelectedOption( prevValue => prevValue = option);
    setIsSelectionHappened( prevValue => prevValue = true);
  };

  const reset = React.useCallback(() => {
    setSelectedOption("");
    setIsSelectionHappened(false);
    setResult(null);
    setError("");
    setLoading(false);
  }, []);

  React.useEffect(() => {
    const dataLoad = async () => {
      setLoading(true)
      try {
        const res = await api.get(`/quizzes/${categoryId}/${unitId}`);
        if( res.status !== 200 ) return setData([]);

        const data: (QuizSessionType)[] = res.data;
        if( data ) setData(data)

      } catch (err: any) {
        console.error("Error fetching Quiz data:", err);
        setData([])
        // throw err;
        setError(`Error fetching Quiz data`);
      }
      setLoading(false)
    }

    if (categoryId && unitId && slug) dataLoad();
  }, [categoryId, unitId, slug]);

  if( loading ) return (<LoadingScreenComponent />)

  return (
    <>
      <SessionLayout<QuizSessionType>
        preFetchedData={data}
        onPositionChange={setActiveIndex}
        onSessionComplete={() => setShowCompletionModal(true)}
        onActiveItemChange={({item, goToNext}) => {
          reset();
          // You can use goToNextRef.current() to navigate to the next item from outside
          goToNextRef.current = goToNext;
        }}
      >
        {({ item }) => {

          const onCheckHandler = () => {
            if(  selectedOption === item?.answer ) {
              setResult({
                answered: selectedOption || "",
                feedback: { label: "Correct", color: "green" }
              });

            } else {
              setResult({
                answered: selectedOption || "",
                feedback: { label: "Incorrect", color: "red" }
              });

            }
          };

          return (
            <View style={{flex: 1}}>
              <View style={{flex: 1}}>
                {/* Title Section */}
                <ChallengeScreenTitle title="Choose The Correct Answer." />

                {/* QUIZ Section Starts */}
                <View>
                  {/* <ChallengeScreenQuerySection query={item?.question} lang="en-US" /> */}
                  <View
                    style={{
                      flexDirection :"row",
                      // flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      marginBottom: 20,
                      marginTop: 10,
                      gap: 20
                    }}
                  >
                    <MaterialIcons name="quiz" size={32} color={colors.primary} />
                    <Text
                      style={{
                        fontSize: 24,
                        color: colors.primary,
                        fontWeight: '700',
                        wordWrap: 'break-word',
                        flexShrink: 1,
                      }}
                    >
                      {item?.question}
                    </Text> 
                  </View>

                  {/* QUIZ Answer Options */}
                  <QuizOptionCardList
                    height={cardWidth / 2} 
                    options={Array.isArray(item?.options) && item.options.length > 0 ? item.options : ["", "", "", ""]}
                    answer={item?.answer || ""}
                    selectedOption={selectedOption || ""}
                    onSelect={handleSelect}
                    isSelectionHappened={isSelectionHappened} />
                  {/* <QuizAnswerOptionGrid /> */}
                </View>
                {/* QUIZ Section Ens */}
              </View>

              {/* Action Buttons */}
              <ActionPrimaryButton
                buttonTitle='Check'
                onSubmit={onCheckHandler}
                disabled={ !selectedOption ? true : false}

              />
            </View>
          );
        }}
      </SessionLayout>

      {
        result && (<SessionResultModal
          isVisible={result ? true : false}
          result={result!}
          onContinue={() => {
            reset();
            goToNextRef?.current && goToNextRef.current?.();
          }}
          onModalVisible={reset}
          onRetry={reset}
        />)
      }

      {
        showCompletionModal && (
          <UnitCompletionModal
            isVisible={showCompletionModal}
            stats={{
              time:"00:00",
              total: data.length,
              correct: data.length,
              accuracy: 100
            }}
            onContinue={() => {
              reset();
              setShowCompletionModal(false);
              router.back();
              // navigation back to units page
            }}
            onModalVisible={() => setShowCompletionModal(false)}
          />
        )
      }
    </>
  );
}

export default QuizSession;