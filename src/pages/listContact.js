import React, { useEffect } from 'react';
import { ScrollView, View,Text,TouchableOpacity, YellowBox, Button } from 'react-native';
import { connect } from 'react-redux';
import { Card, Fab } from 'react-native-elements';

import {
  getData
} from "../actions/contact";
import { CommonActions } from '@react-navigation/native';



const ListContact =(props)=> {
  console.log(props)
  console.log(909090900)
  useEffect(() => {
    props.getData();
    YellowBox.ignoreWarnings([
      'Warning: componentWillMount is deprecated',
      'Warning: componentWillReceiveProps is deprecated',
    ]);
  }, []);

  return (
    <ScrollView >
      <View style={{
        justifyContent: "center",
        alignItems: "center",
        marginBottom:20
      }}>
        <View 
          style={{width:"100%"}}
          >

<Button
            title='Create'
            onPress={() =>
              props.navigation.dispatch(
                CommonActions.navigate({
                  name: 'Post'
                })
              )}
            
          />

</View>
        {
          props.contacts && props.contacts.data.map((data, i) => {
            let urlphoto = "";
            if (data.photo == "N/A" || data.photo== "") {
              urlphoto = "../../public/no-image.jpg"
            } else {
              urlphoto = data.photo
            }
            return (
              <TouchableOpacity key={i}
              style={{width: '100%'}}
                onPress={() =>
                  props.navigation.dispatch(
                    CommonActions.navigate({
                      name: 'View',
                      params: {
                        contact: data
                      }
                    })
                  )

                }
                style={{ width: "100%", margin:20}}
              >
                <View>
                  <Card
                    containerStyle={{ width: "90%" }}
                    imageWrapperStyle={{ height: 300 }}
                    imageStyle={{ height: 300 }}
                    titleStyle={{ textTransform: "capitalize", fontSize: 20 }}
                    title={data.firstName + " " + data.lastName}
                    image={{ uri: urlphoto }}
                  >
                    <Text style={{ marginBottom: 10 }}>
                      Age {data.age}
                    </Text>
                  </Card>
                </View>

              </TouchableOpacity>
           
           );
          }
          )
        }
      </View>
      
     </ScrollView> 
  );

}


const mapStateToProps = ({ data }) => {
  return { contacts: data.contacts }
};
const mapDispatchToProps = dispatch => ({
  getData: () => dispatch(getData())
});
export default connect(mapStateToProps, mapDispatchToProps)(ListContact);