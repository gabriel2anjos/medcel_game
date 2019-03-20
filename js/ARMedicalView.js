'use strict';

import React, { Component } from 'react';
import {StyleSheet} from 'react-native';

import HitboxObject from './Component/HitboxObject';

import {hitboxIds} from './HitIds'

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
  ViroARPlaneSelector,
  ViroFlexView,
  ViroOmniLight,
  ViroBox
} from 'react-viro';

export default class ARMedicalView extends Component {

    constructor(props) {
        super(props);
        // Set initial state here
        this.state = {
          examinedId:-1,
          text : "Initializing AR...",
          animationName:"mixamo.com",
          modelAnim: false,
          loopState:false,
          patientPosition:0 //0= sentado, 1= em pe, 2= deitado
        };

        this._onHover = this._onHover.bind(this);
        this._startRay = this._startRay.bind(this);
        this._onAnchorFound = this._onAnchorFound.bind(this);
        this._alterPosition = this._alterPosition.bind(this);
    }

    render() {
        return (
          <ViroARScene ref={(component)=>{this.cameraRef = component}} physicsWorld={{gravity: [0, -9.81, 0], drawBounds: true}} onClick={this._onCollision}>
          <ViroNode scale={[1,1,1]} >
          <ViroAmbientLight
              color="#ffffff"
              intensity={250}
          />
            
            {/* <ViroARPlaneSelector  onPlaneSelected={this._onAnchorFound} minHeight={.3} minWidth={.3}>  */}
            <ViroARImageMarker target={"logo"} onAnchorFound={this._onAnchorFound} pauseUpdates={this.state.pauseUpdates}>
            <ViroNode>
              {this._renderWalls()}
              {this._renderObjects()}
              {/* {this._renderIdle()} */}
              {/* {this._renderResting()} */}
              {this._renderSitting()}
            </ViroNode>
              </ViroARImageMarker>
              {/* </ViroARPlaneSelector> */}
              <ViroARImageMarker target={"logo_v"}>
            <ViroNode>
            </ViroNode>
              </ViroARImageMarker>
              </ViroNode>
          </ViroARScene>
        );
    }
    _renderResting(){
      const pos = [0,0,0];
      return(
        <ViroNode>
            
        </ViroNode>
      )
    }
    testes =()=>{
      
    }
    _renderSitting(){
      const pos = [-0.18,0,-0.18];
      return(
        <ViroNode>
            <Viro3DObject
              source={require('./res/man/Sitting.vrx')}
              resources={[
                require('./res/man/paciente2_color.jpg'),
                require('./res/man/paciente2_high_nm.jpg'),
                require('./res/man/paciente2_spec.jpg'),
              ]}
              scale={[0.0022,0.0022,0.0022]}
              position={[pos[0] + -0.0,pos[1] + 0,pos[2] + 0]}
              type='VRX'
              ref={ "person"}
              ignoreEventHandling={true}
              animation={{name:this.state.animationName, run:true, loop:true, onFinish:this._onFinish,}}
              materials={"pbr"}
            />
            
                        {/* <ViroBox
            physicsBody={{
              type:'Kinematic',
              shape: { type: "Box"},
            }} 
            scale={[1,1,1]}
            position={[0,0,0]}
            onCollision={(a)=> this.props.alterPosition(a, 2)}
            opacity={0.0}
            /> */}
        </ViroNode>
      )
    }
    _renderIdle(){
      return(
        <ViroNode>
            <Viro3DObject
          source={require('./res/man/BreathingIdle.vrx')}
          resources={[
            require('./res/man/paciente2_color.jpg'),
            require('./res/man/paciente2_high_nm.jpg'),
            require('./res/man/paciente2_spec.jpg'),
          ]}
          scale={[0.0022,0.0022,0.0022]}
          type='VRX'
          ref={ "person"}
          ignoreEventHandling={true}
          animation={{name:this.state.animationName, run:true, loop:true, onFinish:this._onFinish,}}
          materials={"pbr"}
          />
          {this._renderHitBoxesIdle()}
        </ViroNode>

      )
    }

