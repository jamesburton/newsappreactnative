import React from 'react';
import {Button, Text, View} from 'react-native';
import ToggleText from './ToggleText';
var Filters = (props) => <View style={{borderWidth: 1, borderColor: '#666'}}>
    <View style={{flexDirection: 'row'}}>
        <View><Text>Sources: </Text></View>
        <ToggleText value={props.bbcChecked} onChange={(checked) => props.setBBC(checked)} text="BBC"/>
        <ToggleText value={props.reutersChecked} onChange={(checked) => props.setReuters(checked)} text="Reuters"/>
    </View>
    <View style={{flexDirection: 'row'}}>
        <Text>Categories: </Text>
        <ToggleText value={props.ukChecked} onChange={(checked) => props.setUK(checked)} text="UK"/>
        <ToggleText value={props.technologyChecked} onChange={(checked) => props.setTechnology(checked)} text="Technology"/>
    </View>
</View>;
module.exports = Filters;