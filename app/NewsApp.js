import codePush from 'react-native-code-push';

import React from 'react';
import {ScrollView, Text, View} from 'react-native';

import NewsHeader from './NewsHeader';
import Filters from './Filters';
import NewsList from './NewsList';
import NewsDetails from './NewsDetails';
import NewsFooter from './NewsFooter';

var NewsApp = (props) => {
    console.log('Rendering NewsApp: props=', props);
    return <View style={{flex: 1, flexDirection: 'column'}}>
        <View style={{backgroundColor: '#88f' }}>
            <NewsHeader />
        </View>
        <ScrollView style={{flex: 1, flexDirection: 'column'}}>
            <View>
                <View style={{backgroundColor: '#ccc'}}>
                    <Filters 
                        bbcChecked={props.bbcChecked}
                        reutersChecked={props.reutersChecked}
                        ukChecked={props.ukChecked}
                        technologyChecked={props.technologyChecked}
                        toggleBBC={props.toggleBBC} 
                        toggleReuters={props.toggleReuters} 
                        toggleUK={props.toggleUK} 
                        toggleTechnology={props.toggleTechnology} 
                        setBBC={props.setBBC} 
                        setReuters={props.setReuters} 
                        setUK={props.setUK} 
                        setTechnology={props.setTechnology} 
                        />
                </View>
                <View style={{flex: 1}}>
                    <NewsList 
                        bbcChecked={props.bbcChecked} 
                        reutersChecked={props.reutersChecked} 
                        ukChecked={props.ukChecked} 
                        technologyChecked={props.technologyChecked}
                        items={props.items}
                        selectItem={props.selectItem}
                        />
                </View>
            </View>
        </ScrollView>

        <View style={{backgroundColor: "#ccc"}}><NewsDetails selectedItem={props.selectedItem} /></View>
        <View style={{backgroundColor: "#88f"}}>
            <NewsFooter />
        </View>
    </View>
}
;

NewsApp = codePush(NewsApp);
module.exports = NewsApp;