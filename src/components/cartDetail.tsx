import React from "react";

import {
  StyleSheet,
  Button,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  TextInput,
  Alert,
} from "react-native";
import {
  MaterialIcons,
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { color } from "react-native-reanimated";

class CartDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectAll: false,
      cartItemsIsLoading: false,
      cartItems: [
        /* Sample data from walmart */
        {
          itemId: "1",
          name: "Modelo Especial",
          quantity: "33.5 cl / 355ml",
         
          thumbnailImage:
            "https://th.bing.com/th?q=Boisson+Energisante&w=120&h=120&c=1&rs=1&qlt=90&cb=1&pid=InlineBlock&mkt=en-WW&cc=CM&setlang=en&adlt=moderate&t=1&mw=247",
          qty: 1,
          salePrice: "750",
          checked: 0,
        },
        {
          itemId: "2",
          name: "Surely Non Alcoholic",
          quantity: "0.5% Al / 1L",
         
          thumbnailImage:
            "https://th.bing.com/th/id/OIP.bb-Pcd7UPX2mmJVk_bNM0gHaHa?w=169&h=180&c=7&r=0&o=5&pid=1.7",
          qty: 1,
          salePrice: "850",
          checked: 0,
        },
        {
          itemId: "3",
          name: "Bai Coconut Flavored",
          quantity: "10 cl / 250ml",
         
          thumbnailImage:
            "https://th.bing.com/th/id/OIP.s_lxQDKfxjc3zgDiN0cCSQHaHa?w=180&h=183&c=7&r=0&o=5&pid=1.7",
          qty: 1,
          salePrice: "800",
          checked: 0,
        },
        // {
        //   itemId: "4",
        //   name: "Toor Dhall",
        //   quantity: "0.5% AL/ 1L",
         
        //   thumbnailImage:
        //     "https://annaistores.com/as_content/uploads/2020/05/81ieFDa5gHL._SY550_.jpg",
        //   qty: 5,
        //   salePrice: "123",
        //   checked: 0,
        // },
        // {
        //   itemId: "5",
        //   name: "Gram Dhall",
        //   quantity: "33.5 cl / 355ml",
         
        //   thumbnailImage:
        //     "https://annaistores.com/as_content/uploads/2020/05/udhayam-gram-dal-228x228-1.jpg",
        //   qty: 5,
        //   salePrice: "123",
        //   checked: 0,
        // },
        // {
        //   itemId: "6",
        //   name: "Gram Dhall",
        //   quantity: "0.5% AL/ 1L",
         
        //   thumbnailImage:
        //     "https://annaistores.com/as_content/uploads/2020/05/udhayam-gram-dal-228x228-1.jpg",
        //   qty: 5,
        //   salePrice: "123",
        //   checked: 0,
        // },
        // {
        //   itemId: "7",
        //   name: "Moong Dhall",
        //   quantity: "33.5 cl / 355ml",
         
        //   thumbnailImage:
        //     "https://annaistores.com/as_content/uploads/2020/12/819D8piBVKL._SL1500_.jpg",
        //   qty: 5,
        //   salePrice: "123",
        //   checked: 0,
        // },
        // {
        //   itemId: "8",
        //   name: "Moong Dhall",
        //   quantity: "0.5% AL/ 1L",
         
        //   thumbnailImage:
        //     "https://annaistores.com/as_content/uploads/2020/12/819D8piBVKL._SL1500_.jpg",
        //   qty: 5,
        //   salePrice: "123",
        //   checked: 0,
        // },
      ],
    };
  }

 

  selectHandler = (index, value) => {
    const newItems = [...this.state.cartItems]; // clone the array
    newItems[index]["checked"] = value == 1 ? 0 : 1; // set the new value
    this.setState({ cartItems: newItems }); // set new state
  };

  selectHandlerAll = (value) => {
    const newItems = [...this.state.cartItems]; // clone the array
    newItems.map((item, index) => {
      newItems[index]["checked"] = value == true ? 0 : 1; // set the new value
    });
    this.setState({
      cartItems: newItems,
      selectAll: value == true ? false : true,
    }); // set new state
  };

  deleteHandler = (index) => {
    Alert.alert(
      "Are you sure you want to delete this item from your cart?",
      "",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            let updatedCart = this.state.cartItems; /* Clone it first */
            updatedCart.splice(
              index,
              1
            ); /* Remove item from the cloned cart state */
            this.setState(updatedCart); /* Update the state */
          },
        },
      ],
      { cancelable: false }
    );
  };

  quantityHandler = (action, index) => {
    const newItems = [...this.state.cartItems]; // clone the array

    let currentQty = newItems[index]["qty"];

    if (action == "more") {
      newItems[index]["qty"] = currentQty + 1;
    } else if (action == "less") {
      newItems[index]["qty"] = currentQty > 1 ? currentQty - 1 : 1;
    }

    this.setState({ cartItems: newItems }); // set new state
  };

  subtotalPrice = () => {
    const { cartItems } = this.state;
    if (cartItems) {
      return cartItems.reduce(
        (sum, item) =>
          sum + (item.checked == 1 ? item.qty * item.salePrice : 0),
        0
      );
    }
    return 0;
  };

  render() {
    
    const styles = StyleSheet.create({
      centerElement: { justifyContent: "center", alignItems: "center" },
     
    });

    const { cartItems, cartItemsIsLoading, selectAll } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#fff",
            marginBottom: 10,
          }}
        >
          <View style={[styles.centerElement, { width: 50, height: 50 }]}>
            <Ionicons name="arrow-back-outline" size={25} color="#000" />
          </View>
          <View style={[styles.centerElement, { height: 50, left: 110, }]}>
            <Text style={{  fontSize: 18, color: "#000", fontWeight: 700 }}>My Cart</Text>
          </View>
         <View style={[styles.centerElement, { top: 17, left: 190, }]}>
         <Text style={{  fontSize: 14, color: "red", height: 60, left: 180, }}>(Remove 3)</Text>
         </View>
        </View>

        {cartItemsIsLoading ? (
          <View style={[styles.centerElement, { height: 300 }]}>
            <ActivityIndicator size="large" color="#ef5739" />
          </View>
        ) : (
          <ScrollView>
            {cartItems &&
              cartItems.map((item, i) => (
                <View
                  key={i}
                  style={{
                    flexDirection: "row",
                    backgroundColor: "#eeeeee",
                    marginBottom: 2,
                    height: 120,
                    margin: 10,
                    borderRadius: 22,
                  }}
                >
                  <View style={[styles.centerElement, { width: 60 }]}>
                    <TouchableOpacity
                      style={[styles.centerElement, { width: 32, height: 32 }]}
                      onPress={() => this.selectHandler(i, item.checked)}
                    >
                      <Ionicons
                        name={
                          item.checked == 1
                            ? "ios-checkmark-circle"
                            : "ios-checkmark-circle-outline"
                        }
                        size={25}
                        color={item.checked == 1 ? "#046db5" : "#aaaaaa"}
                      />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      flexGrow: 1,
                      flexShrink: 1,
                      alignSelf: "center",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        /*this.props.navigation.navigate('ProductDetails', {productDetails: item})*/
                      }}
                      style={{ paddingRight: 10 }}
                    >
                      <Image
                        source={{ uri: item.thumbnailImage }}
                        style={[
                          styles.centerElement,
                          { height: 70, width: 70, backgroundColor: "#eeeeee" },
                        ]}
                      />
                    </TouchableOpacity>
                    <View
                      style={{
                        flexGrow: 1,
                        flexShrink: 1,
                        alignSelf: "center",
                      }}
                    >
                      <Text numberOfLines={1} style={{ fontSize: 17, color: "#000000", fontWeight: 500, }}>
                        {item.name}
                      </Text>
                      <Text numberOfLines={1} style={{ color: "#8f8f8f" }}>
                        {item.quantity}
                      </Text>
                      <Text numberOfLines={1} style={{ color: "#046db9", fontSize: 17, fontWeight: 600}}>
                        {item.qty * item.salePrice} Frs
                      </Text>
                      <Text>{item.status}</Text>
                      <View style={{ flexDirection: 'row', borderWidth: 1, borderColor: "#8f8f8f", width: 73, left: 117, marginTop: -20, borderRadius:26,  }}>
                        <TouchableOpacity
                          onPress={() => this.quantityHandler("less", i)}
                          style={{    }}
                        >
                          <MaterialIcons
                            name="remove"
                            size={22}
                            color="#000"
                          />
                        </TouchableOpacity>
                        <Text
                          style={{
                            paddingHorizontal: 7,
                            paddingTop: 3,
                            color: "#000",
                            fontSize: 13,
                          }}
                        >
                          {item.qty}
                        </Text>
                        <TouchableOpacity
                          onPress={() => this.quantityHandler("more", i)}
                          style={{  }}
                        >
                          <MaterialIcons 
                          name="add" 
                          size={22} 
                          color="#000" />
                        </TouchableOpacity>
                      </View>
                       
                    </View>
                  </View>
                  <View style={[styles.centerElement, { width: 60 }]}>
                    <TouchableOpacity
                      style={[styles.centerElement, { width: 32, height: 32, marginTop: -100, left: 22,}]}
                      onPress={() => this.deleteHandler(i)}
                    >
                      <Ionicons name="close-circle-outline" size={25} color="gray" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
          </ScrollView>
        )}
     <View>
    
            
 
            <TextInput
              style={{ margin: 20, borderWidth: 1, borderRadius: 13,  height: 51,}}
              placeholder="   Promo Code"
              keyboardType="numeric"
            /> 
            <View  style={{ position: 'relative', top: -106,  margin: 20, left:256, width: 93, borderRadius: 43, }}>
            
            <TouchableOpacity
        onPress={() => this.deleteHandler(i)}
        style={{
            marginTop: 20,
            width: 90,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            borderRadius: 10,
            backgroundColor: '#046db5',}}>
        <Text style={{fontSize: 17, color: '#fff'}}>Apply</Text>
      </TouchableOpacity>
            </View>
           
                  </View>
        {!cartItemsIsLoading && (
          <View
            style={{
              backgroundColor: "#fff",
              borderTopWidth: 2,
              borderColor: "#f6f6f6",
              paddingVertical: 5,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <View style={[styles.centerElement, { width: 60 }]}>
                <View
                  style={[styles.centerElement, { width: 32, height: 32 }]}
                ></View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  flexGrow: 1,
                  flexShrink: 1,
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              ></View>
            </View>
        
            <View style={{ flexDirection: "row" }}>
              <View style={[styles.centerElement, { width: 60 }]}>
                <TouchableOpacity
                  style={[styles.centerElement, { width: 32, height: 32 }]}
                  onPress={() => this.selectHandlerAll(selectAll)}
                >
                  <Ionicons
                    name={
                      selectAll == true
                        ? "ios-checkmark-circle"
                        : "ios-checkmark-circle-outline"
                    }
                    size={25}
                    color={selectAll == true ? "#046db5" : "#aaaaaa"}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  flexGrow: 1,
                  flexShrink: 1,
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text>Select All</Text>
                <View
                  style={{
                    flexDirection: "row",
                    paddingRight: 20,
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "#8f8f8f" }}>SubTotal: </Text>
                  <Text>{this.subtotalPrice().toFixed(2)} Frs</Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                height: 32,
                paddingRight: 20,
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={[
                  styles.centerElement,
                  {
                    backgroundColor: "#046db5",
                    width: 100,
                    height: 25,
                    borderRadius: 5,
                   
                  },
                ]}
                onPress={() => console.log("test")}
              >
                <Text style={{ color: "#ffffff" }}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  }
}

export default CartDetail;