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
        console.log(this.props)
        return (
          <ViroARScene ref={(component)=>{this.sceneRef = component}} displayPointCloud={true}>
            <ViroAmbientLight color="#ffffff" />
            <ViroARPlane>
            <ViroImage
                height={.05}
                width={.05}
                source={require("./res/cross.png")}
                position={[0,0.1,0]}
                rotation={[270,0,0]}
              />
            </ViroARPlane>
            <ViroARImageMarker target={"logo"}>
            <Viro3DObject
              source={require('./res/man/00079_Nash002_Basics_Free.obj')}
              resources={[
                require('./res/man/00079_Nash002_Basics_Free.mtl'),
                require('./res/man/00079_Nash002_Diffuse.jpg'),
              ]}
              scale={[0.0025,0.0025,0.0025]}
              type='OBJ'
              ref={ "person"}
              onHover={(a)=> this._onHover(a, "person")}
              />
            </ViroARImageMarker>

          </ViroARScene>
        );
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

    