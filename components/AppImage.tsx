import {Image, ImageProps} from "expo-image";
// import {scale} from "react-native-size-matters";

interface AppImageProps extends ImageProps {
    size?: number
};

const AppImage = ({ size, style, ...props }: AppImageProps) => {
    return (
        <Image
            transition={200}
            cachePolicy="memory-disk"
            contentFit="contain"
            style={[
//                 size ? { width: scale(size), height: scale(size) } : null,
                size ? { width: size, height: size } : null,
                style
            ]}
            {...props}
        />
    )
}

export default AppImage;