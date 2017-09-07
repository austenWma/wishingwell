import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native'
import NavigationBar from 'react-native-navbar'
import * as firebase from 'firebase'
import moment from 'moment'
import { connect } from 'react-redux'
import { setSavings } from '../Actions/Savings/SavingsAction'
const db = firebase.database()


const mapStateToProps = (state) => {
  return {
    logs: state.SavingsReducer.entries,
    uid: state.ProfileReducer.uid
  }
}

class LogHistory extends Component {

  componentWillMount(){
    db.ref(`users/${this.props.uid}/logs`).on('value', (snapshot) => {
      (snapshot.val()) ? this.props.setSavings(Object.values(snapshot.val())) : null;
    })
  }

  render() {

    return (
      <View>
        <View>
          <NavigationBar title={{title:'Savings'}} tintColor='#99ccff'/>
        </View>
            <ScrollView style={styles.log}>
              <FlatList 
                removeClippedSubviews={false}
                data={this.props.logs.reverse()}
                renderItem={({item}) =>
                  <View style={styles.list}>
                    <Text style={styles.description}>{item.description}</Text>
                    <Text style={styles.date}>{item.date}</Text>
                    <Text style={styles.amount}>${item.amount}</Text>
                    <Text style={styles.amount}>${item.amount}</Text>
                  </View>
                }
                style={{height:'100%'}}
              />
              </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  list: {
    borderBottomWidth: 0.5,
    borderColor: 'black',
    width: '100%',
    height: 70
  },
  description: {
    fontSize: 20,
    top: 5,
    marginLeft: 7
  },
  amount: {
    textAlign: 'right',
    alignSelf: 'stretch',
    fontSize: 20,
    marginBottom: 3,
    marginRight: 10,
    marginTop: 4
  },
  date: {
    marginLeft: 7,
    top: 5,
    color: 'gray'
  },
  log : {
    marginBottom: '17%'
  }
})

export default connect(mapStateToProps, { setSavings })(LogHistory)
