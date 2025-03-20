import sizes from "@/constants/size";

export const getCardContainerWidth =  (width: number) =>  (width - ( (sizes.bodyPaddingHorizontal*2) + sizes.cardGap )) / 2;