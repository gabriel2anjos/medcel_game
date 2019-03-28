import React, {Component} from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  PixelRatio,
  TouchableHighlight,
  Dimensions,
  Image,
  Picker,
  TouchableOpacity,
  Button
} from 'react-native';


import {
  ViroARSceneNavigator
} from 'react-viro';
import {arvore} from './js/HitIds'
import {doencas} from './js/Doencas'

import {FinalScore} from './js/FinalScore'

import ButtonComponent from './js/Component/ButtonComponent';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
  SlideAnimation,
  ScaleAnimation,
} from 'react-native-popup-dialog';

// import {createStackNavigator, createAppContainer} from 'react-navigation';

// const MainNavigator = createStackNavigator({
//   Home: {screen: HomeScreen},
//   FinalScore: {screen : FinalScore}
// });

// const App = createAppContainer(MainNavigator);

var PickerItem = Picker.Item;


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
        cardPlayed : (a)=>this._cardPlayed(a),
        turnOffSound : ()=>{this.setState({playSound:false},)},
        stateSound : ()=>{return this.state.playSound}
      },
      selectedId:-1,
      indexDialog:0,
      lastDialogId:0,
      isModalVisible: false,
      startedGame:0,
      buttonWasClicked:0,
      idButtonClicked:-1,
      patientPosition:1,
      arrowsVisible:false,
      hoveringObject:0,
      indexExam:0,
      lastExamId:0,
      storedIdImagemExame:-1,
      storeIndexExameSangue:-1,
      storedIdExameSangue:-1,
      storeIndexExameUrina:-1,
      storedIdExameUrina:-1,
      storedIdRaioXExame:-1,
      storedIndexRaioXExame:-1,
      storeIndexImagemExame:-1,
      finishedGame:0,
      pointsCalculated:0,
      precisionAcquired:0,
      precisionTotal:0,
      points:0,
      errorList:[],
      doencas:doencas,
      doencaSelecionada:0,
      exibeErros:false,
      indexErros:0,
      errorShown:"",
      playSound: false,
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
    this._renderLastScreen = this._renderLastScreen.bind(this);
    this._calculatePoints = this._calculatePoints.bind(this);
    this._alteraErros = this._alteraErros.bind(this);
  }

  render() {
      let opcoesDoencas = this.state.doencas.map( (s, i) => {
        return <Picker.Item key={i} value={s} label={s} />
    });
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
    if(this.state.finishedGame)  return (
      <View style={{ flex: 1 }}>
        {this._renderLastScreen()}
      </View>
    );
    return(
      <View style={{ flex: 1 }}>
        {this._initialARView()}
        <Dialog
          onDismiss={() => {
            this.setState({ defaultAnimationDialog: false });
          }}
          width={0.9}
          visible={this.state.isModalVisible}
          rounded
          actionsBordered
          onTouchOutside={() => {
            this.setState({ isModalVisible: false });
          }}
          dialogTitle={
            <DialogTitle
              title="Concluir exame"
              style={{
                backgroundColor: '#F7F7F8',
              }}
              hasTitleBar={false}
              align="center"
            />
          }
          footer={
            <DialogFooter>
              <DialogButton
                text="CANCEL"
                bordered
                onPress={() => {
                  this.setState({ isModalVisible: false });
                }}
                key="button-1"
              />
              <DialogButton
                text="Finalizar"
                bordered
                onPress={() => {this.setState({isModalVisible: false}); this._calculatePoints(); setTimeout(()=>this.setState({finishedGame: true}),500)}}
                key="button-2"
              />
            </DialogFooter>
          }
        >
          <DialogContent
            style={{
              backgroundColor: '#F7F7F8',
            }}
          >
            <Text style={{color:"black", fontFamily:"Roboto",textAlign:"center"}}>Já sabe o diagnóstico? Clique em concluir para terminar o exame!</Text>
            <Picker
              selectedValue = {this.state.doencaSelecionada}
              onValueChange = {(doenca)=>{this.setState({doencaSelecionada:doenca})}}>
              {opcoesDoencas}
            </Picker>
          </DialogContent>
        </Dialog>
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
  
  _toggleModal = () =>
  this.setState({ isModalVisible: !this.state.isModalVisible });


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
    arvore[this.state.selectedId]['dialogos'][this.state.indexDialog]['checado']=true;
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

    //0: baixo, 1: cima
    lastId = this.state.lastExamId;
    selectedId = this.state.selectedId;
    if (lastId != selectedId){
      await this.setState({
        indexExam : 0,
      })
    }

    if (this.state.selectedId==-1) return;
    let newIndex = this.state.indexExam;
    if (up) newIndex++;
    else newIndex--;
    if (newIndex>=(Object.keys(arvore[this.state.selectedId]['exames']).length)){
      await this.setState({
        indexExam: 0
      });
      newIndex=0;
    }
    if (newIndex<=-1){
      await this.setState({
        indexExam: Object.keys(arvore[this.state.selectedId]['exames']).length-1
      });
      newIndex=Object.keys(arvore[this.state.selectedId]['exames']).length-1;
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
      {this.state.patientPosition==1?<ButtonComponent key="terminar"
            buttonState={'off'}
            stateImageArray={[require("./js/res/checkbox.png"), require("./js/res/checkbox.png")]}
            style={styles.screenIcon} selected={true}
            onPress={()=>{
              this.setState({isModalVisible:true})
            }}
        />:null}
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
    //Tipos: 0 - Consulatorio, 1 - Audio, 2 - RaioX, 3 - Imagem, 4 - Sangue, 5 - Urina
    this.setState({
      dialog:"Exame realizado."
    })
    if (type==2){
      if(this.state.storedIdRaioXExame==-1) return "";
      arvore[this.state.storedIdRaioXExame]['exames'][this.state.storedIndexRaioXExame]["checado"]=true;
      return arvore[this.state.storedIdRaioXExame]['exames'][this.state.storedIndexRaioXExame]["resultado"];
    }
    else if (type==3){
      if(this.state.storedIdImagemExame==-1) return "";
      arvore[this.state.storedIdImagemExame]['exames'][this.state.storeIndexImagemExame]["checado"]=true;
      return arvore[this.state.storedIdImagemExame]['exames'][this.state.storeIndexImagemExame]["resultado"];
    }
    else if (type==4){
      if(this.state.storedIdExameSangue==-1) return "";
      arvore[this.state.storedIdExameSangue]['exames'][this.state.storeIndexExameSangue]["checado"]=true;
      return arvore[this.state.storedIdExameSangue]['exames'][this.state.storeIndexExameSangue]["resultado"];
    }
    else if (type==5){
      if(this.state.storedIdExameUrina==-1) return "";
      arvore[this.state.storedIdExameUrina]['exames'][this.state.storedIdExameUrina]["checado"]=true;
      return arvore[this.state.storedIdExameUrina]['exames'][this.state.storedIdExameUrina]["resultado"];
    }

  }

  //Roda ao clicar em algum exame
  async _clickExam(){
    let selectedId = this.state.selectedId;
    let indexExam = this.state.indexExam;
    if (selectedId==-1) return;
    //Retorno em texto
    if (arvore[this.state.selectedId]['exames'][indexExam]['tipo']==0){
      this.setState({
        dialog:arvore[this.state.selectedId]['exames'][indexExam]["resultado"],
        
      });
      arvore[this.state.selectedId]['exames'][indexExam]["checado"]=true;
    }
    //Retorno em audio
    else if (arvore[this.state.selectedId]['exames'][indexExam]['tipo']==1){
      if(this.state.selectedId==1 && indexExam==0){
        arvore[this.state.selectedId]['exames'][indexExam]["checado"]=true;
        this.setState({
          dialog:"Auscultando",
          playSound:true,
        });
        // await soundObject.loadAsync(require('./js/res/heartbeat.mp3'));
        // await soundObject.playAsync();
      }
    }
    else if (arvore[this.state.selectedId]['exames'][indexExam]['tipo']==2){
      this.setState({
        storedIndexRaioXExame:indexExam,
        storedIdRaioXExame: selectedId,
        dialog:"Utilize o cartão de exame de raio-X"
    });
    }
    else if (arvore[this.state.selectedId]['exames'][indexExam]['tipo']==3){
      this.setState({
        storeIndexImagemExame:indexExam,
        storedIdImagemExame: selectedId,
        dialog:"Utilize o cartão de exame de imagem"
    });
    }
    else if (arvore[this.state.selectedId]['exames'][indexExam]['tipo']==4){
      this.setState({
        storeIndexExameSangue:indexExam,
        storedIdExameSangue: selectedId,
        dialog:"Utilize o cartão de exame de sangue"
    });
    }
    else if (arvore[this.state.selectedId]['exames'][indexExam]['tipo']==5){
      this.setState({
        storeIndexExameUrina:indexExam,
        storedIdExameUrina: selectedId,
        dialog:"Utilize o cartão de exame de urina"
    });
    }
  }

  //Algoritmo de calculo dos pontos
  _calculatePoints(){
      var precisionTotal = 0;
      var precisionAcquired = 0;
      var points = 0;
      var errorList = [];
      var exames = {
        0:0,
        1:0,
        2:5,
        3:8,
        4:6,
        5:4,
      }
      for (var i=0; i<=Object.keys(arvore).length-1;i++){
        for (var j=0; j<=Object.keys(arvore[i]["dialogos"]).length-1;j++){
          let obj = arvore[i]["dialogos"][j];
          precisionTotal+=obj["precisao"];
          if (obj["checado"]) precisionAcquired+=obj["precisao"];
          else if(obj["precisao"]>0) errorList.push(obj["erro"]);
        }
        for (var j=0; j<=Object.keys(arvore[i]["exames"]).length-1;j++){
          let obj = arvore[i]["exames"][j];
          precisionTotal+=obj["precisao"];
          if (obj["checado"] ) {
            precisionAcquired+=obj["precisao"];
            points+=exames[obj["tipo"]]
          }
          else if(obj["precisao"]>0 && (obj["tipo"]==0 || obj["tipo"]==1)) errorList.push(obj["erro"]);
        }
      }
      precisionAcquired= (precisionAcquired*100)/precisionTotal;
      points = precisionAcquired-points;
      this.setState({pointsCalculated:1,
        precisionAcquired:precisionAcquired,
        points:points,
        precisionTotal:precisionTotal,
        errorList:errorList,
      });
  }

  //Gera a ultima tela (score e erros) 
  _renderLastScreen(){
    return (
      <View style={{ flex: 1 }}>
      {this.state.doencaSelecionada=="Lúpus eritematoso sistêmico"?
      <View>
        <Text style={{fontSize:45,textAlign:"center", color:"green"}}>Você acertou!</Text>  
        <Text style={{fontSize:25,textAlign:"center"}}>Precisão do diagnostico: {Math.round(this.state.precisionAcquired)}%</Text>  
        <Text style={{fontSize:25,textAlign:"center"}}>Pontos: {Math.round(this.state.points)}</Text>
      </View>
      :
      <View>
        <Text style={{fontSize:45,textAlign:"center", color:"red"}}>Você errou!</Text>  
        <Text style={{fontSize:25,textAlign:"center"}}>Proximidade do diagnostico: {Math.round(this.state.precisionAcquired)}%</Text>  
        <Text style={{fontSize:25,textAlign:"center"}}>Pontos: 0</Text>
      </View>
    }
      <Button
        onPress={this._alteraErros}
        title="O que errei?"
        color="red"
      />
      <Dialog
          onDismiss={() => {
            this.setState({ defaultAnimationDialog: false });
          }}
          width={0.9}
          visible={this.state.exibeErros}
          rounded
          actionsBordered
          onTouchOutside={() => {
            this.setState({ exibeErros: false });
          }}
          dialogTitle={
            <DialogTitle
              title="Concluir exame"
              style={{
                backgroundColor: '#F7F7F8',
              }}
              hasTitleBar={false}
              align="center"
            />
          }
          footer={
            <DialogFooter>
              <DialogButton
                text="Sair"
                bordered
                onPress={() => {
                  this.setState({ exibeErros: false });
                }}
                key="button-1"
              />
              <DialogButton
                text="Próximo"
                bordered
                onPress={() => {
                  
                  let indexNew = this.state.indexErros +1;
                  console.log(this.state.indexErros)
                  console.log(indexNew)
                  console.log(this.state.errorList)
                  this.setState({indexErros: indexNew, errorShown:this.state.errorList[indexNew]});}}
                key="button-2"
              />
            </DialogFooter>
          }
        >
          <DialogContent
            style={{
              backgroundColor: '#F7F7F8',
            }}
          >
            <Text style={{color:"black", fontFamily:"Roboto",textAlign:"center"}}>{this.state.errorShown}</Text>
          </DialogContent>
        </Dialog>
      </View>
    )
  }

  _alteraErros(){
    this.setState({exibeErros:!this.state.exibeErros})
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
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
  centerExamText: {
    color: 'black',
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

    resizeMode: 'center'
  },
  informationText:{
    fontFamily: "Roboto",
    color: 'black',
    fontWeight: '100',
    fontSize: 25,
    marginRight: 2,
    marginLeft: 2,
  }
});

module.exports = App
