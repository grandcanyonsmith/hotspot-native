import React from 'react';
import { View, ScrollView, Text, Image, StyleSheet, KeyboardAvoidingView, Button, TextInput, TouchableOpacity } from 'react-native';
import AppHeader from '../components/Header';
import * as ImagePicker from 'expo-image-picker';
import * as Contacts from 'expo-contacts';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import Constants from 'expo-constants';
import { Header } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';


export default class Form extends React.Component {
    constructor() {
        super()
        this.state = {
            image: null,
            select: false,
            isDatePickerVisible: false,
            isDateTimePickerVisible: false,
        }
    }

    componentWillMount() {
        const { navigation } = this.props
        const address = navigation.getParam('address')

        this.setState({ address: address })
    }

    _pickImage = async () => {
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
        });
        console.log(result);
        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }
    };

    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    }

    _handleTime = (time) => {
        console.log('A time1 has been picked: ', time);
        this._hideTimePicker();
        this.setState({ time: moment(time).format('LLL') })
    };

    buttonAction() {
        alert('Submit')
    }

    Back() {
        this.props.navigation.navigate('Dashboard')
    }

    static navigationOptions = { header: null }

    render() {
        const { image, select, address, time, icon } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <Header
                    placement='center'
                    centerComponent={{ text: 'Form', style: { color: '#fff' } }}
                    leftComponent={{ icon: 'arrow-back', color: '#fff', onPress: () => this.Back() }}
                />
                <KeyboardAvoidingView style={{ flex: 1 }} behavior={'padding'}>
                    <ScrollView style={{ flex: 1 }}>
                        <View style={{ alignItems: "center" }} >
                            {image ?
                                <Image source={{ uri: image }} style={{ width: "90%", height: 220 }} />
                                :
                                <Button
                                    title="Pick an image from Gallery"
                                    onPress={this._pickImage}
                                />
                            }

                            <View style={{ width: '90%', marginTop: 20, }}>
                                <Text style={{ color: 'black', fontSize: 18, fontWeight: '600', textDecorationLine: 'underline' }}>Side Name:</Text>
                            </View>
                            <View style={styles.container}>
                                <TextInput
                                    value={this.state.text}
                                    onChangeText={e => this.setState({ text: e })}
                                    style={styles.input}
                                />
                            </View>
                            <View style={{ width: '90%', marginTop: 30, }}>
                                <Text style={{ color: 'black', fontSize: 18, fontWeight: '600', textDecorationLine: 'underline' }}>Side Type:</Text>
                            </View>
                            <View style={{ width: '90%', marginTop: 10, }}>
                                <Text onPress={() => this.setState({ select: false })} style={select ? { color: 'gray', fontSize: 18, fontWeight: '300' } : { color: 'black', fontSize: 18, fontWeight: '400', borderColor: 'black', borderWidth: 1 }}>Permanent</Text>
                            </View>
                            <View style={{ width: '90%', marginTop: 10, }}>
                                <Text onPress={() => this.setState({ select: true })} style={select ? { color: 'black', fontSize: 18, fontWeight: '400', borderColor: 'black', borderWidth: 1 } : { color: 'gray', fontSize: 18, fontWeight: '300' }}>Temporary</Text>
                            </View>

                            {select &&
                                <View style={{ width: '90%', marginTop: 20 }}>
                                    <TouchableOpacity style={styles.dateTime} onPress={this._showDateTimePicker}>
                                        <Text style={styles.text}> Time  {time}</Text>
                                    </TouchableOpacity>
                                    <DateTimePicker
                                        isVisible={this.state.isDateTimePickerVisible}
                                        onConfirm={this._handleTime}
                                        onCancel={this._hideTimePicker}
                                        is24Hour={true}
                                        mode={'datetime'}
                                        titleIOS={'Time'}
                                    />
                                </View>
                            }

                            <View style={styles.container}>
                                <TextInput
                                    value={address.streetName + ' ' + address.city}
                                    onChangeText={e => this.setState({ text: e })}
                                    style={styles.input}
                                    editable={false}
                                />
                            </View>
                            <TouchableOpacity
                                onPress={() => this.buttonAction()}
                                activeOpacity={0.8}
                                style={styles.button}>
                                <View style={{ flexGrow: 1, alignItems: icon ? 'flex-end' : 'center', paddingHorizontal: 3 }}>
                                    <Text style={{ fontSize: 18, color: 'white' }}>
                                        SUBMIT
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    btns: {
        color: 'gray',
        fontSize: 14
    },
    container: {
        // flex: 1,
        // flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 4,
        width: '90%',
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowOpacity: 0.51,
        shadowRadius: 4.16,
        elevation: 5,
        shadowColor: 'grey',
        marginTop: 10,
        alignItems: "center",
        justifyContent: 'space-between'
    },
    input: {
        color: 'black',
        height: 50,
        width: '95%',
        fontSize: 18,
        paddingVertical: 10,
    },
    button: {
        width: '90%',
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: 15,
        alignItems: 'flex-end',
        flexDirection: 'row',
        alignContent: 'center',
        backgroundColor: '#3399ff',
        borderWidth: 1,
        borderColor: '#0080ff',
        marginTop: 20,
    },
    dateTime: {
        // marginBottom: 20,
        height: 50,
        width: '100%',
        paddingHorizontal: 10,
        fontSize: 18,
        backgroundColor: 'white',
        borderRadius: 4,
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowOpacity: 0.51,
        shadowRadius: 4.16,
        elevation: 5,
        shadowColor: 'grey',
        marginTop: 10,
        justifyContent: 'center'
    },
    text: {
        // marginTop: 8,
        fontSize: 18,
        // color: '#ffff',
        fontWeight: '500'
    },
})

