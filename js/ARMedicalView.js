'use strict';

import React, { Component } from 'react';
import {StyleSheet} from 'react-native';

import HitboxObject from './Component/HitboxObject';

import {arvore} from './HitIds'

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
  ViroBox,
  ViroQuad,
  ViroSound
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
          patientPosition:0, //0= sentado, 1= em pe, 2= deitado
          alterPosition:0,
          exameImagemSource:"",
          exameRaioXSource:"",
          exameSangueSource:"",
          exameUrinaSource:"",
          cardActive:-1,
          pauseUpdates:false,
          playSound:true,
        };

        this._onHover = this._onHover.bind(this);
        this._startRay = this._startRay.bind(this);
        this._onAnchorFound = this._onAnchorFound.bind(this);
        this._alterPosition = this._alterPosition.bind(this);
        this._detectButton = this._detectButton.bind(this);
    }
    componentDidMount(){
      this._detectButton();
    }
    render() {
        return (
          //Tudo no viroReact tem que rolar dentro disso. O ref é util, vai ser usado mais tarde. physics world serve pra definir
          //algumas constantes. Gravidade não é usada no app, mas esse drawBound é util pra determinar o que vai rolar
          //quando um raio for emitido do centro da tela, pra saber o que a biblioteca está considerando, de fato, objeto
          //físico que pode compreender colisões
          <ViroARScene ref={(component)=>{this.cameraRef = component}} physicsWorld={{gravity: [0, -9.81, 0], drawBounds: false}} >
          {/*ViroNode é a view do viro react. Pode ser usada só como wrap. Não recomendo mudar atributos caso tenha mta coisa dentro,
          principalmente size. Provavelmente vai dar ruim*/}
          <ViroNode scale={[1,1,1]} >
          {/*Luz ambiente, a que mais ilumina e ilumina tudo igual. Tamb[em é a mais artificial, mas que menos demanda
          processamento do celular*/}
          <ViroAmbientLight
          color="#ffffff"
          intensity={1000}
          /> 
            {/*Função mto importante. Define qual alvo ele vai usar pra ancorar tudo que estiver wraped dentro dele. Os elementos
            dentro só vao ser exibidos quando o qrcode for detectado. Além disso, toda vez q ele achar o AR, vai rodar a função _onAnchorFound.
            Por fim, esse pause updates é importante. Ele é colocado como true quando o QR code foi encontrado e estabilizado. Se não for feito
            isso, os componentes vao ficar sambando nessa tela*/}
            <ViroARImageMarker target={"logo"} onAnchorFound={this._onAnchorFound} pauseUpdates={this.state.pauseUpdates}>
            {/*Como pause updates só rola dpois de 3 segundos que ele achou o qr code (pra estabilizar), eu espero esse tempo pra exibir tudo*/}
            {this.state.pauseUpdates?<ViroNode>
              {this._renderWalls()}
              {this._renderObjects()}
              {/*Condicoes de posição do paciente na varivael, pra definir o q vai ser exibido*/}
              {this.state.patientPosition==1?this._renderIdle():null}
              {this.state.patientPosition==2?this._renderResting():null}
              {this.state.patientPosition==0?this._renderSitting():null}
              {/*Sons que seriam tocados por causa de algum exame. Aqui, o da ausculta. Quando ela é rodada, mute vira true, e dpois de um tempinho vira false*/}
              <ViroSound paused={false}
              muted={!this.state.playSound}
              source={require('./res/heartbeat.mp3')}
              loop={true}
              volume={1.0}
              onFinish={()=>{this.setState({playSound:false})}}/>
            </ViroNode>:null}
            </ViroARImageMarker>
            {/*Detecta o logo do exame de imagem (que, apresar do nome, é um modelo 3D do orgão/osso/algo selecionado), e nesse caso, exibe o coração. O cardActive serve pra que não apareçam na tela varios exames ao mesmo tempo,
              apenas o do card que está sendo apontado.*/}
            <ViroARImageMarker target={"logo_imagem"} onAnchorFound={()=>{this.setState({exameImagemSource:this.props.arSceneNavigator.viroAppProps.cardPlayed(3),cardActive:3})}}>
            <ViroNode>
              {this.state.cardActive==3?
              <Viro3DObject
              {/*Source é o arquivo do modelo 3D*/}
              source={require("./res/heart/heart.obj")}
              {/*Scale é um modificador de tamanho. A maioria dos modelos 3D sao gigantes e tem q ser adaptados*/}
              scale={[0.6,0.6,0.6]}
              {/*Posicao dele nos eixos XYZ*/}
              position={[0,0.4,0]}
              {/*Tipo, pode ser OBJ ou VRX*/}
              type='OBJ'
              {/*Para que ele nn intercepte colisões. Só as hitboxes devem ter isso como falso*/}
              ignoreEventHandling={true}
              {/*Material desse modelo*/}
              materials={"heart"}
            />
            :null}
            </ViroNode>
            {/*Exame de raio X, nesse caso e nos proximos exibe uma imagem, seguindo as mesmas condicoes do acima*/}
            </ViroARImageMarker>
            <ViroARImageMarker target={"logo_raiox"} onAnchorFound={()=>{this.setState({exameRaioXSource:this.props.arSceneNavigator.viroAppProps.cardPlayed(2),cardActive:2})}}>
            <ViroNode>
              {this.state.cardActive==2?
              <ViroImage
              height={.20}
              width={.20}
              source={require("./res/raioxtorax.jpg")}
              position={[0,0.6,0]}
              rotation={[0,0,0]}
              materials={["blinn"]}
            />
            :null}
            </ViroNode>
            </ViroARImageMarker>
            <ViroARImageMarker target={"logo_sangue"} onAnchorFound={()=>{this.setState({exameRaioXSource:this.props.arSceneNavigator.viroAppProps.cardPlayed(4),cardActive:4})}}>
            <ViroNode>
              {this.state.cardActive==4?
                <ViroImage
                {/*Para imagens, ao inves de size usa height e width*/}
                height={.20}
                width={.20}
                source={require("./res/6zwt44.png")}
                position={[0,0.6,0]}
                rotation={[0,0,0]}
                materials={["blinn"]}
              />
            :null}
            </ViroNode>
            </ViroARImageMarker>
            <ViroARImageMarker target={"logo_urina"} onAnchorFound={()=>{this.setState({exameRaioXSource:this.props.arSceneNavigator.viroAppProps.cardPlayed(5),cardActive:5})}}>
            <ViroNode>
              {this.state.cardActive==5?
                <ViroImage
                height={.20}
                width={.20}
                source={require("./res/exameurina.png")}
                position={[0,0.4,0]}
                rotation={[0,0,0]}
                materials={["blinn"]}
              />
            :null}
            </ViroNode>
            </ViroARImageMarker>
            </ViroNode>
        </ViroARScene>
        );
    }
    _renderResting(){
      const pos = [0,0,0];
      return(
        {/*Isso aqui exibe nosso paciente deitado*/}
        <ViroNode>
            <Viro3DObject
              source={require('./res/paciente/sleeping.vrx')}
              resources={[
                require('./res/paciente/pacienteIdosaSR_color.jpg'),
                require('./res/paciente/pacienteIdosaSR_high_nm.jpg'),
                require('./res/paciente/pacienteIdosaSR_spec.jpg'),
              ]}
              scale={[0.0022,0.0022,0.0022]}
              position={[0.23,-0.03,-0.09]}
              type='VRX'
              ref={ "person"}
              ignoreEventHandling={true}
              animation={{name:this.state.animationName, run:true, loop:true, onFinish:this._onFinish,}}
              materials={["blinn"]}
            />
        </ViroNode>
      )
    }

    _renderSitting(){
      const pos = [-0.18,0,-0.18];
      return(
        <ViroNode>
            <Viro3DObject
              source={require('./res/paciente/sitting.vrx')}
              resources={[
                require('./res/paciente/pacienteIdosa_color.jpg'),
                require('./res/paciente/pacienteIdosa_high_nm.jpg'),
                require('./res/paciente/pacienteIdosa_spec.jpg'),
              ]}
              scale={[0.0022,0.0022,0.0022]}
              position={[pos[0] + -0.0,pos[1] + 0,pos[2] + 0]}
              type='VRX'
              ref={ "person"}
              ignoreEventHandling={true}
              {/*Animações (personagem andar, respirar, etc). Nosso modelo só tem uma, como o nome "mixamo.com",
              que foi o serviço que usei pra gerar. Recomendo fortemente ler a documentação*/}
              animation={{name:this.state.animationName, run:true, loop:true, onFinish:this._onFinish,}}
              materials={["blinn"]}
            />
            
        </ViroNode>
      )
    }
    _renderIdle(){
      return(
        <ViroNode>
            <Viro3DObject
          source={require('./res/paciente/idle.vrx')}
          resources={[
            require('./res/paciente/pacienteIdosa_color.jpg'),
            require('./res/paciente/pacienteIdosa_high_nm.jpg'),
            require('./res/paciente/pacienteIdosa_spec.jpg'),
          ]}
          scale={[0.0022,0.0022,0.0022]}
          type='VRX'
          ref={ "person"}
          ignoreEventHandling={true}
          animation={{name:this.state.animationName, run:true, loop:true, onFinish:this._onFinish,}}
          materials={["blinn"]}
          />
          {this._renderHitBoxesIdle()}
        </ViroNode>

      )
    }

    _renderHitBoxesIdle(){
      return(
        <ViroNode>
          {/*As tais das hitboxes. Quando o centro da tela aponta pra elas, elas rodam a colisão, e passam o id que elas estao associadas
           (veja o arquivo tree. id 0 é de cabeça, 1 de torax, etc. Eu fiz um componente só pra hitbox, vale dar uma olhada. não é 
           muito complexo, mas ai nn tinha que colocar opacity=0 pra todos*/}
          <HitboxObject
            scale={[0.05,0.05,0.05]}
            position={[-0.01,0.36,0]}
            name={arvore[0]['name']}
            onCollision={(a)=> this._onHover(a, 0)}
          />
          <HitboxObject
            scale={[0.07,0.05,0.01]}
            position={[0.0,0.3,0.01]}
            name={arvore[1]['name']}
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
            name={arvore[3]['name']}
            onCollision={(a)=> this._onHover(a, 3)}
          />
          <HitboxObject
            scale={[0.07,0.05,0.01]}
            position={[0.0,0.23,0.01]}
            name={arvore[2]['name']}
            onCollision={(a)=> this._onHover(a, 2)}
          />
          <HitboxObject
            scale={[0.07,0.05,0.01]}
            position={[0.0,0.23,-0.01]}
            name={arvore[3]['name']}
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
            name={arvore[4]['name']}
            onCollision={(a)=> this._onHover(a, 4)}
          />
          <HitboxObject
            scale={[0.023,0.1,0.023]}
            position={[0.045,0.10,0.0]}
            name={arvore[4]['name']}
            onCollision={(a)=> this._onHover(a, 4)}
          />
        </ViroNode>
        )
    }
    //MUITO importante, e geralmente vai ser implementada sem mudar muito. É um codigo que solta um "raio" do centro da tela, no eixo normal (ou seja, indica pra onde
    //voce esta apontando). Detecta colisão com o primeiro objeto, e chama o onCollision dele. Precisa que a cena principal tenha uma ref
    _startRay(){
      setInterval(() => {
      if (this.cameraRef) {
        this.cameraRef.getCameraOrientationAsync().then(orientation=>{
            const from = orientation.position;
            const to = [orientation.forward[0]*100,orientation.forward[1]*100,orientation.forward[2]*100];
            {/*A partir daqui, eu mesmo fiz. É pra que caso ,não ocorra colisão, examinedId vire -1 e eu
             possa detectar que nada está no centro, então o texto que aparece no meio da tela deve ser apagado*/}
            this.cameraRef.findCollisionsWithRayAsync(from, to, true).then((collision)=>{
             if (!collision){
                this._onHover(false)
                this._alterPosition(false)
                this.setState({
                  examinedId:-1
                });

              }
            });
        }

        )
        //essa função tem que ser rodada a cada X tempo. 650ms é um bom intervalo.
      }}, 650)
    }
    // A partir daqui são nojeiras consequentes do não uso de Redux. Serve para ver quando
    // apertei algum botão
    _detectButton(){
      setInterval(() => {
      let state = this.props.arSceneNavigator.viroAppProps.getButtonState();
      if (state['clicked']==0) return;
      if (this.state.alterPosition == 1){
        this.setState({
          patientPosition:0,
        })
      }
      else if (this.state.alterPosition == 2){
        this.setState({
          patientPosition:1,
        })
      }
      else if (this.state.alterPosition == 3){
        this.setState({
          patientPosition:2,
        })
      }
      let state2 = this.props.arSceneNavigator.viroAppProps.stateSound();
      console.log(state2)
      if(state2==true){
        this.props.arSceneNavigator.viroAppProps.turnOffSound();
        this.setState({
          playSound:true
        })
      }
    }, 700)
    }


    //Funcao simples que roda quando o raio acima detecta alguma colisao
    _onHover(isHovering, elemento){
        if (isHovering){
          this.props.arSceneNavigator.viroAppProps.changeParentID(elemento);
        }
        else{
            this.props.arSceneNavigator.viroAppProps.changeParentID(-1);
        }
    }
    
    //Muda a posicao do personagem, caso vc tenha clicado no botao enquanto apontava  pra
    //algum objeto, ou caso vc só esteja apontando, exibe um texto no centro da tela pra
    //te guiar
    _alterPosition(isHovering, position){
      if (isHovering && position==0){
        this.props.arSceneNavigator.viroAppProps.changeHoverText("Pedir para sentar");
        this.props.arSceneNavigator.viroAppProps.hoverObject(1);
        this.setState({
          alterPosition:1,
        });
      }
      else if (isHovering && position==1){
        
        this.props.arSceneNavigator.viroAppProps.changeHoverText("Pedir para ficar em pé");
        this.props.arSceneNavigator.viroAppProps.hoverObject(2);
        this.setState({
          alterPosition:2,
        });
      }
      else if (isHovering && position==2){
        this.props.arSceneNavigator.viroAppProps.changeHoverText("Pedir para deitar");
        this.props.arSceneNavigator.viroAppProps.hoverObject(3);
        this.setState({
          alterPosition:3,
        });
      }
      else{
        if (this.state.alterPosition!=0) {this.setState({
          alterPosition:0,
        });
        this.props.arSceneNavigator.viroAppProps.hoverObject(0);
      }
      }
    }

    //Funcao que aguarda um pouco pra estabilizar a camera
    _onAnchorFound(){
      setTimeout(()=>{this.setState({pauseUpdates:true})},3000);
      this._startRay();
    }

    //Antes ia ter paredes, além do chao. Nao ficava bom
    _renderWalls(){
      return(
        <ViroNode>
        <ViroQuad
                height={.80}
                width={.80}
                materials={["floor"]}
                position={[0,0.0,0]}
                rotation={[270,0,0]}
                arShadowReceiver={true}
              />
              {/* <ViroImage
                height={.40}
                width={.80}
                source={require("./res/wall.png")}
                position={[0,0.2,-0.4]}
                rotation={[0,0,0]}
                materials={["blinn"]}
              />
              <ViroImage
                height={.40}
                width={.80}
                source={require("./res/wall.png")}
                position={[0.4,0.2,0]}
                rotation={[0,270,0]}
                materials={["blinn"]}
              />
              <ViroImage
                height={.40}
                width={.80}
                source={require("./res/wall.png")}
                position={[-0.4,0.2,0]}
                rotation={[0,90,0]}
                materials={["blinn"]}
              />
              <ViroImage
                height={.40}
                width={.80}
                source={require("./res/wall.png")}
                position={[0,0.2,0.4]}
                rotation={[0,180,0]}
                materials={["blinn"]}
              />
              <ViroImage
                height={0.2}
                width={0.12}
                source={require("./res/window.png")}
                position={[-0.2,0.24,-0.3999]}
                rotation={[0,0,0]}
                materials={["blinn"]}
              />
              
              <ViroImage
                height={0.17}
                width={0.17}
                source={require("./res/medcellogo.png")}
                position={[0.3999,0.2,0]}
                rotation={[0,-90,0]}
                materials={["blinn"]} */}
              {/* /> */}
              </ViroNode>
      )
    }
    
    //Renderiza os objetos de cenario e cria suas hitboxes.
  _renderObjects(){
    const posCadeira = [-0.18,0,-0.18];
    const posCama = [0.23,0,0.04];
    const posPaciente = [0,0,0.18];
    return(
      <ViroNode>
        <Viro3DObject
              source={require('./res/chair/cattelan_italia_cindy_obj.obj')}
              resources={[
                require('./res/chair/cattelan_italia_cindy_mtl.mtl'),
              ]}
              scale={[0.0022,0.0022,0.0022]}
              rotation={[0,0,0]}
              position={[posCadeira[0],posCadeira[1],posCadeira[2]]}
              type='OBJ'

            />
            <Viro3DObject
              source={require('./res/folding_bed/Folding_Bed.obj')}
              resources={[
                require('./res/folding_bed/Folding_Bed_mtl.mtl'),
              ]}
              scale={[0.0033,0.0033,0.0033]}
              position={[posCama[0],posCama[1],posCama[2]]}
              type='OBJ'
              ignoreEventHandling={true}
              
              />
            
            {this.state.patientPosition != 2?<ViroBox
            physicsBody={{
              type:'Kinematic',
              shape: { type: "Box", params:[0.1,0.1,0.1]},
            }} 
            scale={[0.1,0.05,0.1]}
            position={[posCama[0],posCama[1],posCama[2]-0.1]}
            onCollision={(a)=> this._alterPosition(a, 2)}
            opacity={0.0}
            />: null}
            {this.state.patientPosition != 0?
            <ViroBox
            physicsBody={{
              type:'Kinematic',
              shape: { type: "Box", params:[0.1,0.1,0.1]},
            }} 
            scale={[0.1,0.05,0.1]}
            position={[posCadeira[0],posCadeira[1],posCadeira[2]]}
            onCollision={(a)=> this._alterPosition(a, 0)}
            opacity={0.0}
            />: null}
            {this.state.patientPosition != 1?
            <ViroBox
            physicsBody={{
              type:'Kinematic',
              shape: { type: "Box", params:[0.1,0.1,0.1]},
            }} 
            scale={[0.1,0.05,0.1]}
            position={[posPaciente[0],posPaciente[1],posPaciente[2]]}
            onCollision={(a)=> this._alterPosition(a, 1)}
            opacity={0.0}
            />:null}
      </ViroNode>
    )
  }
}

