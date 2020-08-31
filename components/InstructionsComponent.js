import * as React from 'react';
import {StyleSheet, ScrollView } from 'react-native';
import {Text} from 'react-native-elements';

function Instructions(props) {

  return (
    <ScrollView style={styles.container}>
      <Text h3 style={{textAlign:'center'}}>
      Taxman instructions:
      </Text>
      <Text style={styles.text}>
      The <Text style={{color:'#8E7DBE'}}>PURPLE</Text> numbers are available to be chosen.
      </Text>
      <Text style={styles.text}>
      Pick a number. That number will turn <Text style={{color:'#0A8754'}}>GREEN</Text>. It goes into your score and is now out of play.
      </Text>
      <Text style={styles.text}>
      The Taxman then gets all the factors of your number. Those numbers will turn <Text style={{color:'#2B59C3'}}>BLUE</Text> and will go into the Taxman's score. They are also out of play.
      </Text>
      <Text style={styles.text}>
      Your turn again. The taxman must take a tax on every turn. So if a number does not have any remaining factors on the board, you cannot choose it. These numbers are <Text style={{color:'#919190'}}>GREY</Text>. 
      </Text>
      <Text style={styles.text}>
      Continue playing until there are no numbers left to take. At this point, the Taxman gets all of the <Text style={{color:'#919190'}}>GREY</Text> numbers added to his score.
      </Text>
      <Text style={styles.text}>
      Whoever has the highest score wins!
      </Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  text: {
    fontSize: 20, 
    margin: 10
  },

});

export default Instructions;