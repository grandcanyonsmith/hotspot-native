import React from 'react';
import { View, ScrollView, Text, Image, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import AppHeader from '../components/Header'
import { Marker } from 'react-native-maps';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Expo } from 'expo';

import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import Constants from 'expo-constants';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class Map extends React.Component {
    constructor() {
        super()
        this.state = {
            currentLocation: { lat: null, lng: null },
            get: false,
        }
    }

    componentDidMount() {
        if (!Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            this._getLocationAsync();
        }
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        let location = await Location.getCurrentPositionAsync({});

        let address = Promise.resolve(Location.reverseGeocodeAsync(location.coords));
        var that = this
        address.then(function (value) {
            let array = value.map(val => {
                console.log('currentLocation==>', val);
                var obj = {
                    address: {
                        country: val.country,
                        city: val.city,
                        streetName: val.name,
                    },
                    coordinates: {
                        lat: location.coords.latitude,
                        lng: location.coords.longitude
                    }
                }
                // that.props._address(obj)
                const { add } = that.props
                add(obj)
                that.setState({ address: obj })
            })
        })
        this.setState({
            currentLocation: { lat: location.coords.latitude, lng: location.coords.longitude },
            get: true,
        });
    };

    markerDrag(e) {
        this.setState({
            currentLocation: { lat: e.coordinate.latitude, lng: e.coordinate.longitude },
        })
    }

    static navigationOptions = { header: null }

    render() {
        const { currentLocation, get } = this.state
        return (
            <View style={{ flex: 1 }}>
                {get ?
                    < MapView
                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={styles.map}
                        region={{
                            latitude: currentLocation.lat,
                            longitude: currentLocation.lng,
                            latitudeDelta: LATITUDE_DELTA,
                            longitudeDelta: LONGITUDE_DELTA,
                        }}
                    >

                        <MapView.Marker
                            draggable
                            coordinate={{
                                latitude: currentLocation.lat,
                                longitude: currentLocation.lng,
                            }}
                            onDragEnd={e => this.markerDrag(e.nativeEvent)}
                        />

                    </MapView >
                    :
                    <View style={styles.container}>
                        <Text style={{ fontSize: 18, fontWeight: '700', }} >Location Not Available!</Text>
                    </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f6f9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },

});
