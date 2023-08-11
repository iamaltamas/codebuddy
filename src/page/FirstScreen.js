import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Input from '../component/Input/Input';
import ButtonBTN from '../component/Button/ButtonBTN';
import Validation from '../Validation/FirstScreenValidation';
import AsyncStorage from '@react-native-async-storage/async-storage';
const LoginPage = ({navigation}) => {
  const [error, setError] = useState('');
  const [inputState, setInputState] = useState({
    email: '',
    password: '',
  });
  useEffect(() => {
    setError(Validation(inputState));
  }, [inputState]);
  const inputHandle = (keyName, keyValue) => {
    const update = {...inputState};
    update[keyName] = keyValue;
    setInputState(update);
  };

  const saveHandle = async () => {
    const data = await AsyncStorage.setItem(
      'firstScreen',
      JSON.stringify(inputState),
    );
  };

  const saveAndNextHandle = async values => {
    setError(Validation(values));
    if (error?.email == '' && error?.password == '') {
      navigation.navigate('secondScreen', {
        email: inputState?.email,
        pass: inputState?.password,
      });
    }
  };

  return (
    <View style={styles.mainBody}>
      <Input
        placeholder={'Email'}
        label="Email"
        value={inputState.email}
        onChangeText={value => {
          inputHandle('email', value);
        }}
      />
      {error?.email && <Text style={styles.errorText}>{error?.email}</Text>}
      <Input
        placeholder={'Password'}
        label="Password"
        secureTextEntry
        value={inputState.password}
        onChangeText={value => {
          inputHandle('password', value);
        }}
      />
      {error?.password && (
        <Text style={styles.errorText}>{error?.password}</Text>
      )}
      <View style={styles.btnBody}>
        <ButtonBTN btnText={'Save'} onPress={() => saveHandle(inputState)} />
        <ButtonBTN
          btnText={'Save and Next'}
          onPress={() => saveAndNextHandle(inputState)}
        />
      </View>
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  mainBody: {
    padding: 10,
  },
  errorText: {
    color: 'red',
  },
  btnBody: {
    flexDirection: 'row',
  },
});
