import codePath from 'react-native-code-push';

import React from 'react';
import {ScrollView, Text, View} from 'react-native';
//import {Container, Content, Footer, Header} from 'native-base';
//import {Col, Grid, Row} from 'react-native-easy-grid';

import NewsHeader from './NewsHeader';
import Filters from './Filters';
import NewsList from './NewsList';
import NewsDetails from './NewsDetails';
import NewsFooter from './NewsFooter';

/*/ NB: In-case device window sizes are required (see http://stackoverflow.com/questions/29447715/react-native-fixed-footer)
var Dimensions = require('Dimensions')
var {width, height} = Dimensions.get('window')
//*/

/*
// Copied and tweaked from react-native-layout: https://raw.githubusercontent.com/jerolimov/react-native-layout/master/lib/BorderLayout.js
const reorderSubviews = subviews => {
	if (!subviews.findIndex) {
		return subviews;
	}

	// TODO: RTL

	const horizontalStartIndex = subviews.findIndex(subview => subview.type == Left || subview.type == Right);
	const verticalStartIndex = subviews.findIndex(subview => subview.type == Top || subview.type == Bottom);

	if (horizontalStartIndex !== -1 || verticalStartIndex !== -1) {
		const isHorizontal = horizontalStartIndex < verticalStartIndex && horizontalStartIndex !== -1 || verticalStartIndex === -1;
		const startIndex = isHorizontal ? horizontalStartIndex : verticalStartIndex;

		const before = [], after = [];

		for (var i = startIndex; i < subviews.length; i++) {
			if (isHorizontal && subviews[i].type == Left || !isHorizontal && subviews[i].type == Top) {
				before.push(subviews[i]);
			} else if (isHorizontal && subviews[i].type == Right || !isHorizontal && subviews[i].type == Bottom) {
				after.unshift(subviews[i]);
			} else {
				break;
			}
		}

		const skipped = subviews.slice(0, startIndex);
        // NB: Patch the lack of Overlay
        var Overlay = null;
		const content = subviews.slice(i).filter(subview => subview.type != Overlay);
		//const overlays = subviews.slice(i).filter(subview => subview.type == Overlay);

		const reordered = skipped.concat(before)
            .concat(reorderSubviews(content))
            .concat(after)
            //.concat(overlays)
            ;

		return <View style={{ flex: 1, flexDirection: isHorizontal ? 'row' : 'column' }}>{ reordered }</View>;
	}

	return subviews;
};
export class Layout extends React.Component {
	render() {
		return (
			<View style={ this.props.style }>
				{ this.props.children && reorderSubviews(this.props.children) }
			</View>
		);
	}
}
export class FillLayout extends React.Component {
	render() {
		return (
			<Layout style={[{ flex: 1 }, this.props.style ]}>
				{ this.props.children && reorderSubviews(this.props.children) }
			</Layout>
		);
	}
}

export class Left extends Layout {}
export class Right extends Layout {}
export class Top extends Layout {}
export class Bottom extends Layout {}
//**********************
*/

//var NewsApp = (props) => <Container>
var NewsApp = (props) => {
    console.log('Rendering NewsApp: props=', props);
    /*
    return <Container>
    <Header>
        <NewsHeader />
    </Header>
    { /* 
    <Content>
        <FillLayout>
            <Top key="Top">
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
            </Top>

            <View key="Content">
                <NewsList 
                    bbcChecked={props.bbcChecked} 
                    reutersChecked={props.reutersChecked} 
                    ukChecked={props.ukChecked} 
                    technologyChecked={props.technologyChecked}
                    items={props.items}
                    selectItem={props.selectItem}
                    />
            </View>

            <Bottom key="Bottom">
                { props.selectedItem && <NewsDetails selectedItem={props.selectedItem} /> }
            </Bottom>
        </FillLayout>
    </Content>
    * / }
    <View style={{flex: 1, flexDirection: 'column'}}>
        <View>
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
        { props.selectedItem && <View><NewsDetails selectedItem={props.selectedItem} /></View> }
    </View>

    <Footer>
        <NewsFooter />
    </Footer>
</Container>
}   // */
    //*
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