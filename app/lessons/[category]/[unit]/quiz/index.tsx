import React from 'react';
import { StyleSheet, Text, View } from 'react-native'
import QuizOptionCardList from '@/components/list-loops/QuizOptions';
import ChallengeScreenTitle from '@/components/challenges/ChallengeScreenTitle';
import ActionPrimaryButton from '@/components/form-components/ActionPrimaryButton';
import SessionLayout from '@/components/layouts/SessionLayout';
import { router, useLocalSearchParams } from 'expo-router';
import { getCardContainerWidth } from '@/utils';
import { SessionType, ProgressPayload, QuizSessionType, SelectiveResultType } from '@/types';
import LoadingScreenComponent from '@/components/LoadingScreenComponent';
import UnitCompletionModal from '@/components/modals/UnitCompletionModal';
import SessionResultModal from '@/components/modals/SessionResultModal';
import { useTheme } from '@/theme/ThemeContext';
import { MaterialIcons } from '@expo/vector-icons';
import { useLessons } from '@/hooks/useLessons';
import { useUpdateProgress } from '@/hooks/useUpdateProgess';

const QuizSession = () => {
  const {colors} = useTheme();
  const cardWidth = getCardContainerWidth();
  const { categoryId, slug, unitId } = useLocalSearchParams();
  const goToNextRef = React.useRef<(() => void) | null>(null);

  const { data: quizLessons, isLoading, isFetching } = useLessons( categoryId as string, unitId as string, slug as SessionType );
  const { mutate: updateProgress } = useUpdateProgress();

  const quizzes = React.useMemo<QuizSessionType[]>(() => {
    if( !quizLessons ) return [];
    return quizLessons.map( lesson => JSON.parse( lesson.payload ) );
  }, [quizLessons]);
  
  const [showCompletionModal, setShowCompletionModal] = React.useState<boolean>(false);
  const [ selectedOption, setSelectedOption ] = React.useState<string | null>(null);
  const [ isSelectionHappened, setIsSelectionHappened ] = React.useState<boolean>(false)
  const [ activeIndex, setActiveIndex ] = React.useState<number>(0);
  const [ error, setError ] = React.useState<string>('')
  const [ loading, setLoading ] = React.useState<boolean>(false);
  const [ result, setResult ] = React.useState<SelectiveResultType | null>(null)
    
  const handleSelect = React.useCallback((option: string) => {
    setSelectedOption( prevValue => prevValue = option);
    setIsSelectionHappened( prevValue => prevValue = true);
  }, []);

  const reset = React.useCallback(() => {
    setSelectedOption("");
    setIsSelectionHappened(false);
    setResult(null);
    setError("");
    setLoading(false);
  }, []);

  if( loading ) return (<LoadingScreenComponent />)

  return (
    <>
      <SessionLayout<QuizSessionType>
        preFetchedData={quizzes}
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
              const payload: ProgressPayload = {
                content_type: slug as SessionType,
                content_id: item.id,
                completed: true,
                score: 100,
                progress_percent: 100
              };

              updateProgress( payload );

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
            <View style={styles.flex}>
              <View style={styles.flex}>
                {/* Title Section */}
                <ChallengeScreenTitle title="Choose The Correct Answer." />

                {/* QUIZ Section Starts */}
                <View>
                  <View style={styles.questionWrapper}>
                    <MaterialIcons name="quiz" size={32} color={colors.primary} />
                    <Text style={[styles.question, {color: colors.primary}]}>
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
              total: quizzes.length,
              correct: quizzes.length,
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

const styles = StyleSheet.create({
  flex: {flex:1},
  questionWrapper: {
    flexDirection :"row",
    // flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 20,
    marginTop: 10,
    gap: 20
  },
  question: {
    fontSize: 24,
    fontWeight: '700',
    wordWrap: 'break-word',
    flexShrink: 1,
  }
});