import { TouchableOpacity } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext';
import { BackwardIconDark2, BackwardIconLight2, ForwardIconDark, ForwardIconLight } from '@/utils/SVGImages';

const PaginationButton = ({modeLeft, actionHandler, isDisabled}: {modeLeft?: boolean | null, actionHandler: () => void, isDisabled: boolean}) => {
    const { colors, theme } = useTheme();
    const dimentions =  {
        width: 50,
        height: 50
    }
  return (
    <TouchableOpacity onPress={actionHandler} disabled={isDisabled}>
        {theme === 'light'
            ?   (modeLeft
                    ? <BackwardIconLight2 {...dimentions} opacity={isDisabled ? 0.15 : 1} />
                    : <ForwardIconLight {...dimentions} opacity={isDisabled ? 0.15 : 1} />
                )
            :   (modeLeft
                    ? <BackwardIconDark2 {...dimentions} opacity={isDisabled ? 0.15 : 1} />
                    : <ForwardIconDark {...dimentions} opacity={isDisabled ? 0.15 : 1} />
                )
        }
        
        {/* {theme === 'light'
            ?   (modeLeft
                    ? <BackwardIconLight opacity={isDisabled ? 0.35 : 1} />
                    : <ForwardIconLight opacity={isDisabled ? 0.35 : 1} />
                )
            :   (modeLeft
                    ? <BackwardIconDark opacity={isDisabled ? 0.35 : 1} />
                    : <ForwardIconDark opacity={isDisabled ? 0.35 : 1} />
                )
        } */}

        {/* {theme === 'light'
            ?   (modeLeft
                    ? <PreviousBtnLight width={167} height={sizes.buttonHeight} opacity={isDisabled ? 0.5 : 1} />
                    : <NextBtnLight width={167} height={sizes.buttonHeight} opacity={isDisabled ? 0.5 : 1} />
                )
            :   (modeLeft
                    ? <PreviousBtnDark width={167} height={sizes.buttonHeight} opacity={isDisabled ? 0.5 : 1} />
                    : <NextBtnDark width={167} height={sizes.buttonHeight} opacity={isDisabled ? 0.5 : 1} />
                )
        } */}
    </TouchableOpacity>
  )
}

export default PaginationButton;