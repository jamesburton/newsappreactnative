import React from 'react';
import styles from './styles';
import { Text, View } from 'react-native';
export var ErrorPage = (props) => <View style={styles.container}><Text style={styles.welcome} style={{color: '#f00'}}>News App (React-Native)</Text><Text>Error: {props.ex}</Text></View>;
module.exports = ErrorPage;