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
  ViroSpotLight
} from 'react-viro';

export default class ARMedicalView extends Component {

    constructor(props) {
        super(props);
        // Set initial state here
        this.state = {
        text : "Initializing AR...",
        };

        this._onHover = this._onHover.bind(this)
    }

    render() {
        return (
          <ViroARScene ref={(component)=>{this.sceneRef = component}} displayPointCloud={true}>
          <ViroAmbientLight color="#ffffff" intensity={200}/>
            <ViroARPlaneSelector>
            <ViroImage
                height={.1}
                width={.1}
                source={require("./res/floor.jpg")}
                position={[0,0.0,0]}
                rotation={[270,0,0]}
              />
              <Viro3DObject
              source={require('./res/eric/MyCharacter.vrx')}
              resources={[
                require('./res/eric/MyCharacter_color.jpg'),
              ]}
              scale={[0.0025,0.0025,0.0025]}
              type='VRX'
              ref={ "person"}
              ignoreEventHandling={true}
              materials={"pbr"}
              />
              <ViroAmbientLight color="#ffffff" />
              {this._headHitbox()}
            </ViroARPlaneSelector>

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
  

module.exports = ARMedicalView;

    