import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';

const ButtonBTN = ({onPress, btnText}) => {
  return (
    <View>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Text style={styles.title}>{btnText}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonBTN;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    backgroundColor: 'gray',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    margin: 10,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    padding: 10,
  },
});
