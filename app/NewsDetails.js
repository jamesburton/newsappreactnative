import React from 'react';
import {Linking, Text, View} from 'react-native';
//var NewsDetails = () => <Text>[NewsDetails]</Text>;
/*
var NewsDetails = (props) => 
    <View>
        <View><Text>[NewsDetails]</Text></View>
        <View><Text>{props.title}</Text></View>
        <View><Text style={{color: 'blue', textDecorationStyle: 'underline'}} onPress={() => Linking.openURL(props.link)}>{props.link}</Text></View>
        <View><Text>{props.description}</Text></View>
    </View>;
*/
class NewsDetails extends React.Component
{
    constructor(props) {
        super(props);
    }
    render() {
        var props = this.props;
        var item = props.selectedItem;
        console.log('Rendering NewsDetails: props=', props, ', item=', item);
        return <View>
            <View><Text>[NewsDetails]</Text></View>
            <View><Text>{item.title}</Text></View>
            <View><Text style={{color: 'blue', textDecorationStyle: 'underline'}} onPress={() => Linking.openURL(item.link)}>{item.link}</Text></View>
            <View><Text>{item.description}</Text></View>
        </View>;
    }
}
module.exports = NewsDetails;