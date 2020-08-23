import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-elements';


class Score extends React.Component {
  
  constructor(props) {
    super(props)
  }

  render () {
    return (
        <View style={{flexDirection: 'row', flex:1, alignItems: 'center'}}>
          <Card title='YOUR SCORE' wrapperStyle={{margin:10}} containerStyle={{width:'35%'}}>
            <Text style={{alignSelf: 'center'}}>{this.props.yourScore}</Text>
          </Card>
          <Card title='TAXMAN SCORE' wrapperStyle={{margin:10}} containerStyle={{width:'45%'}}>
            <Text style={{alignSelf: 'center'}}>{this.props.taxmanScore}</Text>
          </Card>
        </View>
    );
  }
}

export default Score;