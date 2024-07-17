import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Drift = () => {
  return (
    <View>
      <Text style={styles.drift}>Drift</Text>
    </View>
  )
}

export default Drift

const styles = StyleSheet.create({
    drift:{
        fontSize: 50,
        textAlign: "center",
        justify: "center"
    }
})