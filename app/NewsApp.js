import React from 'react';
import {Text, View} from 'react-native';
import {Container, Content, Header, Footer} from 'native-base';

import NewsHeader from './NewsHeader';
import Filters from './Filters';
import NewsList from './NewsList';
import NewsDetails from './NewsDetails';
import NewsFooter from './NewsFooter';

//var NewsApp = (props) => <Container>
var NewsApp = (props) => {
    console.log('Rendering NewsApp: props=', props);
    return <Container>
    <Header>
        <NewsHeader />
    </Header>
    <Content>
        <View><Filters toggleBBC={props.toggleBBC} toggleReuters={props.toggleReuters} toggleUK={props.toggleUK} toggleTechnology={props.toggleTechnology} /></View>
        <View>
            <NewsList 
                bbcChecked={props.bbcChecked} 
                reutersChecked={props.reutersChecked} 
                ukChecked={props.ukChecked} 
                technologyChecked={props.technologyChecked}
                items={props.items}
                selectItem={props.selectItem}
                />
        </View>
        { props.selectedItem && <View><NewsDetails selectedItem={props.selectedItem} /></View> }
    </Content>
    <Footer>
        <NewsFooter />
    </Footer>
</Container>
}
;
module.exports = NewsApp;