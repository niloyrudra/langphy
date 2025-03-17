import React from 'react'

import LightLogo from '@/assets/images/svg-images/top-nav-logo-light-mode.svg';
import DarkLogo from '@/assets/images/svg-images/top-nav-logo-dark-mode.svg';

import { useTheme } from '@/theme/ThemeContext';

const HeaderLogo = () => {
    const { theme } = useTheme();
    if( theme === 'light' ) return (<LightLogo width={133.07} height={31.34} />)
    
    return (<DarkLogo width={133.07} height={31.34} />)
}

export default HeaderLogo;