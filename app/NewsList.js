import React from 'react';
import {Text, View, ListView} from 'react-native';
import NewsItem from './NewsItem';
class NewsList extends React.Component
{
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: this.rowHasChanged});
    }
    rowHasChanged(r1, r2) { return r1 !== r2}
    render() {
        let props = this.props;
        let rows = this.ds.cloneWithRows(props.items || []);
        return <View>
            <View style={{backgroundColor: '#aaa'}}>
                <Text>Active Sources: { props.bbcChecked && 'BBC'} { props.reutersChecked && 'Reuters' }</Text>
            </View>
            <View style={{backgroundColor: '#aaa'}}>
                <Text>Active Categories: { props.ukChecked && 'UK'} { props.technologyChecked && 'Technology' }</Text>
            </View>
            <View>
                <ListView 
                    enableEmptySections={true}
                    renderHeader={() => <Text>[NewsList header 2]</Text>}
                    renderFooter={() => (props.items||[]).length === 0 && <Text>No active data</Text> }
                    dataSource={rows}
                    renderRow={row => <NewsItem {...row} selectItem={() => props.selectItem(row)} key={row.link} />}
                />
            </View>
        </View>;
    }
}
/*
        renderRow={(item) => <View onClick={() => props.selectItem(item)}><Text>{item.title}</Text></View> }
        renderRow={row => <NewsItem {...row} onClick={() => props.selectItem(row)} />}
*/
module.exports = NewsList;