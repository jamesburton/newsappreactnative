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
        console.log('Rendering NewsDetails: props=', props);
        //return <View><Text>[NewsDetails]</Text></View>;
        return <View>
            <View><Text>[NewsDetails]</Text></View>
            <View><Text>[props.title]</Text></View>
        </View>;
        /*
        return
    <View>
        <View><Text>[NewsDetails]</Text></View>
        <View><Text>{props.title}</Text></View>
        <View><Text style={{color: 'blue', textDecorationStyle: 'underline'}} onPress={() => Linking.openURL(props.link)}>{props.link}</Text></View>
        <View><Text>{props.description}</Text></View>
    </View>;
        */
    }
}
module.exports = NewsDetails;