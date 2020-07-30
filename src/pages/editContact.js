import React from 'react';
import { View, Text, Image } from 'react-native';
import { Input,  Button } from 'react-native-elements';
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import * as ImageManipulator from 'expo-image-manipulator';
import { connect } from 'react-redux';

import { editData } from '../actions/contact';
import { CommonActions } from '@react-navigation/native';


const EditContact = (props) => {
  const data = props.route.params.contact;

  const [contact, setContact] = React.useState({
    firstName: data.firstName,
    lastName: data.lastName,
    age: data.age.toString()
  });
  const [photo, setPhoto] = React.useState(data.photo);

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
  const editing = async (id, firstName, lastName, age, photo) => {
    age = parseInt(age);
    const newData = {
      firstName, lastName, age, photo
    }
    const res = await props.editData(id, newData);
    if (res) props.navigation.dispatch(
      CommonActions.navigate({name: 'List'})
    )
  }
  const img = photo ? (<Image source={{ uri: photo }}/>) : <Text></Text>;  

  return (
      <View >
        <View >
          {img}
          <Button
            title='Camera'
            onPress={()=>getImageFromCamera()}
          />
          <Button
            title='Gallery'
            onPress={()=>getImageFromGallery()}
          />
        </View>
        <Input
          placeholder="First Name"
          onChangeText={(data) => change('firstName', data)}
          value={contact.firstName}
        />
        <Input
          placeholder="Last Name"
          onChangeText={(data) => change('lastName', data)}
          value={contact.lastName}
        />
        <Input
          placeholder="Age"
          onChangeText={(data) => change('age', data)}
          value={contact.age}
          keyboardType="numeric"

        />
        <View >
          <Button
            onPress={() => editing(data.id, contact.firstName, contact.lastName, contact.age, photo)}
            title="Add Data"
          />
        </View>
      </View>
  );
}


const mapDispatchToProps = dispatch => ({
  editData: (id, newData) => dispatch(editData(id, newData))
});

export default connect(null, mapDispatchToProps)(EditContact);
