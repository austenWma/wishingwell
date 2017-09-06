import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Image, TextInput,  ImagePickerIOS} from 'react-native';
import { Form, Separator, InputField, LinkField, SwitchField, PickerField} from 'react-native-form-generator';
import { connect } from 'react-redux';
import { setUserInfo } from '../Actions/Profile/ProfileAction'
import { setUserPhoto } from '../Actions/Profile/PhotoAction'
import NavigationBar from 'react-native-navbar'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import * as firebase from 'firebase'
import { Actions } from 'react-native-router-flux'
import Login from './Login'
import { amazonKey, amazonSecret } from '../../config'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import axios from 'axios'
import ImagePicker from 'react-native-image-picker'

const mapStateToProps = (state) => {
  return {
    username: state.ProfileReducer.username,
    firstname: state.ProfileReducer.firstname,
    lastname: state.ProfileReducer.lastname,
    email: state.ProfileReducer.email,
    photo: state.PhotoReducer.photo,
    bio: state.ProfileReducer.bio,
    uid: state.ProfileReducer.uid
  }
}


class Settings extends Component {
  static navigationOptions = {
    title: 'Settings'
  };
  constructor(props) {
    super(props)
    this.state={
      photo: null,
      formData: {},
      uploading: false,
      image: null
    }

    this.handleOnSave = this.handleOnSave.bind(this)
    this.handleFormChange = this.handleFormChange.bind(this)
    this.handleOnChoose = this.handleOnChoose.bind(this)
  }

  handleFormChange(formData){
    this.state.formData= formData

  }

  handleOnSave() {
    this.props.setUserInfo(this.state.formData)
    if (this.state.photo === null && this.props.photo) {
      this.setState({
        photo: this.props.photo
      })
    } else {
      this.props.setUserPhoto(this.state.photo)
    } 
    firebase.database().ref(`users/${this.props.uid}`).update({
      username: this.state.formData.username || this.props.username,
      firstname: this.state.formData.firstname || this.props.firstname,
      lastname: this.state.formData.lastname || this.props.lastname,
      email: this.state.formData.email || this.props.email,
      bio: this.state.formData.bio || this.props.bio,
      photo: this.state.photo || this.props.photo
    })
  }
  
  signOut() {
    firebase.auth().signOut().then(() => {
      Actions.Login()
    })
  }

  handleOnChoose(){
    ImagePicker.showImagePicker(null, (response) => {
      console.log('HIHIHIHI')
      console.log('Response = ', response);
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };
    
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
    
        this.setState({
          photo: source
        });
      }
    });
  }
  

  render() {
    let { photo } = this.state;
    return (
      
      <KeyboardAwareScrollView>
      <View>
       <View style={styles.body}>
          <Image source={{ uri: photo || this.props.photo }} onPress={this.handleOnChoose} style={styles.image} />
        <Button
            title="Change Profile Photo"
            onPress={this.handleOnChoose}
            style={styles.button}
        />
       </View>
        <Separator label="Personal Information"/>
       <Form
          style={styles.form}
          ref='personalInformation'
          onChange={this.handleFormChange}
          label="Personal Information" >

        <InputField
            ref='username'
            placeholder='Username'
            value={this.props.username}
            iconLeft={<Icon name='account-circle' size={30} style={styles.icon}/>}
          />


         <InputField
            ref='firstname'
            placeholder='First Name'
            value={this.props.firstname}
            iconLeft={<Icon name='account' size={30} style={styles.icon}/>}
          />

        <InputField
            ref='lastname'
            placeholder='Last Name'
            value={this.props.lastname}
            iconLeft={<Icon name='account' size={30} style={styles.icon}/>}
          />
        <InputField
            ref='email'
            iconLeft={<Icon name='email-outline' size={30} style={styles.icon}/>}
            placeholder='Email'
            value={this.props.email}
          />
        <InputField
            ref='bio'
            iconLeft={<Icon name='information-outline' size={30} style={styles.icon}/>}
            placeholder='Add a bio to your profile'
            value={this.props.bio}
          />
        <Separator label="Private Information"/>
        <LinkField 
          iconLeft={<Text style={styles.cardtext}>Add Credit Card</Text>}
          onPress={()=>Actions.AddCard()}
          iconRight={<Icon name='chevron-right' size={30} style={styles.icon}/>}
        />
        </Form>

        <Button
          title="Save Changes"
          onPress={() => this.handleOnSave()}
          style={styles.button}
        ></Button>
        <Button
          title="Sign Out"
          onPress={() => this.signOut()}
          style={styles.button}
        ></Button>

      </View>
        </KeyboardAwareScrollView>
    );
  }

  

  // _pickImage = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //   });
  //   console.log(result);
  //   if (!result.cancelled) {
  //     this.setState({ photo: result.uri });
  //   }
  // };
};

const styles = StyleSheet.create({
  body: {
    top: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 100,
    borderRadius: 50,
    width: 100,
    alignItems: 'center',
    backgroundColor: '#C0C0C0'
  },
  icon: {
    marginTop: 7,
    marginLeft: 10,
    color:'gray'
  },
  button:{
    marginTop: 15
  },
  cardtext: {
    fontSize: 18,
    marginTop: 10,
    marginLeft: 10
  }
});

export default connect(mapStateToProps, { setUserInfo, setUserPhoto })(Settings);
