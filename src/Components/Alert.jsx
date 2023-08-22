import React from 'react'
import { View } from 'react-native'

import ResultBMI from './ResultBMI'

const resultIMPORTED = ResultBMI()

export default function result() {
    if (resultIMPORTED <= 25) {
        <Text>Your BMI is too high</Text>
    }
    return(
        <View>

        </View>
    )
}