import React from 'react'
import { useTheme } from '@/theme/ThemeContext';
import sizes from '@/constants/size';

import { DarkLogo, LightLogo } from '@/utils/SVGImages';

const HeaderLogo = () => {
    const { theme } = useTheme();
    if( theme === 'light' ) return (<LightLogo width={sizes.logo.width} height={sizes.logo.height} />)
    
    return (<DarkLogo width={sizes.logo.width} height={sizes.logo.height} />)
}

export default HeaderLogo;