    _renderHitBoxesIdle(){
      return(
        <ViroNode>
          <HitboxObject
            scale={[0.05,0.05,0.05]}
            position={[-0.01,0.36,0]}
            name={hitboxIds[0]['name']}
            onCollision={(a)=> this._onHover(a, 0)}
          />
          <HitboxObject
            scale={[0.07,0.05,0.01]}
            position={[0.0,0.3,0.01]}
            name={hitboxIds[1]['name']}
            onCollision={(a)=> this._onHover(a, 1)}
          />
          <HitboxObject
            scale={[0.07,0.05,0.01]}
            position={[0.0,0.3,0.00]}
            name={""}
            onCollision={()=>{}}
          />
          <HitboxObject
            scale={[0.07,0.05,0.01]}
            position={[0.0,0.3,-0.01]}
            name={hitboxIds[3]['name']}
            onCollision={(a)=> this._onHover(a, 3)}
          />
          <HitboxObject
            scale={[0.07,0.05,0.01]}
            position={[0.0,0.23,0.01]}
            name={hitboxIds[2]['name']}
            onCollision={(a)=> this._onHover(a, 2)}
          />
          <HitboxObject
            scale={[0.07,0.05,0.01]}
            position={[0.0,0.23,-0.01]}
            name={hitboxIds[3]['name']}
            onCollision={(a)=> this._onHover(a, 3)}
          />
          <HitboxObject
            scale={[0.07,0.05,0.01]}
            position={[0.0,0.23,0.00]}
            name={""}
            onCollision={()=>{}}
          />
          <HitboxObject
            scale={[0.023,0.1,0.023]}
            position={[-0.005,0.10,0.0]}
            name={hitboxIds[4]['name']}
            onCollision={(a)=> this._onHover(a, 4)}
          />
          <HitboxObject
            scale={[0.023,0.1,0.023]}
            position={[0.045,0.10,0.0]}
            name={hitboxIds[4]['name']}
            onCollision={(a)=> this._onHover(a, 4)}
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
            this.cameraRef.findCollisionsWithRayAsync(from, to, true).then((collision)=>{
             if (!collision){
                this._onHover(false)
                this.setState({
                  examinedId:-1
                });
              }
            });
        }

        )
      }}, 150)
    }

    _onHover(isHovering, elemento){
        if (isHovering){
          this.props.arSceneNavigator.viroAppProps.changeParentID(elemento);
        }
        else{
            this.props.arSceneNavigator.viroAppProps.changeParentID(-1);
        }
    }

    _alterPosition(isHovering, position){
      console.log(isHovering, position)
      if (isHovering && position==0){
        this.props.arSceneNavigator.viroAppProps.changeHoverText("Pedir para sentar");
      }
      if (isHovering && position==1){
        this.props.arSceneNavigator.viroAppProps.changeHoverText("Pedir para ficar em pé");
      }
      if (isHovering && position==2){
        this.props.arSceneNavigator.viroAppProps.changeHoverText("Pedir para deitar");
      }
    }

    _onAnchorFound(){
      this._startRay()
    }
    _renderWalls(){
      return(
        <ViroNode>
        <ViroImage
                height={.60}
                width={.60}
                source={require("./res/floor.jpg")}
                position={[0,0.0,0]}
                rotation={[270,0,0]}
              />
              <ViroImage
                height={.40}
                width={.60}
                source={require("./res/wall.png")}
                position={[0,0.2,-0.3]}
                rotation={[0,0,0]}
              />
              <ViroImage
                height={.40}
                width={.60}
                source={require("./res/wall.png")}
                position={[0.3,0.2,0]}
                rotation={[0,270,0]}
              />
              <ViroImage
                height={.40}
                width={.60}
                source={require("./res/wall.png")}
                position={[-0.3,0.2,0]}
                rotation={[0,90,0]}
              />
              <ViroImage
                height={.40}
                width={.60}
                source={require("./res/wall.png")}
                position={[0,0.2,0.3]}
                rotation={[0,180,0]}
              />
              </ViroNode>
      )
    }
  _renderObjects(){
    const posCadeira = [-0.18,0,-0.18];
    const posCama = [0.2,0,0.04];
    const posPaciente = [0,0,0.18];
    return(
      <ViroNode>
        <Viro3DObject
              source={require('./res/chair/cattelan_italia_cindy_obj.obj')}
              resources={[
                require('./res/chair/cattelan_italia_cindy_obj.mtl'),
              ]}
              scale={[0.0022,0.0022,0.0022]}
              rotation={[0,0,0]}
              position={[posCadeira[0],posCadeira[1],posCadeira[2]]}
              type='OBJ'
            />
            <Viro3DObject
              source={require('./res/folding_bed/Folding_Bed.obj')}
              resources={[
                require('./res/folding_bed/Folding_Bed.mtl'),
                require('./res/folding_bed/Chrmwarp.jpg')
              ]}
              scale={[0.003,0.003,0.003]}
              position={[posCama[0],posCama[1],posCama[2]]}
              type='OBJ'
              ref={ "person"}
              ignoreEventHandling={true}
              animation={{name:this.state.animationName, run:true, loop:true, onFinish:this._onFinish,}}
              materials={"pbr"}
              />

            
            <ViroBox
            physicsBody={{
              type:'Kinematic',
              shape: { type: "Box", params:[0.1,0.1,0.1]},
            }} 
            scale={[0.1,0.05,0.1]}
            position={[posCama[0],posCama[1],posCama[2]-0.1]}
            onCollision={(a)=> this._alterPosition(a, 2)}
            opacity={0.0}
            />

            <ViroBox
            physicsBody={{
              type:'Kinematic',
              shape: { type: "Box", params:[0.1,0.1,0.1]},
            }} 
            scale={[0.1,0.05,0.1]}
            position={[posCadeira[0],posCadeira[1],posCadeira[2]]}
            onCollision={(a)=> this._alterPosition(a, 0)}
            opacity={0.0}
            />
            <ViroBox
            physicsBody={{
              type:'Kinematic',
              shape: { type: "Box", params:[0.1,0.1,0.1]},
            }} 
            scale={[0.1,0.05,0.1]}
            position={[posPaciente[0],posPaciente[1],posPaciente[2]]}
            onCollision={(a)=> this._alterPosition(a, 1)}
            opacity={0.0}
            />
      </ViroNode>
    )
  }
}

ViroMaterials.createMaterials({
  pbr: {
    lightingModel: "PBR",
  },
  heart: {
    lightingModel: "Blinn",
    diffuseTexture: require('./res/heart/Heart_D3.jpg'),
    specularTexture: require('./res/heart/Heart_S2.jpg'),
    writesToDepthBuffer: true,
    readsFromDepthBuffer: true,
  },
});

ViroARTrackingTargets.createTargets({
    logo : {
      source : require('./res/qrcode.png'),
      orientation : "Up",
      physicalWidth : 0.200 // real world width in meters
    },
    logo_v : {
      source : require('./res/logo_v.png'),
      orientation : "Up",
      physicalWidth : 0.125 // real world width in meters
    },
  });

var styles = StyleSheet.create({
  prodDescriptionText: {
    fontFamily: 'sans-serif-light',
    fontSize: 30,
    color: 'black',
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
    color: '#000000',
    textAlignVertical: 'center',
    textAlign: 'left',
  },
  cardWrapper: {
    flexDirection: 'row',
    backgroundColor: "#ffffff",
    padding: .1,
  },
});
  

module.exports = ARMedicalView;

    