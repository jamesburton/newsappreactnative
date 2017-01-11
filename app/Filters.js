import React from 'react';
import {Button, Text, View} from 'react-native';
var Filters = (props) => <View>
    <View style={{flexDirection: 'row'}}>
        <Text>Sources: </Text>
        <View>
            <Button onPress={props.toggleBBC} title="Toggle BBC"/>
            <Button onPress={props.toggleReuters} title="Toggle Reuters"/>
        </View>
    </View>
    <View style={{flexDirection: 'row'}}>
        <Text>Categories: </Text>
        <View>
            <Button onPress={props.toggleUK} title="Toggle UK"/>
            <Button onPress={props.toggleTechnology} title="Toggle Technology"/>
        </View>
    </View>
</View>;
module.exports = Filters;