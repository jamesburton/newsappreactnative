import React from 'react';
import { Text, View } from 'react-native';
var NewsItem = (props) => <View onClick={props.onClick}>
    <Text onPress={props.selectItem}>{props.title}</Text>
</View>;
module.exports = NewsItem;