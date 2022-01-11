import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import AppScreen from './src/SQLiteDB'

const App = () => {
  return (
    <View style={styles.container}>
      <AppScreen/>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    padding: 10
  }
})

export default App
