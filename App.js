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
import {arvore} from './js/HitIds'
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
      exam:"",
      sharedProps : sharedProps,
      viroAppProps : {
        changeHoverText: (a)=>this.setState({centerText:a}),
        changeParentID : this._changeSelectedID,
        clickClear: this._clickClearVar,
        getButtonState: this._getButtonState,
        hoverObject: (a)=>this.setState({hoveringObject:a,}),
        cardImagem: "",
        cardPlayed : ()=>this._cardPlayed(),
      },
      selectedId:-1,
      indexDialog:0,
      lastDialogId:0,
      startedGame:1,
      buttonWasClicked:0,
      idButtonClicked:-1,
      patientPosition:1,
      arrowsVisible:false,
      hoveringObject:0,
      indexExam:0,
      lastExamId:0,
      storedIdImagemExame:-1,
      storeIndexImagemExame:-1,
    };
    this._initialARView = this._initialARView.bind(this);
    this._overlayView = this._overlayView.bind(this);
    this._changeHoverText = this._changeHoverText.bind(this);
    this._changeSelectedID = this._changeSelectedID.bind(this)
    this._changeDialogText = this._changeDialogText.bind(this);
    this._clickExamArrow = this._clickExamArrow.bind(this);
    this._changeExamText = this._changeExamText.bind(this);
    this._passClick = this._passClick.bind(this);
    this._getButtonState = this._getButtonState.bind(this);
    this._ARScene = React.createRef();
    this._clickExam = this._clickExam.bind(this);
    this._cardPlayed = this._cardPlayed.bind(this);
  }

  render() {
    if(!this.state.startedGame)  return (
      <View style={{ flex: 1 }}>
        <View style={{flex: 1, width:(Dimensions.get('window').width), height: Dimensions.get('window').height, alignItems:'center'}}>
         <Image style={styles.image} source={require('./js/res/relatorio.png')}></Image>
        </View>
        <View style={{position:'absolute', flexDirection:'column', justifyContent: 'space-around',right:10, bottom:30, width:70, height:160, flex:1}}>
        <ButtonComponent key="button1"
            buttonState={'off'}
            stateImageArray={[require("./js/res/arrow.png"), require("./js/res/arrow.png")]}
            style={styles.screenIcon} selected={true}
            onPress={()=>{
              setTimeout(()=>{this.setState({startedGame:1})},1000);
              
            }}
            animationOnClick={true}
        />
        </View>
      </View>
    );
    return(
      <View style={{ flex: 1 }}>
        {this._initialARView()}
      </View>
    )
  }

  _initialARView(){
    return (
      <View style={{ flex: 1 }}>
        <ViroARSceneNavigator {...this.state.sharedProps}
          ref={this._ARScene}
            style ={{flex:1}}
            initialScene={{scene: InitialARScene}}
            viroAppProps={this.state.viroAppProps}
      />
        {this._overlayView()}
        <View style={styles.centerTextView}>
          <Text style={styles.centerText}> {this.state.centerText}</Text>
          {this.state.patientPosition==2?<Text style={styles.centerExamText}>{this.state.exam}</Text>:null}
        </View>
        <View style={styles.textBoxContainer}>
          <View style={styles.textBox}>
            <Text style={styles.dialogText}>{this.state.dialog}</Text>
          </View>
        </View>
        {this._buttonComponents()}
      </View>
      
    )
  }

  _overlayView(){
    return(
          <View style={styles.crosshair}/>
          )
  }

  _changeHoverText(){
    let text = ""
    id = this.state.selectedId;

      if (id != -1){
        text = arvore[id]['name']
      }
      this.setState({
        centerText : text,
      })
    
  }



  async _changeDialogText(){
    lastId = this.state.lastDialogId;
    selectedId = this.state.selectedId;
    if (lastId != selectedId){
      await this.setState({
        lastDialogId : selectedId,
        indexDialog : 0,
      })
    }

    if (this.state.indexDialog>=(Object.keys(arvore[this.state.selectedId]['dialogos']).length)){
      await this.setState({
        indexDialog: 0
      });
    }
    let text = "";
    if (this.state.selectedId != -1){
      text = arvore[this.state.selectedId]['dialogos'][this.state.indexDialog]['fala'];
    }
    let newIndex = this.state.indexDialog + 1;

    this.setState({
      dialog : text,
      indexDialog: newIndex
    })
  }

  async _changeExamText(){
    lastId = this.state.lastExamId;
    selectedId = this.state.selectedId;
    if ((lastId != selectedId) && selectedId!=-1){
      await this.setState({
        lastExamId : selectedId,
        indexExam : 0,
        exam: arvore[this.state.selectedId]['exames'][0]['exame']
      })
    }
    else if(selectedId==-1){
      this.setState({
        exam: ""
      })
    }
  }

  async _clickExamArrow(up){
    console.log("aq")
    up?console.log("up"):console.log("Down");
    //0: baixo, 1: cima
    lastId = this.state.lastExamId;
    selectedId = this.state.selectedId;
    if (lastId != selectedId){
      await this.setState({
        indexExam : 0,
      })
    }
    console.log(this.state.selectedId)
    if (this.state.selectedId==-1) return;
    let newIndex = this.state.indexExam;
    console.log(this.state.indexExam)
    if (up) newIndex++;
    else newIndex--;
    console.log(newIndex)
    if (newIndex>=(Object.keys(arvore[this.state.selectedId]['exames']).length)){
      await this.setState({
        indexExam: 0
      });
      console.log("aq1")
      newIndex=0;
    }
    if (newIndex<=-1){
      await this.setState({
        indexExam: Object.keys(arvore[this.state.selectedId]['exames']).length-1
      });
      console.log("aq2")
      newIndex=Object.keys(arvore[this.state.selectedId]['exames']).length-1;
      console.log(newIndex)
    }
    let text = "";
    if (this.state.selectedId != -1){
      text = arvore[this.state.selectedId]['exames'][newIndex]['exame'];
    }

    this.setState({
      exam : text,
      indexExam: newIndex
    })
  }

  _buttonComponents(){
    return(
      <View>
      <View style={{position:'absolute', flexDirection:'column', justifyContent: 'space-around',right:10, bottom:40, width:70, height:160, flex:1}}>
        <ButtonComponent key="examinar"
            buttonState={'off'}
            stateImageArray={[require("./js/res/stethos.png"), require("./js/res/stethos.png")]}
            style={styles.screenIcon} selected={true}
            onPress={()=>{
              this._clickExam();
            }}
        />
        <ButtonComponent key="conversar"
            buttonState={'off'}
            stateImageArray={[require("./js/res/dialogue.png"), require("./js/res/dialogue.png")]}
            style={styles.screenIcon} selected={true}
            onPress={()=>{
              this._changeDialogText();
            }}
        />
      </View>
      
      <View style={{position:'absolute', flexDirection:'column', justifyContent: 'space-around',left:10, bottom:30, width:70, height:160, flex:1}}>
      {this.state.hoveringObject!=0?<ButtonComponent key="clicar"
            buttonState={'off'}
            stateImageArray={[require("./js/res/click.png"), require("./js/res/click.png")]}
            style={styles.screenIcon} selected={true}
            onPress={()=>{
              if (this.state.hoveringObject!=0){
                this.setState({
                  patientPosition:this.state.hoveringObject,
                });
                this._passClick(1);
              }
            }}
        />:null}
      {this.state.patientPosition==2?<ButtonComponent key="setacima"
            buttonState={'off'}
            stateImageArray={[require("./js/res/arrowmenuup.png"), require("./js/res/arrowmenuup.png")]}
            style={styles.screenIcon} selected={true}
            onPress={()=>{
              this._clickExamArrow(true);
            }}
        />:null}
        {this.state.patientPosition==2?<ButtonComponent key="setabaixo"
            buttonState={'off'}
            stateImageArray={[require("./js/res/arrowmenudown.png"), require("./js/res/arrowmenudown.png")]}
            style={styles.screenIcon} selected={true}
            onPress={()=>{
              this._clickExamArrow(false);
            }}
        />:null}
      </View>
    </View>
    )
  }

  _changeSelectedID = (id)=>{
    this.setState({
      selectedId:id 
    })
    this._changeHoverText();
    this._changeExamText();
  }

  _passClick(id){
    this.setState({
      buttonWasClicked:1,
      idButtonClicked:id,
  });
  }

  _getButtonState = ()=>{
    let button = this.state.buttonWasClicked;
    let id = this.state.idButtonClicked;
    this.setState({
      buttonWasClicked:0,
      idButtonClicked:-1,
    });
  return {clicked:button, id:id}
  }

  _cardPlayed(type){
    //type=> 1 = sangue, 2 = urina, 3 = raioX, 4 = imagem
    if (type=4){
      if(this.state.storedIdImagemExame==-1) return "";
      arvore[this.state.storedIdImagemExame]['exames'][this.state.storeIndexImagemExame]["checado"]=true;
      return arvore[this.state.storedIdImagemExame]['exames'][this.state.storeIndexImagemExame]["resultado"];
    }

  }

  _clickExam(){
    let selectedId = this.state.selectedId;
    let indexExam = this.state.indexExam;
    if (selectedId==-1) return;
    //Retorno em texto
    if (arvore[this.state.selectedId]['exames'][indexExam]['tipo']==0){
      console.log(arvore[this.state.selectedId]['exames'][indexExam]["checado"])
      this.setState({
        dialog:arvore[this.state.selectedId]['exames'][indexExam]["resultado"]
      });
      arvore[this.state.selectedId]['exames'][indexExam]["checado"]=true;
      console.log(arvore[this.state.selectedId]['exames'][indexExam]["checado"])
    }
    else if (arvore[this.state.selectedId]['exames'][indexExam]['tipo']==1){
      this.setState({
        storeIndexImagemExame:indexExam,
        storedIdImagemExame: selectedId,
        dialog:"Utilize o cartão de exame de imagem"
    });
    }
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
  centerTextView: {
    position: 'absolute',
    top: (Dimensions.get('window').height / 2),
    left: (Dimensions.get('window').width / 2),
  },
  centerText: {
    color: '#a9a9a9',
    fontWeight: 'bold',
    fontSize: 18,
  },
  centerExamText: {
    color: '#a9a9a9',
    fontWeight: 'normal',
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
  dialogText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    marginRight: 2,
    marginLeft: 2,
  },
  initialTitleText: {
    color: 'black',
    fontWeight: 'normal',
    fontSize: 40,
  },
  image: {
    flex: 1,

    resizeMode: 'contain'
  },
  informationText:{
    fontFamily: "Roboto",
    color: 'grey',
    fontWeight: '100',
    fontSize: 25,
    marginRight: 2,
    marginLeft: 2,
  }
});

module.exports = App
