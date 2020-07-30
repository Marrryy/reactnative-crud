import React, { useEffect } from 'react';
// import React, { component } from 'react';
import { ScrollView, View, Picker,Text, TouchableHighlight, Button } from 'react-native';
import { connect } from 'react-redux';
import { Card, Fab } from 'react-native-elements';
// import { Add } from '@material-ui/icons';

import {
  getData
} from "../actions/contact";
import { CommonActions } from '@react-navigation/native';



const ListContact =(props)=> {
  console.log(props)
  console.log(909090900)
  useEffect(() => {
    props.getData();
  }, []);

  return (
    <View style={{width: '100%'}}>
      <View style={{
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        {
          props.contacts && props.contacts.data.map((data, i) => {
            let urlphoto = "";
            if (data.photo == "N/A" || data.photo== "") {
              urlphoto = "../../public/no-image.jpg"
            } else {
              urlphoto = data.photo
            }
            return (
              // <Text key={i}>bgnst</Text>
              <TouchableHighlight key={i}
              style={{width: '100%'}}
                onPress={() =>
                  navigation.dispatch(
                    CommonActions.navigate({
                      name: 'View',
                      params: {
                        contact: data
                      }
                    })
                  )

                  // navigate('View', { contact: data })
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
                    // image={{ uri: url.getImage(data.url.split("pokemon")[1].replace(/\//g, "")) }}
                    image={{ uri: urlphoto }}
                  >
                    <Text style={{ marginBottom: 10 }}>
                      Age {data.age}
                    </Text>
                  </Card>
                </View>

              </TouchableHighlight>
           
           );
          }
          )
        }
      </View>
      <Fab color="secondary" aria-label="add" style={{
        position: 'fixed',
        right: '20px',
        bottom: '20px'
      }}>
        <Button onPress={() => navigation.dispatch(
  CommonActions.navigate({
    name: 'Post'
  })
)} />
      </Fab>
      
     </View> 
      // <Text>asdadsadasda</Text>
  );

}


const mapStateToProps = ({ data }) => {
  return { contacts: data.contacts }
};
const mapDispatchToProps = dispatch => ({
  getData: () => dispatch(getData())
});
export default connect(mapStateToProps, mapDispatchToProps)(ListContact);