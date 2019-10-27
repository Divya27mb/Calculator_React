/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

  constructor(){
  super()
  this.state={
    resultText:"",
    calculationText: ""
  }
  this.operations = ['DEL','/','*','+','-']
  }

   calculateResult(text){
        this.setState({
            resultText : '',
            calculationText: eval(text)
        })
   }

    validate(){
        const text = this.state.resultText
        switch(text.slice(-1)){
            case '+':
            case '-':
            case '*':
            case '/':
                return false
        }
        return true
    }

   btnPressed(text){

    if(text == '='){
        return this.validate() && this.calculateResult(this.state.resultText)
    }

    this.setState({
       resultText:this.state.resultText+text}
       )
   }

  operate(operation){
    switch(operation){
        case 'DEL':
            let text = this.state.resultText.split('')
            text.pop()
            this.setState({
                resultText: text.join('')
            })
            break
        case '+':
        case '-':
        case '*':
        case '/':
            const lastChar = this.state.resultText.split('').pop()
            if(this.operations.indexOf(lastChar)>0)return
            if(this.state.resultText == ''){
            return }
            this.setState({
                resultText:this.state.resultText + operation
            })
    }
  }


  render() {

    let rows=[]
    let num = [[1,2,3],[4,5,6],[7,8,9],['.',0,'=']]
    for(let i = 0;i <4;i++){
        let row = []
        for (let j= 0;j<3;j++){
            row.push(<TouchableOpacity onPress={() => this.btnPressed(num[i][j])}style={styles.btn}><Text style = {styles.buttonText}>{num[i][j]}</Text></TouchableOpacity>)
        }
        rows.push(<View style = {styles.row}>{row}</View>)

    }


    let ops = []
    for (let i=0;i<5;i++){
        ops.push(<TouchableOpacity onPress={() => this.operate(this.operations[i])}style={styles.btn}><Text style={[styles.buttonText,styles.white]}>{this.operations[i]}</Text></TouchableOpacity>)
    }

    return (
      <View style={styles.container}>
        <View style={styles.result}><Text style = {styles.expressText}>{this.state.resultText}</Text></View>
        <View style={styles.calculation}><Text style={styles.resultText}>{this.state.calculationText}</Text></View>
        <View style={styles.button}>
            <View style={styles.numbers}>{rows}</View>
            <View style={styles.operations}>{ops}</View>
            </View>
           </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    },
    result: {
      flex: 2,
      backgroundColor:'white',
      justifyContent:'center',
      alignItems:'flex-end'
    },
      expressText: {
                 fontSize: 40,
               },
       resultText: {
          fontSize: 25,
        },
        buttonText: {
             fontSize: 30,
        },
        white:{
        color:'white',
        },
        btn:{
        flex:1,
        alignItems:'center',
        alignSelf:'stretch',
        justifyContent:'center'
        },
        row:{
        flexDirection:'row',
        flex:1,
        justifyContent:'space-around',
        alignItems:'center'
        },
    calculation: {
        flex: 1,
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'flex-end'
    },
   button: {
      flex: 7,
      flexDirection: 'row',

   },
   numbers: {
     flex: 3,
     backgroundColor:'yellow',
   },
   operations: {
      flex: 1,
      backgroundColor:'red'
   },
});
