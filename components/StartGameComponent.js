import * as React from 'react';
import {View, Text, Modal, TouchableOpacity, StyleSheet} from 'react-native';
import { Input } from 'react-native-elements';


class StartGame extends React.Component {

constructor(props) {
  super(props);
  this.state={
    name: this.props.name,
    numButtons: 20,
    errMess:''
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


handleSubmit = () => {
  if(this.state.numButtons > 0) {
    this.props.changeMyStateStart(this.state.name, this.state.numButtons, this.neutralArray(), false);
    this.setState({errMess:''});
  }
  if(this.state.name) {

    this.setState({name: 'name'});

    fetch('localhost:3000/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'this.state.name'
      }),
    })
    .then(response => {
      if (response.ok) {
        return response;
      }
      else {
        const error = new Error(`The response was not OK`);
        console.log(error);
      }
    })
    .then(response => response.json())
    .then((responseJson) => {
      console.log(JSON.stringify(responseJson));
      return(responseJson);
    })
    .catch((error) => {
      const errMess = new Error('Failed to POST');
      console.log(errMess);
    });

  }}

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