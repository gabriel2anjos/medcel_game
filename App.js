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

var sharedProps = {
  apiKey:"A96217A2-0EA6-4173-803C-ACCF333CB9F6",
}

var InitialARScene = require('./js/ARMedicalView');


export default class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      sharedProps : sharedProps,
      viroAppProps : {changeHoverText: (a)=>this.setState({centerText:a})},
      centerText : ""
    }
    this._initialARView = this._initialARView.bind(this);
    this._overlayView = this._overlayView.bind(this);
    this._changeHoverText = this._changeHoverText.bind(this);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this._initialARView()}
        {this._overlayView()}
        <View style={styles.centerTextView}>
          <Text style={styles.centerText}> {this.state.centerText}</Text>
        </View>
      </View>
    );
  }

  _initialARView(){
    return (
      <ViroARSceneNavigator {...this.state.sharedProps}
            style ={{flex:1}}
            initialScene={{scene: InitialARScene}}
            viroAppProps={this.state.viroAppProps}
      />
    )
  }

  _overlayView(){
    console.log("aaa")
    return(
        <View style={styles.crosshair}/>
    )
  }

  _changeHoverText(text){
    console.log(this)
    this.setState({
      centerText : text,
    })
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
});

module.exports = App
