import React from 'react';
import { View, ScrollView, Text, Image, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import AppHeader from '../components/Header';
import Map from './Map';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            address: null
        }
    }

    address(e) {
        this.setState({ address: e })
    }

    static navigationOptions = { header: null }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <AppHeader address={this.state.address} navigation={this.props.navigation} />
                <Map add={(e) => this.address(e)} />
            </View>
        );
    }
}
