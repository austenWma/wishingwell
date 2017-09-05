import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, Alert, Button } from 'react-native'
import NavigationBar from 'react-native-navbar'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures'
import * as firebase from "firebase"
import { connect } from 'react-redux'
import axios from 'axios'
import ConfirmModal from './ConfirmModal.js'
import { setUserInfo } from '../../Actions/Profile/ProfileAction.js'

const db = firebase.database()

const mapStateToProps = state => {
  return {
    uid: state.ProfileReducer.uid,
    qr: state.ProfileReducer.qr,
    cardID: state.ProfileReducer.cardID,
    paymentReady: state.ProfileReducer.paymentReady,
    total: state.ProfileReducer.total,
  }
}

class Well extends Component {

  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      description: '',
      coinSpeed: 20,
    }
    this.onSwipeUp = this.onSwipeUp.bind(this);
  }

  onSwipeUp(gestureState) {
    if (this.props.paymentReady) {

      this.props.setUserInfo({
        paymentReady: false,
      })

      this.setState({
        coinSpeed: 2
      });

      const ref = db.ref(`users/${this.props.uid}/logs`)

      ref.push({
        date: new Date().toDateString(),
        amount: this.state.amount,
        description: this.state.description
      })
      this.setState({
        amount: '',
        description: '',
      })

      if (this.props.qr !== '' && this.props.cardID !== '') {
        let chargeObj = {
          walletAddress: this.props.qr,
          cardID: this.props.cardID,
          amount: Number(this.state.amount),
        }
        axios.post('http://localhost:4000/api/makeSavings', chargeObj)
        .then(data => {
          console.log(data)

          const ref = db.ref(`users/${this.props.uid}`)

          ref.update({
            total: this.props.total + chargeObj.amount
          })

          this.props.setUserInfo({
            total: this.props.total + chargeObj.amount
          })

          this.setTimeout(
            () => { alert('Savings Added') },
            500
          );
          // let buyObj = {
          //   walletAddress: this.props.qr,
          //   uid: this.props.uid,
          // }

          // axios.post('http://localhost:4000/api/buyCrypto', buyObj)
        })
      } else {
        this.setTimeout(
          () => { alert('Savings Logged') },
          500
        );
      }
    } else {
      alert('Please confirm savings details')
    }
  }

  render() {

    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };

    return (
      <View>
        <View>
          <NavigationBar title={{title:'Wishing Well'}} tintColor='#99ccff'/>
        </View>
        <View style={styles.inputFields}>
          <View style={{height: "20%"}}>
            <Text style={styles.credentials}>Input Amount</Text>
          </View>
          <TextInput style={styles.amountInputField} placeholder="Amount Here" placeholderTextColor={'#A8A8A8'} multiline={true} onChangeText={(text) => this.setState({amount: Number(text)})} value={this.state.amount}/>
          <View style={{height: "20%"}}>
            <Text style={styles.credentials}>Description</Text>
          </View>
          <TextInput placeholder='Description Here' placeholderTextColor={'#A8A8A8'} style={styles.descriptionInputField} multiline={true} numberOfLines={2} onChangeText={(text) => this.setState({description: text})} value={this.state.description}/>
          <View style={styles.confirmModal}>
            <ConfirmModal amount={this.state.amount} description={this.state.description}/>
          </View>
        </View>
        <GestureRecognizer
          onSwipeUp={(state) => this.onSwipeUp(state)}
          config={config}
          style={styles.coin}
          >
          <View style={styles.coin}></View>
        </GestureRecognizer>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  coin: {
    top: '6%',
    height: '75%',
    width: '100%',
  },
  inputFields: {
    marginTop: '2%',
    marginLeft: '25%',
    height: '20%',
    width: '50%',
    borderColor: 'gray',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  credentials: {
    paddingTop: 10
  },
  confirmModal: {
    marginTop: '5%',
    height: '10%',
    width: 100,
  },
  amountInputField: {
    width: '100%',
    height: '21%',
    borderColor: 'gray',
    borderColor: 'gray',
    borderWidth: 1,
    textAlign: 'center',
    fontSize: 15,
  },
  descriptionInputField: {
    width: '100%',
    height: '40%',
    borderColor: 'gray',
    borderColor: 'gray',
    borderWidth: 1,
    textAlign: 'center',
    fontSize: 15,
  },
})

export default connect(mapStateToProps, { setUserInfo })(Well)