import * as React from 'react';
import { Text, View, Button, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import  Score  from './ScoreComponent';
import Playagain from './PlayagainComponent';
import StartGame from './StartGameComponent';

function arrEqualityCheck (arr1, arr2) {
  if (arr1.length == arr2.length) {
    for (let j=0; j < arr1; j++) {
      if (!(arr1[j] == arr2[j] )) {return false}
    }
    return true;
  }
  else return false;
}

class Taxman extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      numButtons: 20,
      neutral: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], //available numbers to choose
      mine: [], //numbers awarded to the player
      taxman: [], //numbers awarded to the taxman
      eliminated: [], //numbers that cannot be chosen because they have no factors left on the board
      yourScore: 0,
      taxmanScore: 0,
      modalOpen: true, 
      gameActive: true,
      user: null,
    };
    this.createButtons = this.createButtons.bind(this);
    this.changeMyStateStart = this.changeMyStateStart.bind(this);
    this.setUser = this.setUser.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  changeMyStateStart(newName, newNumButtons, newNeutral, newModalOpen) {
    this.setState({
      name: newName,
      numButtons: newNumButtons,
      neutral: newNeutral,
      modalOpen: newModalOpen, 
    });
  }

  setUser(newUser) {
    console.log(newUser);
    this.setState({
      user: newUser
    }, () => console.log(this.state));
  }

  resetState() {
    this.setState({
      neutral: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 
      mine: [], 
      taxman: [], 
      eliminated: [], 
      yourScore: 0,
      taxmanScore: 0,
      modalOpen: true, 
      gameActive: true,
    })
  }

  color = (i) => {
    if (this.state.eliminated.includes(i)) {
      return '#D6D1CD'
    }
    else if (this.state.neutral.includes(i)) {
      return '#8E7DBE';
    }
    else if (this.state.mine.includes(i)) {
      return '#0A8754';
    }
    else if (this.state.taxman.includes(i)) {
      return '#2B59C3';
    }
  }

  payout(i) {
    let index = this.state.neutral.indexOf(i);

    let newNeutral = this.state.neutral;
    let newMine = this.state.mine;
    let newTaxman = this.state.taxman;
    let newEliminated = this.state.eliminated;

    if (!(this.state.eliminated.includes(i) || this.state.mine.includes(i) || this.state.taxman.includes(i)))
      {
      newMine.push(i); //award the chosen number to the player

      newNeutral.splice(index, 1); //remove the chosen number from the available numbers

      for (let j = 0; j < newNeutral.length; j++) {
        let potentialFactor = newNeutral[j];
        if (
          potentialFactor < i 
          &&
          i % potentialFactor == 0
        ) {
          //look for factors of the chosen number
          newTaxman.push(potentialFactor); //and award them to the taxman
        }
      }

      newNeutral = newNeutral.filter((a) => newTaxman.indexOf(a) === -1); //remove numbers taken by the taxman from the neutral array

      newEliminated = newNeutral.filter((x) => {
          if (this.state.eliminated.includes(x)) {return true} //x is already in the eliminated array
          else {
            for (let j=0; j < x; j++) {
              //console.log('checking if ', x, 'is divisible by ', newNeutral[j]);
              if (x > newNeutral[j] && x % newNeutral[j] == 0) {
              //console.log(`${x} is divisible by ${newNeutral[j]} so false`);
              return false;
              }
            }
            //console.log(`${x} has no divisors on the board.`);
            return true;           
          }
      });

      this.setState(
        {
          mine: newMine,
          taxman: newTaxman,
          neutral: newNeutral,
          eliminated: newEliminated
        },
        this.computeScore
      );
    }
  }

  computeScore() {
    let yourScore = 0;
    let taxmanScore = 0;

    if (this.state.mine) {
      yourScore = this.state.mine.reduce((a,b) => a+b, 0);
      taxmanScore = this.state.taxman.reduce((a,b) => a+b, 0);
      this.setState({
      yourScore: yourScore,
      taxmanScore: taxmanScore
    })
    }

    if(arrEqualityCheck(this.state.eliminated, this.state.neutral)) {
      taxmanScore = taxmanScore + this.state.eliminated.reduce((a,b) => a+b,0);
      this.setState({
      yourScore: yourScore,
      taxmanScore: taxmanScore,
      gameActive: false
    })
    }
  }


  createButtons() {
    const buttons = [];
    for (let i = 1; i <= this.state.numButtons; i++) {
      buttons.push(
        <TouchableOpacity 
          key={i}
          style={{
            backgroundColor:this.color(i),
            width:30,
            height:30,
            margin: 5,
            alignContent: 'center',
            justifyContent: 'center',
            borderRadius: 5
          }}
          onPress={() => this.payout(i)}
          >
          <Text style={{fontSize:15, alignSelf: 'center'}}>{i.toString()}</Text>
        </TouchableOpacity>
      );
    }
    buttons.push(
      <TouchableOpacity onPress={() => {
        this.resetState()}} style={styles.restartButton} key={this.state.numButtons+1}>
        <Text style={{fontSize:18}}>Start Over</Text>
      </TouchableOpacity>
    )
    return buttons;
  }
  //much credit: https://reactnative.dev/docs/button.html
  
  render() {


    let result = '';

    if(this.state.yourScore > this.state.taxmanScore) {
      result = 'YOU WIN!!!';
    }
    else if (this.state.taxmanScore > this.state.yourScore) {
      result = 'YOU LOSE!!!';
    }
    else { result = 'YOU TIE!!!';}

    if (!this.state.gameActive) {
      return (
        <View style={{flex:1}}>
        <ScrollView style={{flexDirection: 'column', flexGrow:1, marginTop:30}}>
          
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap'}}>
            {this.createButtons()}
          </View>
          <View>
            <Score yourScore={this.state.yourScore} taxmanScore={this.state.taxmanScore} />
          </View>
          <View>
            <Playagain result={result} gameActive={this.state.gameActive} resetState={this.resetState} yourScore={this.state.yourScore} taxmanScore={this.state.taxmanScore} name={this.state.name} numButtons={this.state.numButtons} user={this.state.user}/>
          </View>
        </ScrollView>
        </View>
      );
    
  } else {
    return (
      <View style={{flex:1}}>
        <ScrollView style={{flexDirection: 'column', flexGrow:1, marginTop:30}}>
          <StartGame changeMyStateStart={this.changeMyStateStart} setUser={this.setUser} modalOpen={this.state.modalOpen} name={this.state.name} numButtons={this.state.numButtons}/>

          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap'}}>
            {this.createButtons()}
          </View>

          <View>
            <Score yourScore={this.state.yourScore} taxmanScore={this.state.taxmanScore} />
          </View>
        </ScrollView>
      </View>
    );}
  }
}

const styles = StyleSheet.create({
restartButton: {
  height: 30,
  width: 100,
  borderRadius: 5,
  backgroundColor: '#F38DDD',
  alignItems: 'center',
  justifyContent: 'center',
  margin:5,
  padding:3,
  marginBottom: 'auto'
},
text: {
  fontSize: 20
}
})
export default Taxman;
