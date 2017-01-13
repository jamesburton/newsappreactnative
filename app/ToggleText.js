import React from 'react';
import { Text, View } from 'react-native';
class ToggleText extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: props.value || false };
        this.onPress = this.press.bind(this);
    }
    press() {
        var value = !this.state.value;
        this.setState({value: value});
        if(this.props.onChange)
            this.props.onChange(value);
    }
    render() {
        return <View style={{marginRight: this.props.spacing || 5}}>
            <Text onPress={this.onPress} style={{textDecorationLine: this.state.value ? 'none' : 'line-through'}} {...this.props}>{this.props.text}</Text>
        </View>;
    }
}
module.exports = ToggleText;
