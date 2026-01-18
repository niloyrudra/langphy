import React, { ReactNode } from 'react'
import LearningProgressItem from '@/components/dashboard/_partials/LearningProgressItem';
import { ProfileLessonIcon, ProfilePhraseIcon, ProfileUnitIcon, ProfileWordsIcon } from '@/utils/SVGImages';
import Title from '@/components/Title';
import { View } from 'react-native';

type LearningProress = {
    id: number,
    learningCategoryTitle: string,
    score: number,
    ImgComponent: ReactNode
};

const learningProgressData: LearningProress[] = [
    {
        id: 1,
        learningCategoryTitle: "Total Words",
        score: 1000,
        ImgComponent: <ProfileWordsIcon />
    },
    {
        id: 2,
        learningCategoryTitle: "Total Phrases",
        score: 500,
        ImgComponent: <ProfilePhraseIcon />
    },
    {
        id: 3,
        learningCategoryTitle: "Total Units",
        score: 100,
        ImgComponent: <ProfileUnitIcon />
    },
    {
        id: 4,
        learningCategoryTitle: "Total Lessons",
        score: 40,
        ImgComponent: <ProfileLessonIcon />
    }
];

const LearningProgress = ({title}: {title:string}) => {
    return (
        <View style={{gap: 10}}>
            <Title title={title} contentStyle={{ fontSize: 20, fontWeight: "600" }} />
            {
                learningProgressData.map((item, idx) => (
                    <LearningProgressItem
                        key={idx.toString()}
                        icon={item.ImgComponent}
                        title={item.learningCategoryTitle}
                        score={item.score?.toString()}
                    />
                ))
            }
        </View>
    );
}

export default LearningProgress;