import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { ReactNode } from 'react'
import { useTheme } from '@/theme/ThemeContext';
import { speechHandler, speechSlowHandler } from '@/utils';
import { SpeakerAltDarkIcon, SpeakerAltIcon, SpeakerDarkIcon, SpeakerIcon, SpeakerTurtleDarkDeIcon, SpeakerTurtleDarkEnIcon, SpeakerTurtleLightDeIcon, SpeakerTurtleLightEnIcon } from '@/utils/SVGImages';

const SpeakerComponent = ({speechContent, speechLang, isSlowing=false}: {speechContent: string, speechLang: string, isSlowing?: boolean}) => {
    const { colors, theme } = useTheme();
    const [isLoading, setLoading] = React.useState<boolean>(false)
    const iconComponent: ReactNode = !isSlowing
                                        ?
                                            (theme === 'dark'
                                                ?
                                                    ( speechLang === 'en-US' ? <SpeakerDarkIcon /> : <SpeakerAltDarkIcon />)
                                                :
                                                    ( speechLang === 'en-US' ? <SpeakerIcon /> : <SpeakerAltIcon />)
                                            )
                                        
                                        :
                                            (theme === 'dark'
                                                ?
                                                    ( speechLang === 'en-US' ? <SpeakerTurtleDarkEnIcon width={33} height={33} /> : <SpeakerTurtleDarkDeIcon width={33} height={33} />)
                                                :
                                                    ( speechLang === 'en-US' ? <SpeakerTurtleLightEnIcon width={33} height={33} /> : <SpeakerTurtleLightDeIcon width={33} height={33} />)
                                            );
    return (
        <TouchableOpacity
            disabled={isLoading}
            onPress={ !isSlowing ? () => speechHandler( speechContent, speechLang, setLoading ) : () => speechSlowHandler( speechContent, speechLang, setLoading )}
        >
            {
                isLoading ?
                (<ActivityIndicator size={33} color={colors.primary} />)
                :
                (iconComponent)
            }
        </TouchableOpacity>
    )
}

export default SpeakerComponent

const styles = StyleSheet.create({})