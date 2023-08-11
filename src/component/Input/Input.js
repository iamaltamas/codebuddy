import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

const Input = ({
  label,
  maxLength,
  secureTextEntry,
  placeholder,
  value,
  onChangeText,
  keyboardType,
}) => {
  return (
    <View>
      <Text style={styles.labelStyle}>{label}</Text>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        style={styles.inputStyle}
        value={value}
        onChangeText={onChangeText}
        maxLength={maxLength}
        keyboardType={keyboardType}
      />
    </View>
  );
};

export default Input;
const styles = StyleSheet.create({
  inputStyle: {
    color: '#000',
    fontSize: 18,
    lineHeight: 23,
    borderColor: '#000',
    borderWidth: 1,
  },
  labelStyle: {
    fontSize: 18,
    color: '#000',
    padding: 10,
  },
});
