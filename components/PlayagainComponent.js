import * as React from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet, Modal, Image, Dimensions } from 'react-native';
import {Text} from 'react-native-elements';
import { Axios } from '../api/Axios';

const screenWidth = Dimensions.get('window').width

class Playagain extends React.Component {

  constructor(props) {
    super(props);
      this.state={
      newHighScore: false,
      gameOverOpen: false
    }
    this.compareHighScore = this.compareHighScore.bind(this);
  }

  componentDidMount() {
    if(this.props.user) {
      this.setState({
        highScore20: this.props.user.highScore20,
        highScore50: this.props.user.highScore50,
      }, this.compareHighScore())
    }
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
        this.setState({highScore20: res.data.highScore20, newHighScore: true}, () => console.log('now the user objects high score is ', res.data.highScore20));
      })
      .catch(err => console.log("error: ", err.message));
    }
    else if (this.props.numButtons == 50 && this.props.yourScore > this.props.user.highScore50) {
      Axios.put(`/users/${this.props.user._id}`, {
        highScore50: this.props.yourScore
      })
      .then(res => {
        console.log(res.data);
        this.setState({highScore50: res.data.highScore50, newHighScore: true});
      })
      .catch(err => console.log("error: ", err.message));
    }
  }

  render() {
    let winText = (this.props.yourScore >= this.props.taxmanScore) ? 'YOU WIN!!!' : 'YOU LOSE!!!'

      let highScore = null;
      if (this.props.numButtons == 20) {
        highScore = this.state.highScore20
      }
      else if (this.props.numButtons == 50) {
        highScore = this.state.highScore50
      }

      let highScoreSentence = null;
      if (this.state.newHighScore) {
        highScoreSentence = `Your new high score is ${highScore}!`
      }
      else if (this.props.user && (this.props.numButtons == 20 || this.props.numButtons == 50)) {
        highScoreSentence = `Your high score is ${highScore}`
      }

        return(
          <React.Fragment>
          <View style={{flex:1, alignItems:"center"}}>
            <Text style={{fontSize: 30, alignSelf: "center", marginTop:10}}>{winText}</Text>
            <Text style={{fontSize: 25, alignSelf: "center"}}>{highScoreSentence}</Text>
            <View style={{margin: 20 }}>
              <Text style={{fontSize: 20, alignSelf: "center"}}>Would you like to play again?</Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
              <TouchableOpacity onPress={() => {
                this.props.resetState()}} style={styles.button}>
                <Text style={styles.text}>YES</Text>
              </TouchableOpacity>
              <TouchableOpacity  onPress={() => this.setState({gameOverOpen: true})} style={styles.button}>
                <Text style={styles.text}>NO</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Modal visible={this.state.gameOverOpen} animationType='slide' style={{marginTop: 20}}>

            <View style={{
                  alignItems: 'center',
                  alignSelf: 'center',
            }}>
              <View style={{
                    marginTop:15,
                    alignItems:"center",
                    justifyContent:'flex-start'
              }}>
                  <Text style={styles.goodbyeText}>Tax you later!</Text>
                  <Image style ={styles.image} source={require('../assets/coins.png')} />
              </View>
            </View>
          </Modal>
        </React.Fragment>

        );
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
  },
  goodbyeText: {
    fontSize: 40
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
    alignSelf: 'center'
  }
})

export default Playagain;