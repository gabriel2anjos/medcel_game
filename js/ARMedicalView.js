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
            <ViroAmbientLight color="#ffffff" />
            <ViroARPlaneSelector>
            <ViroImage
                height={.1}
                width={.1}
                source={require("./res/floor.jpg")}
                position={[0,0.0,0]}
                rotation={[270,0,0]}
              />
            <Viro3DObject
              source={require('./res/man/00079_Nash002_Basics_Free.obj')}
              resources={[
                require('./res/man/00079_Nash002_Basics_Free.mtl'),
                require('./res/man/00079_Nash002_Diffuse.jpg'),
              ]}
              scale={[0.0025,0.0025,0.0025]}
              type='OBJ'
              ref={ "person"}
              ignoreEventHandling={true}
              />
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

ViroARTrackingTargets.createTargets({
    logo : {
      source : require('./res/qrcode.png'),
      orientation : "Up",
      physicalWidth : 0.165 // real world width in meters
    }
  });
  

module.exports = ARMedicalView;

    