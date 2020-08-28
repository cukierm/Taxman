import * as React from 'react';
import {View, Text, Modal, TouchableOpacity, StyleSheet} from 'react-native';
import { Input } from 'react-native-elements';
import { Axios } from '../api/Axios';
import axios from 'axios';


class StartGame extends React.Component {

constructor(props) {
  super(props);
  this.state={
    name: '',
    numButtons: 20,
    errMess:'',
    user: ''
  }
}

  neutralArray = () => {
      let neutral = [];
      for (let i=1; i<=this.state.numButtons; i++) {
        neutral.push(i);
      }
      return neutral;
    }

  validate = (num) => {
    let errMess = '';
    if(isNaN(num)) {
        errMess = 'Please enter a number'
    }
    else if (num <= 0) {
        errMess = 'The number of buttons must be positive';
    }
    else if ((num) % 1 !== 0) {
        errMess = 'The number of buttons must be a whole number';
    }
    else errMess = '';
    this.setState({errMess: errMess})
    //console.log('this.state.errMess is ', this.state.errMess);
}

checkUserExists = () => {

Axios.get('/users')
.then

}

makeUser = () => {
  console.log('MakeUser got called, but has not done anything yet');

  Axios.post('/users', {
    name: this.state.name, 
    highScore20: 0,
    highScore50: 0
  })
  .then(res => {
    console.log("this is the response from the post method: ", res.data);
    console.log('--------------');
    this.setState({user: res.data}, () => console.log("and this is the state of playagainComponent: ", this.state));
    this.props.setUser(res.data);
  })
  .catch(err => console.log('error', err.message));

}

handleSubmit = () => {

  //I need to figure out how to turn the below into the "else if" partbecause otherwise a new user will be created anytime someone plays the game! See Taxman to-do.
  
  console.log('the value of notFirstGame is ', this.props.firstGame);

  if(this.props.firstGame && (this.state.numButtons==20  || this.state.numButtons==50)) {
    console.log("I hope we're about to make a user.");
    this.makeUser();
  }

  if(this.state.numButtons > 0) {
    this.props.changeMyStateStart(this.state.name, this.state.numButtons, this.neutralArray(), false, this.state.user);
    this.setState({errMess:''}, () => console.log('after submit, the value of firstGame is', this.props.firstGame));
  }



}

  render() {

    return(

  <Modal visible={this.props.modalOpen} animationType='slide' style={{marginTop: 20}}>

    <View style={{flex: 1,
              alignItems:"center",
              justifyContent:'space-around'}}>
      <View style={{
            width: 200,
            height: 50,
            margin: 20
          }}
          >

          <Input  label='Enter your name:' labelStyle={{fontSize: 20, fontStyle: 'normal', color: 'black'}} 
                      inputContainerStyle={{borderColor:"black", borderWidth:1, marginBottom:25}}  
                      onChangeText={text => this.setState({name: text})}
                      value={this.state.name}
          />

          <Input  label='Enter a number of buttons:' labelStyle={{fontSize: 20, fontStyle: 'normal', color: 'black'}} 
                  inputContainerStyle={{borderColor:"black", borderWidth:1}}  
                  onChangeText={text => this.setState({numButtons: Number(text)}, () => this.validate(this.state.numButtons))} 
                  value={this.state.numButtons} 
                  errorMessage={this.state.errMess}
                  renderErrorMessage
         />
      </View>
      <View style={{}}>
        <TouchableOpacity onPress={this.handleSubmit}
            style={styles.button}>
              <Text style={styles.Text}>OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>

    );
  }
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    width: 100,
    borderRadius: 5,
    backgroundColor: '#F38DDD',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 30,
    padding:3,
  }
});

export default StartGame;