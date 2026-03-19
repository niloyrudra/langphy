import React from 'react'
import { TouchableOpacity } from 'react-native'
import { GermanySquareFlagIcon } from '@/utils/SVGImages'

const FlagSquareComponent = () => {
  return (
    <TouchableOpacity>
      {/* <GermanySquareFlagIcon width={31} height={24} /> */}
      <GermanySquareFlagIcon width={24} height={18.58} />
    </TouchableOpacity>
  )
}
export default FlagSquareComponent;