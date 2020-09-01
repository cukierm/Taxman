import * as React from 'react';
import {View, Text, Modal, TouchableOpacity, StyleSheet, Picker} from 'react-native';
import { Input } from 'react-native-elements';
import { Axios } from '../api/Axios';


class StartGame extends React.Component {

constructor(props) {
  super(props);
  this.state={
    name: this.props.name,
    numButtons: 20,
    errMess:'',
    user: null,
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
}

getUserInfo = () => {

  Axios.get(`/users/getuser/${this.state.name}`)
  .then(res => {
    this.setState({user: res.data}, () => {
      if(!this.state.user && (this.state.numButtons==20  || this.state.numButtons==50)) {
          this.makeUser();
      } else {
        this.props.setUser(res.data);
      }
    })
  })
  .catch(err => console.log('error', err.message));
}

makeUser = () => {
  console.log('making a user');

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
  
  console.log('state of startGame is', this.state);

  if(this.state.name) {
  this.getUserInfo();
  }

  if(this.state.numButtons > 0) {
    this.props.changeMyStateStart(this.state.name, this.state.numButtons, this.neutralArray(), false);
    this.setState({errMess:''});
  }
}

  render() {

    return(

  <Modal visible={this.props.modalOpen} animationType='slide' style={{marginTop: 20}}>

    <View style={{flex: 2,
              alignItems:"center",
              justifyContent:'space-around',
              margin: 40
            }}
              >
      <View style={{
            width: 200,
            height: 300,
             
            //flex: 1,
            alignItems:"center",
            justifyContent:'center'
          }}
          >

          <Input  label='Enter your name:' labelStyle={{fontSize: 20, fontStyle: 'normal', color: 'black'}} 
                      inputContainerStyle={{borderColor:"black", borderWidth:1, marginBottom:25}}  
                      onChangeText={text => this.setState({name: text})}
                      value={this.state.name}
          />

          <Input  label='Enter a number of buttons:' labelStyle={{fontSize: 20, fontStyle: 'normal', color: 'black'}} 
                  inputContainerStyle={{borderColor:"black", borderWidth:1, marginBottom:25}}  
                  onChangeText={text => this.setState({numButtons: Number(text)}, () => this.validate(this.state.numButtons))} 
                  value={String(this.state.numButtons)} 
                  errorMessage={this.state.errMess}
                  renderErrorMessage
          />
          <Input label='Or choose 20 or 50 for high score:' labelStyle={{fontSize: 20, fontStyle: 'normal', color: 'black'}}
                inputContainerStyle={{borderColor:"white", borderWidth:1, height:1, margin: 0, padding: 0}} containerStyle={{margin: 0, padding: 0}} />


         <Picker
            selectedValue={this.state.numButtons}
            style={{height: 50, width: 100, padding: 0}}
            onValueChange={(itemValue) =>
              this.setState({numButtons: itemValue})
            }>
            <Picker.Item label="20" value="20" />
            <Picker.Item label="50" value="50" />
          </Picker>

    
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
    marginTop: 30,
    padding:3,
  }
});

export default StartGame;