//Materiais do Viro. lightiningModel é como reage à luz 
//(nao conta no caso atual, pq usamos ambientLight). As texturas
//são selecionadas aqui apenas em alguns casos, geralmente com
//.obj .Nos outros, colocar em resources no componente 3D
//ja resolve o problema
ViroMaterials.createMaterials({
  pbr: {
    lightingModel: "PBR",
  },
  blinn: {
    lightingModel: "Blinn",
  },
  floor: {
    lightingModel: "Blinn",
    diffuseTexture: require('./res/floor.jpg'),
  },
  bed: {
    lightingModel: "Blinn",
    // diffuseTexture: require('./res/folding_bed/Chrmwarp.jpg'),
  },
  heart: {
    lightingModel: "Blinn",
    diffuseTexture: require('./res/heart/Heart_D3.jpg'),
    specularTexture: require('./res/heart/Heart_S2.jpg'),
    writesToDepthBuffer: true,
    readsFromDepthBuffer: true,
  },
});

//Os QR codes e seus tamanhos (em metros) na vida real.
//Mudar esse tamanho nao fez mta diferença, para ser honesto
ViroARTrackingTargets.createTargets({
    logo : {
      source : require('./res/qrcodes/cardbase.png'),
      orientation : "Up",
      physicalWidth : 0.200 // real world width in meters
    },
    logo_sangue : {
      source : require('./res/qrcodes/cardsangue.png'),
      orientation : "Up",
      physicalWidth : 0.200 // real world width in meters
    },
    logo_imagem : {
      source : require('./res/qrcodes/cardimagem.png'),
      orientation : "Up",
      physicalWidth : 0.200 // real world width in meters
    },
    logo_urina : {
      source : require('./res/qrcodes/cardurina.png'),
      orientation : "Up",
      physicalWidth : 0.200 // real world width in meters
    },
    logo_raiox : {
      source : require('./res/qrcodes/cardraiox.png'),
      orientation : "Up",
      physicalWidth : 0.200 // real world width in meters
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

    