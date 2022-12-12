import React, { Component } from 'react';
import { View, Text, Image, StatusBar, TouchableOpacity, ImageBackground, TextInput, Dimensions, Alert } from 'react-native';
import { Fonts } from './';
import colors from '../common/Colors';



import ImagesAssets from '../../src/common/ImagesAssets';
import Singleton from '../common/Singleton';


export default class NFCScanner extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }




    render() {


        return (
            <View style={{ width: Dimensions.get("window").width, height: Dimensions.get("window").height, position: "absolute", justifyContent: "flex-end", alignItems: "center", position: "absolute" }}>
                <TouchableOpacity style={{ width: '100%', backgroundColor: "#000", height: Dimensions.get("window").height, opacity: 0.5, position: "absolute" }}></TouchableOpacity>
                <View style={{ height: "50%", width: "90%", backgroundColor: "#fff", borderRadius: 20, alignItems: "center" }}>
                    <Text style={{ width: "100%", height: "10%", marginTop: "5%", fontFamily: Fonts.medium, fontSize: 20, color: colors.fontColorBlack, textAlign: "center" }}>{this.props.TopText}</Text>
                    <Image source={ImagesAssets.scanImage} style={{ aspectRatio: 1, height: "30%", marginTop: "5%" }}></Image>
                    <Text style={{ width: "70%", marginTop: "10%", fontFamily:Fonts.regular, fontSize: 14, color: colors.fontColorBlack, textAlign: "center" }}>{this.props.detailScreen}</Text>
                    <TouchableOpacity style={{ marginTop: "5%", width: "50%", height: "13%", borderRadius: 20, alignItems: "center", justifyContent: "center", borderWidth: 1 }} onPress={this.props.cancelClicked}><Text style={{ color: colors.fontColorBlack, fontSize: 14, fontFamily: Fonts.regular }}>Cancel</Text></TouchableOpacity>
                </View>
            </View>
        );
    }

}
