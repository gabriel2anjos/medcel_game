'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroConstants,
  ViroARTrackingTargets,
  ViroARImageMarker,
  ViroMaterials,
  Viro3DObject,
  ViroImage,
  ViroUtils,
  ViroARPlane,
  ViroAmbientLight,
  ViroBox,
  ViroText,
  ViroARPlaneSelector,
  ViroNode,
  ViroSpotLight,
  ViroFlexView
} from 'react-viro';

export default class ARMedicalView extends Component {

    constructor(props) {
        super(props);
        // Set initial state here
        this.state = {
          text : "Initializing AR...",
          animationName:"mixamo.com",
          modelAnim: false,
          loopState:false,
        };

        this._onHover = this._onHover.bind(this)
    }

    render() {
        return (
          <ViroARScene ref={(component)=>{this.sceneRef = component}} displayPointCloud={true} >
          <ViroAmbientLight color="#ffffff" intensity={200}/>
            {/* <ViroARPlaneSelector> */}
            <ViroARImageMarker target={"logo"} onAnchorFound={this._onAnchorFound} pauseUpdates={this.state.pauseUpdates}>

            <ViroImage
                height={.80}
                width={.80}
                source={require("./res/floor.jpg")}
                position={[0,0.0,0]}
                rotation={[270,0,0]}
              />
              {/* <ViroFlexView style={styles.titleContainer} position={[0.2, 0.4, -0.1]} rotation={[0, 0, 0]} height={.13} width={.32}> */}
                {/* <ViroText style={styles.prodTitleText} position={[0.2, 0.7, -0.1]} rotation={[0, 0, 0]} text="AAAAA" width={.32} height={.0325} /> */}
                <ViroText style={styles.prodDescriptionText} position={[0, 0.42, 0]} width={0.1} height={0.1} scale={[.05, .05, .05]} fontWeight='100' text="Estou com dor na perna" />
              {/* </ViroFlexView> */}
              <Viro3DObject
              source={require('./res/eric/Idle.vrx')}
              resources={[
                require('./res/eric/paciente_color.jpg'),
              ]}
              scale={[0.0022,0.0022,0.0022]}
              type='VRX'
              ref={ "person"}
              ignoreEventHandling={true}
              animation={{name:this.state.animationName, run:true, loop:true, onFinish:this._onFinish,}}
              materials={"pbr"}
              />
              <ViroAmbientLight color="#ffffff" />
              {this._headHitbox()}
            {/* </ViroARPlaneSelector> */}
              </ViroARImageMarker>
          </ViroARScene>
        );
    }

    _headHitbox(){
      return(
      <ViroBox
                scale={[0.025,0.025,0.025]}
                position={[-0.01,0.16,0]}
                onHover={(a)=> this._onHover(a, "Cabeça")}
                opacity={1}
                ></ViroBox>
        )
    }

    _onHover(isHovering, elemento){
        if (isHovering){
            this.props.arSceneNavigator.viroAppProps.changeHoverText(elemento);
        }
        else{
            this.props.arSceneNavigator.viroAppProps.changeHoverText("");
        }
    }

}

ViroMaterials.createMaterials({
  pbr: {
    lightingModel: "PBR",
  },
});

ViroARTrackingTargets.createTargets({
    logo : {
      source : require('./res/qrcode.png'),
      orientation : "Up",
      physicalWidth : 0.165 // real world width in meters
    }
  });

var styles = StyleSheet.create({
  prodDescriptionText: {
    fontFamily: 'sans-serif-light',
    fontSize: 20,
    color: 'red',
    textAlignVertical: 'center',
    textAlign: 'left',
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'column',
    backgroundColor: "#ffffffdd",
    padding: .2,
  },
  prodTitleText: {
    fontFamily: 'sans-serif-light',
    fontSize: 30,
    color: '#222222',
    textAlignVertical: 'center',
    textAlign: 'left',
  },
});
  

module.exports = ARMedicalView;

    