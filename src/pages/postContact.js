import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { Input, Button } from 'react-native-elements';
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import * as ImageManipulator from 'expo-image-manipulator';
import { connect } from 'react-redux';
import { CommonActions } from '@react-navigation/native';

import { postData } from '../actions/contact';


const PostContact = (props) => {
  const [contact, setContact] = React.useState({
    firstName: "",
    lastName: "",
    age: ""
  });
  const [photo, setPhoto] = React.useState("");
  
  const getImageFromCamera = async () => {
    const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
    const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted') {
      let capturedImage = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3]
      });
      if (!capturedImage.cancelled) {
        console.log(capturedImage);
        processImage(capturedImage.uri);
      }
    }
  }

  const getImageFromGallery = async () => {
    const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (cameraRollPermission.status === 'granted') {
      let chosenImage = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3]
      });
      if (!chosenImage.cancelled) {
        console.log(chosenImage);
        processImage(chosenImage.uri);
      }
    }

  };

  const processImage = async (imageUri) => {
    let processedImage = await ImageManipulator.manipulateAsync(
      imageUri,
      [
        { resize: { width: 400 } }
      ],
      { format: 'png' }
    );
    console.log(processedImage);
    setPhoto(processedImage.uri);

  };

  const change = (i, v) => {
    setContact(c => {
      c[i] = v;
      return { ...c };
    })
  }
  const posting = async (firstName, lastName, age, photo) => {
    try {
      age = parseInt(age);
    
      if (photo === "") {
        photo = "N/A"
      }
      const newData = {
        firstName, lastName, age, photo
      }
      const res =props.postData(newData);
      if(res)  props.navigation.dispatch(
        CommonActions.navigate({name: 'List'})
      );
    }
    catch (e) {
      console.log(e)
    }
  }

    const img = photo ? (<Image source={{ uri: photo }}/>) : <Text></Text>;  

  return (
    <ScrollView>
      <View >
        <View >
          {img}

          <Button
            title='Camera'
            onPress={()=>{getImageFromCamera()}}
          />
          <Button
            title='Gallery'
            onPress={()=>{getImageFromGallery()}}
          />
        </View>
        
        <Input
          placeholder="First Name"
          onChangeText={(c) => change('firstName', c)}
          value={contact.firstName}
        />
        <Input
          placeholder="Last Name"
          onChangeText={(c) => change('lastName', c)}
          value={contact.lastName}
        />
        <Input
          placeholder="Age"
          onChangeText={(c) => change('age', c)}
          value={contact.age}
          keyboardType="numeric"

        />
        <View >
          <Button
            onPress={() => posting(contact.firstName, contact.lastName, contact.age, photo)}
            title="Add Data"
          />
        </View>
      </View>
    </ScrollView>
  );
}

const mapDispatchToProps = dispatch => ({
  postData: (newData) => dispatch(postData(newData))
});

export default connect(null, mapDispatchToProps)(PostContact);
