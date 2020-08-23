import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { ButtonGroup } from 'react-native-elements';
import Nav from './components/NavComponent';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

export default function App() {
  return (
    <Nav />
    );
}