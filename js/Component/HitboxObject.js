import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    ViroBox,
    ViroFlexView
  } from 'react-viro';
/**
 * A 2D UI "on glass" button, standard React Native component. Class encapsulating states, animations, and other details for a Buttons in the app. 
 * Used for selecting Portals, Effects, Objects on the left of the screen above listview
 */
export default class HitboxObject extends Component {
    constructor(props) {
        super(props);
      }

      render(){
          return(
            <ViroBox
            physicsBody={{
              type:'Kinematic',
              shape: { type: "Box", params: this.props.scale },
            }} 
            scale={this.props.scale}
            position={this.props.position}
            onCollision={(a)=> this.props.onCollision(a, this.props.name)}
            opacity={0}
            />
          )
      }
    }