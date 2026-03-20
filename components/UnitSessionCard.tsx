import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router';
import STYLES from '@/constants/styles';
import { useTheme } from '@/theme/ThemeContext';
import GridCardIcon from './GridCardIcon';
import TitleHeading from './TitleHeading';
import { getCardContainerWidth } from '@/utils';
import { SessionType, UnitSessionType } from '@/types';
import { useSettings } from '@/hooks/useSettings';
import { authSnapshot } from '@/snapshots/authSnapshot';
// import { useLessons } from '@/hooks/useLessons';

const UnitSessionCard: React.FC<UnitSessionType> = ( { title, categoryId, unitId, slug} ) => {
  const { colors } = useTheme();
  const userId = authSnapshot.getUserId() ?? "";
  const cardWidth = getCardContainerWidth();
  const { category, unit } = useLocalSearchParams();

  const { data: settings } = useSettings(userId);
  // const { data: lessons } = useLessons( categoryId, unitId, slug as SessionType );

  const [isDisabled, setIsDisabled] = React.useState<boolean>(false);

  const routeHandler = React.useCallback(() => {
    router.push({
      pathname: `/lessons/${category}/${unit}/${slug}`,
      params: { title, slug, categoryId, unitId }
    })
  }, [router, category, unit, slug, categoryId, unitId, title]);

  React.useEffect(() => {
    let active = true;
    switch( slug ) {
      case 'speaking' :
        active = settings?.speaking_service ? true : false;
        break;
      case 'reading' :
        active = settings?.reading_service ? true : false;
        break;
      case 'writing' :
        active = settings?.writing_service ? true : false;
        break;
      case 'listening' :
        active = settings?.listening_service ? true : false;
        break;
    }
    setIsDisabled(!active);
  }, [slug, settings]);

  return (
    <TouchableOpacity
      disabled={isDisabled}
      style={isDisabled ? styles.disabled : null}
      onPress={routeHandler}
    >
      <View 
        style={[
          STYLES.contentCentered,
          styles.container,
          {
            backgroundColor: colors.cardBackgroundColor,
            borderColor: colors.cardBorderColor,
            width: cardWidth,
          }
        ]}
      >
        
        <GridCardIcon slug={slug} type="unit" />
        
        <TitleHeading title={title} />
        
        {/* <ProgressBar completion={completion ?? 0} /> */}

      </View>
    </TouchableOpacity>
  );
}

export default UnitSessionCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 20,
    borderRadius: 24,
    borderWidth: 1,
    paddingVertical: 16,
    margin:0,
  },
  disabled: {
    opacity: 0.35,
    pointerEvents: "none"
  }
});