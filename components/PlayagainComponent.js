import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Axios } from '../api/Axios';

class Playagain extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      gameHighScore20: 0,
      gameHighScore50: 0
    }

    this.compareHighScore = this.compareHighScore.bind(this);
  }

  componentDidMount() {
    console.log('CDM');
    this.props.setNotFirstGame();
    console.log()
    this.compareHighScore();
  }

  compareHighScore = () => {
    console.log('-------------------');
    console.log('yourScore is', this.props.yourScore);
    console.log('existing user highscore is ', this.props.user.highScore20);

    if (this.props.numButtons == 20 && this.props.yourScore > this.props.user.highScore20) {
      Axios.put(`/users/${this.props.user._id}`, {
        highScore20: this.props.yourScore
      })
      .then(res => {
        this.setState({gameHighScore20: res.data.highScore20}, () => console.log('now the user objects high score is ', res.data.highScore20));
      })
      .catch(err => console.log("error: ", err.message));
    }
    else if (this.props.numButtons == 50 && this.props.yourScore > this.props.user.highScore50) {
      Axios.put(`/users/${this.props.user._id}`, {
        highScore50: this.props.yourScore
      })
      .then(res => {
        console.log(res.data);
        this.setState({gameHighScore50: res.data.highScore50});
      })
      .catch(err => console.log("error: ", err.message));
    }
  }

  render() {
    let winText = (this.props.yourScore >= this.props.taxmanScore) ? 'YOU WIN!!!' : 'YOU LOSE!!!'
    console.log('this is the render method of playagain');
    //if(!this.props.gameActive) {
      //console.log('props of Playagain are ', this.props);
      let highScore = '';
      if (this.props.numButtons == 20) {
        highScore = this.state.gameHighScore20
        console.log('this is the 20 if branch');
        console.log('in the this.state, gameHighScore is ', this.state.gameHighScore20);
        console.log('the value of the variable highScore is', highScore);
      }
      else if (this.props.numButtons == 50) {
        highScore = this.state.gameHighScore50
        console.log('this is the 50 if branch');
        console.log(highScore)
      }

      return(
        <View>
          <Text style={{fontSize: 30, alignSelf: "center"}}>{winText}</Text>
          <Text style={{fontSize: 30, alignSelf: "center"}}>Your high score is {highScore || 'to be determined'}.</Text>
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
    //else {return(<View></View>)}
  //}
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