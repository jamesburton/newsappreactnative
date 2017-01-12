import React from 'react';
import {Text, View} from 'react-native';
import {Container, Content, Footer, Header} from 'native-base';
import {Col, Grid, Row} from 'react-native-easy-grid';

import NewsHeader from './NewsHeader';
import Filters from './Filters';
import NewsList from './NewsList';
import NewsDetails from './NewsDetails';
import NewsFooter from './NewsFooter';

// NB: In-case device window sizes are required (see http://stackoverflow.com/questions/29447715/react-native-fixed-footer)
var Dimensions = require('Dimensions')
var {width, height} = Dimensions.get('window')

//var NewsApp = (props) => <Container>
var NewsApp = (props) => {
    console.log('Rendering NewsApp: props=', props);
    return <Container>
    <Header>
        <NewsHeader />
    </Header>
    <Content>
        { /*
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
        */ }
        { /*
        <Grid>
            <Row style={{width: 200, height: 200}}>
                <Filters toggleBBC={props.toggleBBC} toggleReuters={props.toggleReuters} toggleUK={props.toggleUK} toggleTechnology={props.toggleTechnology} />
            </Row>
            <Row style={{width: 200, height: 200}}>
                <NewsList 
                    bbcChecked={props.bbcChecked} 
                    reutersChecked={props.reutersChecked} 
                    ukChecked={props.ukChecked} 
                    technologyChecked={props.technologyChecked}
                    items={props.items}
                    selectItem={props.selectItem}
                    />
            </Row>
            { props.selectedItem && <Row style={{width: 200, height: 200}}><View><NewsDetails selectedItem={props.selectedItem} /></View></Row> }
        </Grid>
        */ }
        { /* 
        <Grid>
            <Row style={{width: 200, height: 140}}>
                <Filters toggleBBC={props.toggleBBC} toggleReuters={props.toggleReuters} toggleUK={props.toggleUK} toggleTechnology={props.toggleTechnology} />
            </Row>
            <Row style={{ height: 200 }}>
                <NewsList 
                    bbcChecked={props.bbcChecked} 
                    reutersChecked={props.reutersChecked} 
                    ukChecked={props.ukChecked} 
                    technologyChecked={props.technologyChecked}
                    items={props.items}
                    selectItem={props.selectItem}
                    />
            </Row>
            <Row style={{ height: 200 }}>
                <NewsDetails {...props.selectedItem} />
            </Row>
            { /*  NB: Grid only uses the first size, so this doesn't reserve the space, and if not inverted it always takes the space, so switching to an "None Selected" display instead
            <Row style={{ height: !props.selectedItem ? 0 : 200 }}>
                <NewsDetails {...props.selectedItem} />
            </Row>
            * / }
        </Grid>
        */ }
        <View>
            <View style={{height: 140}}>
                <Filters toggleBBC={props.toggleBBC} toggleReuters={props.toggleReuters} toggleUK={props.toggleUK} toggleTechnology={props.toggleTechnology} />
            </View>
            <View style={{height: height-340}}>
                <NewsList 
                    bbcChecked={props.bbcChecked} 
                    reutersChecked={props.reutersChecked} 
                    ukChecked={props.ukChecked} 
                    technologyChecked={props.technologyChecked}
                    items={props.items}
                    selectItem={props.selectItem}
                    />
            </View>
            <View style={{ height: 200}}>
            { props.selectedItem && <NewsDetails selectedItem={props.selectedItem} /> }
            </View>
        </View>
    </Content>
    <Footer>
        <NewsFooter />
    </Footer>
</Container>
}
;
//             { props.selectedItem && <Row style={{height: 200}}><NewsDetails selectedItem={props.selectedItem} /></Row> }
//             { props.selectedItem && <View style={{flex: 1}}><NewsDetails selectedItem={props.selectedItem} /></View> }

module.exports = NewsApp;