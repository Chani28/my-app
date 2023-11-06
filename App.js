import { StatusBar } from 'expo-status-bar';
import { TextInput,StyleSheet, Text, View ,FlatList,Button, Image} from 'react-native';
import React,  { useState ,useEffect} from 'react';

let initialProducts = [];
 
export default function App() {

  const [search,setSearch]= useState("");
  const [products,setProducts]= useState(initialProducts);

 useEffect(() => {
  fetch("https://gocode-rn.glitch.me/products")
  .then(res => res.json())
  .then (data => {initialProducts = data; setProducts(data);})
  
 },[])

  const renderProduct = ({item}) => (
    <View style = {styles.product}>
    <View style={{flex:1}}>
      <Text>{item.title}</Text>
      </View> 
      <View>
      <Image source={{ uri: item.image }} style={styles.image}/>
      </View>
      <View style={{width : "50%"}}>
      <Button title="Byu"/>
      </View>
      </View>
  );

  const handleSearch =(search) => {
    setSearch(search);
    setProducts(
    initialProducts.filter((products) =>
      products.title.toLowerCase().includes(search.toLowerCase()) 
    )
      );
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={(text ) => handleSearch(text)}
        value={search}
      />
     <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E2E3E3",
    marginTop: 30,
  },
  image:{
    flex:1,
    width:100,
    height:100,
  },
  product:{
    flex:1,
    width: "80%",
    height: 200,
    alignSelf: "center",
    padding: 20,
    margin: 10,
    backgroundColor : "#FFFFFF" ,
    borderRadius : 5,
    elevation : 10,
  },
  input:{
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
