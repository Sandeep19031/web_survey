import React, { Component } from 'react';
import { View, Text, Image, StatusBar, TouchableOpacity, ImageBackground, TextInput, Dimensions, Alert } from 'react-native';
import colors from '../common/Colors';
import { Fonts } from './';



import ImagesAssets from '../../src/common/ImagesAssets';
import Singleton from '../common/Singleton';
import Images from './Images';


export default class NavigationBar extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }




  render() {


    return (
      <View style={{ width: '100%', marginTop: 0, height: Dimensions.get("window").height > 736 ? 120 : 100 }}>
        <ImageBackground style={{ width: "100%", height: "100%", alignItems: "center", flexDirection: "row" }}>
          {this.props.backEnabled == true &&
            <TouchableOpacity style={{ marginLeft: 10, alignItems: "center", justifyContent: "center", height: 30, width: 30 }} onPress={this.props.backClicked}>
              <Image source={Images.arrow_back_header}></Image>
            </TouchableOpacity>
          }
          {this.props.ProfilePhotoEnabled == true &&
            <TouchableOpacity style={{ marginLeft: 10, alignItems: "center", height: Singleton.getInstance().showNavigationWhiteView ? 35 : 20, width: Singleton.getInstance().showNavigationWhiteView ? 35 : 20, borderRadius: Singleton.getInstance().showNavigationWhiteView ? 17.5 : 0, justifyContent: "center" }}>
              <View style={{ height: 30, width: 30, alignContent: "center", justifyContent: "center", backgroundColor: Singleton.getInstance().getRandomColor(), borderRadius: 15 }}><Text style={{ marginTop:2, textAlign: 'center', fontFamily: Fonts.regular, color: colors.fontColorWhite }}>{this.props.title.charAt(0)}</Text>
              </View>
            </TouchableOpacity>
          }
          <Text style={{ marginLeft: this.props.backEnabled == false && this.props.ProfilePhotoEnabled == false ? 20 : 10, alignItems: "center", fontSize: 25, color: colors.fontColorWhite, fontFamily: Fonts.medium, textTransform: 'capitalize' }}>
            {this.props.title}
          </Text>
          {this.props.thirdButtonEnabled == true &&
            <TouchableOpacity onPress={this.props.thirdClicked} style={{ right: Singleton.getInstance().showNavigationWhiteView ? 20 : 10, position: "absolute", width: 20, height: 20 }}><Image source={this.props.thirdImage} ></Image></TouchableOpacity>
          }
          {this.props.secondbuttonEnabled == true &&
            <TouchableOpacity onPress={this.props.secondClicked} style={{ right: Singleton.getInstance().showNavigationWhiteView ? 49 : 39, position: "absolute", width: 20, height: 20 }}><Image source={this.props.secondImage}></Image></TouchableOpacity>
          }
          {this.props.firstButtonEnabled == true &&
            <TouchableOpacity disabled={Singleton.getInstance().showNavigationWhiteView ? false : this.props.canGoBack ? false : true} onPress={this.props.firstClicked} style={{ right: Singleton.getInstance().showNavigationWhiteView ? 80 : 70, position: "absolute", width: 20, height: 20, opacity: Singleton.getInstance().showNavigationWhiteView ? 1.0 : this.props.canGoBack ? 1.0 : 0.5 }}><Image source={this.props.firstImage}></Image></TouchableOpacity>
          }

          {Singleton.getInstance().showNavigationWhiteView == true &&
            <View style={{ position: "absolute", bottom: Dimensions.get("window").height > 736 ? -25 : -35, left: 0, right: 0, backgroundColor: "#fff", height: 50, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}></View>
          }

        </ImageBackground>

        {/* <Text style={{alignItems:"center", justifyContent:"center"}}>{this.props.title}</Text> */}


      </View>
    );
  }

}
