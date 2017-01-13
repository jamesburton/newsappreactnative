import React from 'react';
import {Linking, Text, WebView, View} from 'react-native';
//import {Linking, Text, View} from 'react-native';
import HTMLView from 'react-native-htmlview';
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
        //var item = props;
        console.log('Rendering NewsDetails: props=', props, ', item=', item);
        return item
        ? <View style={{borderWidth: 1, borderColor: '#aaa'}}>
            <View><Text>{item.title}</Text></View>
            <View><Text style={{color: 'blue'}} onPress={() => Linking.openURL(item.link)}>{item.link}</Text></View>
            <View>
                <HTMLView value={item.description} />
            </View>
        </View>
        : <View style={{borderWidth: 1, borderColor: '#aaa'}}>
            <Text style={{fontStyle: 'italic', fontSize: 'small'}}>No news item selected</Text>
        </View>;
    }
}
// <WebView ref={'webview'} automaticallyAdjustContentInsets={false} source={require('../Assets/aboutus.html')} />
// <View><Text>{item.description}</Text></View>
module.exports = NewsDetails;