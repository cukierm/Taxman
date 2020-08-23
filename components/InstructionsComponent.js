import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Instructions(props) {

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Placeholder instructions for now
      </Text>
      <Text style={styles.text}>
      Click on a number and the number goes in your score. But the Taxman gets all the factors of that number in his score. Keep picking numbers. Once a number has no factors on the board, you aren't allowed to pick it anymore - the Taxman has to take his tax! At the end of the game, the Taxman will take all numbers that you don't already have.
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  text: {
    fontSize: 20, 
    margin: 10
  }
});

export default Instructions;