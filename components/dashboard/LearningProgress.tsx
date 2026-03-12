import React, { ReactNode } from 'react'
import LearningProgressItem from '@/components/dashboard/_partials/LearningProgressItem';
// import { ProfileLessonIcon, ProfilePhraseIcon, ProfileUnitIcon, ProfileWordsIcon } from '@/utils/SVGImages';
import Title from '@/components/Title';
import { ImageSourcePropType, StyleSheet, View } from 'react-native';
import { Images } from '@/constants/images';

type LearningProress = {
    id: number;
    learningCategoryTitle: string;
    score: number;
    icon: ImageSourcePropType;
    // ImgComponent: ReactNode
};

const learningProgressData: LearningProress[] = [
    {
        id: 1,
        learningCategoryTitle: "Total Words",
        score: 1000,
        icon: Images.dashboard.progress_word,
        // ImgComponent: <ProfileWordsIcon />
    },
    {
        id: 2,
        learningCategoryTitle: "Total Phrases",
        score: 500,
        icon: Images.dashboard.progress_paragraph,
        // ImgComponent: <ProfilePhraseIcon />
    },
    {
        id: 3,
        learningCategoryTitle: "Total Units",
        score: 100,
        icon: Images.dashboard.progress_unit,
        // ImgComponent: <ProfileUnitIcon />
    },
    {
        id: 4,
        learningCategoryTitle: "Total Lessons",
        score: 40,
        icon: Images.dashboard.progress_lesson,
        // ImgComponent: <ProfileLessonIcon />
    }
];

const LearningProgress = ({title}: {title:string}) => {
    return (
        <View style={{gap: 10}}>
            <Title title={title} contentStyle={styles.title} />
            {
                learningProgressData.map((item, idx) => (
                    <LearningProgressItem
                        key={idx.toString()}
                        icon={item.icon}
                        title={item.learningCategoryTitle}
                        score={item.score?.toString()}
                    />
                ))
            }
        </View>
    );
}

export default LearningProgress;

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: "600"
    }
});