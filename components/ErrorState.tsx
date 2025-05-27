import React from 'react'
import { Text, View } from 'react-native'

type ErrorStateProps = {
  message: string
}

const ErrorState = ({ message }: ErrorStateProps) => {
  return (
    <View>
      <Text className="text-red-500 text-xl px-5 py-3 text-center">Error: {message}</Text>
    </View>
  )
}

export default ErrorState