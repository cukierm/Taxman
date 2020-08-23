import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const baseurl = 'localhost:3000/users';

class Playagain extends React.Component {

  render() {

    let winText = (this.props.yourScore >= this.props.taxmanScore) ? 'YOU WIN!!!' : 'YOU LOSE!!!'

    if(!this.props.gameActive) {
      return(
        <View>
          <Text style={{fontSize: 30, alignSelf: "center"}}>{winText}</Text>
          <View style={{margin: 20, }}>
            <Text style={{fontSize: 20, alignSelf: "center"}}>Would you like to play again?</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
            <TouchableOpacity onPress={() => {
              console.log('trying to reset the state!');
              this.props.resetState()}} style={styles.button}>
              <Text style={styles.text}>YES</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => console.log('game over')} style={styles.button}>
              <Text style={styles.text}>NO</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    else {return(<View></View>)}
  }
}

const styles = StyleSheet.create({
button: {
  height: 50,
  width: 100,
  borderRadius: 5,
  backgroundColor: '#F38DDD',
  alignItems: 'center',
  justifyContent: 'center',
  margin: 10,
  padding:3,
},
text: {
  fontSize: 20
}
})

export default Playagain;