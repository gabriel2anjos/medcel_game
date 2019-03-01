'use strict';

import React, { Component } from 'react';
import {StyleSheet} from 'react-native';

import HitboxObject from './Component/HitboxObject';

import {
  ViroARScene,
  ViroConstants,
  ViroARTrackingTargets,
  ViroARImageMarker,
  ViroMaterials,
  Viro3DObject,
  ViroImage,
  ViroAmbientLight,
  ViroText,
  ViroNode,
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

        this._onHover = this._onHover.bind(this);
        this._startRay = this._startRay.bind(this);
        this._onAnchorFound = this._onAnchorFound.bind(this);
    }

    render() {
        return (
          <ViroARScene ref={(component)=>{this.cameraRef = component}} displayPointCloud={true} physicsWorld={{gravity: [0, -9.81, 0], drawBounds: false}} onClick={this._onCollision}>
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
              <ViroImage
                height={.80}
                width={.80}
                source={require("./res/chatbaloon.png")}
                position={[0.1,0.41,0]}
                scale={[0.3,0.2,0.3]}
                rotation={[0,0,0]}
              />
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
        <ViroNode>
          <HitboxObject
            scale={[0.05,0.05,0.05]}
            position={[-0.01,0.36,0]}
            name={"Cabeça"}
            onCollision={(a, name)=> this._onHover(a, name)}
          />
          <HitboxObject
            scale={[0.07,0.05,0.01]}
            position={[0.0,0.3,0.01]}
            name={"Torax"}
            onCollision={(a, name)=> this._onHover(a, name)}
          />
          <HitboxObject
            scale={[0.07,0.05,0.01]}
            position={[0.0,0.3,-0.01]}
            name={"Costas superior"}
            onCollision={(a, name)=> this._onHover(a, name)}
          />
          <HitboxObject
            scale={[0.07,0.05,0.01]}
            position={[0.0,0.23,0.01]}
            name={"Abdome"}
            onCollision={(a, name)=> this._onHover(a, name)}
          />
          <HitboxObject
            scale={[0.07,0.05,0.01]}
            position={[0.0,0.23,-0.01]}
            name={"Costas inferior"}
            onCollision={(a, name)=> this._onHover(a, name)}
          />

        </ViroNode>
        )
    }

    _startRay(){
      setInterval(() => {
      if (this.cameraRef) {
        this.cameraRef.getCameraOrientationAsync().then(orientation=>{
            const from = orientation.position;
            const to = [orientation.forward[0]*100,orientation.forward[1]*100,orientation.forward[2]*100];
            this.cameraRef.findCollisionsWithRayAsync(from, to, true, 'shoot')
        }

        )
      }}, 250)
    }

    _onHover(isHovering, elemento){
        if (isHovering){
            this.props.arSceneNavigator.viroAppProps.changeHoverText(elemento);
        }
        else{
            this.props.arSceneNavigator.viroAppProps.changeHoverText("");
        }
    }

    _onAnchorFound(){
      this._startRay()
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

    