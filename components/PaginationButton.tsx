import { TouchableOpacity } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext';
import { BackwardIconDark2, BackwardIconLight2, ForwardIconDark, ForwardIconLight } from '@/utils/SVGImages';

const dimensions =  {
    width: 50,
    height: 50
};

const PaginationButton = ({modeLeft, actionHandler, isDisabled}: {modeLeft?: boolean | null, actionHandler: () => void, isDisabled: boolean}) => {
    const { theme } = useTheme();
  return (
    <TouchableOpacity onPress={actionHandler} disabled={isDisabled}>
        {theme === 'light'
            ?   (modeLeft
                    ? <BackwardIconLight2 {...dimensions} opacity={isDisabled ? 0.15 : 1} />
                    : <ForwardIconLight {...dimensions} opacity={isDisabled ? 0.15 : 1} />
                )
            :   (modeLeft
                    ? <BackwardIconDark2 {...dimensions} opacity={isDisabled ? 0.15 : 1} />
                    : <ForwardIconDark {...dimensions} opacity={isDisabled ? 0.15 : 1} />
                )
        }
    </TouchableOpacity>
  )
}

export default PaginationButton;