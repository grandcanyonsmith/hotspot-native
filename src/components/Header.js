import React from 'react';
import { Header } from 'react-native-elements';

export default class AppHeader extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            location: false
        }
    }

    componentWillReceiveProps(props) {
        if (props.address && props.address.address) {
            this.setState({ location: true, address: props.address })
        }
    }


    add() {
        const { address } = this.state
        this.props.navigation.navigate('Form', address)
    }

    render() {
        return (
            <Header
                placement='center'
                // rightComponent={{ icon: 'search', color: 'white', onPress: () => this.startSearch() }}
                centerComponent={{ text: 'Home', style: { color: '#fff' } }}
                leftComponent={this.state.location && { icon: 'add', color: '#fff', onPress: () => this.add() }}
            />
        );
    }
}
