import React from 'react';
import {Text, View} from 'react-native';
//var NewsList = () => <Text>[NewsList]</Text>;
var NewsList = (props) => <View>
    <View>
        <Text>Sources: { props.bbcChecked ? 'BBC' : null } { props.reutersChecked ? 'Reuters' : null }</Text>
    </View>
    <View>
        <Text>Categories: { props.ukChecked ? 'UK' : null } { props.technologyChecked ? 'Technology' : null }</Text>
    </View>
    <Text>[NewsList]</Text>
</View>;
module.exports = NewsList;