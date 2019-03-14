import React, {Component} from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  PixelRatio,
  TouchableHighlight,
  Dimensions,
  Image
} from 'react-native';

import {
  ViroARSceneNavigator
} from 'react-viro';

import ButtonComponent from './js/Component/ButtonComponent';



var sharedProps = {
  apiKey:"A96217A2-0EA6-4173-803C-ACCF333CB9F6",
}

var InitialARScene = require('./js/ARMedicalView');


export default class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      dialog:"",
      sharedProps : sharedProps,
      viroAppProps : {changeHoverText: (a)=>{
        this.setState({centerText:a})
        },
      }
    }
    this._initialARView = this._initialARView.bind(this);
    this._overlayView = this._overlayView.bind(this);
    this._changeHoverText = this._changeHoverText.bind(this);
    this._ARView = React.createRef();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this._initialARView()}
        {this._overlayView()}
        <View style={styles.centerTextView}>
          <Text style={styles.centerText}> {this.state.centerText}</Text>
        </View>
        <View style={styles.textBoxContainer}>
          <View style={styles.textBox}>
            <Text style={styles.centerText}>{this.state.dialog}</Text>
          </View>
        </View>
        {this._buttonComponents()}
      </View>
    );
  }

  _initialARView(){
    return (
      <ViroARSceneNavigator {...this.state.sharedProps}
            style ={{flex:1}}
            initialScene={{scene: InitialARScene}}
            viroAppProps={this.state.viroAppProps}
            ref={this._ARView}
      />
    )
  }

  _overlayView(){
    return(
          <View style={styles.crosshair}/>
          )
  }

  _changeHoverText(text){
    this.setState({
      centerText : text,
    })
  }

  _buttonComponents(){
    return(
      <View style={{position:'absolute', flexDirection:'column', justifyContent: 'space-around',right:10, bottom:70, width:70, height:160, flex:1}}>
        <ButtonComponent key="button1"
            buttonState={'off'}
            stateImageArray={[require("./js/res/stethos.png"), require("./js/res/stethos.png")]}
            style={styles.screenIcon} selected={true}
            onPress={()=>{
              console.log(this._ARView.current)
            }}
        />
        <ButtonComponent key="button2"
            buttonState={'off'}
            stateImageArray={[require("./js/res/dialogue.png"), require("./js/res/stethos.png")]}
            style={styles.screenIcon} selected={true}
            onPress={()=>{
              console.log(this._ARView.current)
            }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  crosshair: {
    position: 'absolute',
    top: (Dimensions.get('window').height / 2),
    left: (Dimensions.get('window').width / 2),
    width: 5,
    height: 5,
    borderRadius: 5,
    borderWidth: 1,
  },
  centerText: {
    color: 'grey',
    fontWeight: 'bold',
    fontSize: 15,
  },
  centerTextView: {
    position: 'absolute',
    top: (Dimensions.get('window').height / 2),
    left: (Dimensions.get('window').width / 2),
  },
  centerText: {
    color: 'grey',
    fontWeight: 'bold',
    fontSize: 15,
  },
  screenIcon: {
    position : 'absolute',
    height: 58,
    width: 58,
  },
  textBoxContainer:{
    position : 'absolute',
    top:13,
    width:Dimensions.get('window').width,
    height:90,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'row',
  },
  textBox: {
    position : 'absolute',
    width:320,
    flex:1,
    top:0,
    bottom:0,
    flexDirection:'row',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: 'rgba(68,160,207,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

module.exports = App
