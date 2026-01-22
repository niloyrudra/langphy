import { useState, useEffect, useCallback, useRef } from "react";
import { FlatList } from "react-native";

export function useSessionPager<T>(
    dataLength: number,
    onPositionChange?: ( index: number ) => void,
    onSessionComplete?: () => void
) {
    const flatListRef = useRef<FlatList<T>>(null);
    const [ currentIndex, setCurrentIndex ] = useState<number>(0);

    const scrollToIndex = useCallback((index: number) => {
        if(index < 0 || index >= dataLength) return;

        flatListRef.current?.scrollToIndex({
            index,
            animated: true
        })

        setCurrentIndex(index);
        onPositionChange?.(index)

    }, [ dataLength, onPositionChange ]);

    const goToNext = useCallback(() => {
        if( currentIndex < dataLength - 1 ) scrollToIndex( currentIndex + 1 )
        else onSessionComplete?.();
    }, [currentIndex, dataLength, scrollToIndex, onSessionComplete])

    const goToPrevious = useCallback(() => {
        if( currentIndex > 0 ) scrollToIndex( currentIndex - 1 )
    }, [currentIndex, scrollToIndex, ])

    return {
        flatListRef,
        currentIndex,
        setCurrentIndex,
        scrollToIndex,
        goToNext,
        goToPrevious
    };

}