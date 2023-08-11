import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, ScrollView, View} from 'react-native';
import Input from '../component/Input/Input';
import ButtonBTN from '../component/Button/ButtonBTN';
import SecondScreenValidation from '../Validation/SecondScreenValidation';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SecondScreen = ({route, navigation}) => {
  const {email, pass} = route.params;
  const [inputState, setInputState] = useState({
    emailId: JSON.stringify(email),
    password: JSON.stringify(pass),
    firstName: '',
    lastName: '',
    address: '',
  });
  const [inputValidation, setInputValidation] = useState({
    firstName: '',
    address: '',
  });
  const [error, setError] = useState('');
  useEffect(() => {
    setError(SecondScreenValidation(inputValidation));
  }, [inputValidation]);

  const inputHandle = (keyName, keyValue) => {
    const update = {...inputState};
    update[keyName] = keyValue;
    setInputState(update);
    const updateSecond = {...inputValidation};
    updateSecond[keyName] = keyValue.length.toString();
    setInputValidation(updateSecond);
  };

  const saveHandle = async () => {
    setError(SecondScreenValidation(inputValidation));

    if (error?.firstName == '' && error?.address == '') {
      try {
        const data = await AsyncStorage.setItem(
          'secondScreen',
          JSON.stringify(inputState),
        );
      } catch (e) {
        // error reading value
      }
    }
  };

  const saveAndNextHandle = async inputValidation => {
    setError(SecondScreenValidation(inputValidation));
    if (error?.firstName == '' && error?.address == '') {
      navigation.navigate('thirdScreen', {
        e: inputState?.emailId,
        p: inputState?.password,
        firstName: inputState?.firstName,
        lastName: inputState?.lastName,
        address: inputState?.address,
      });
    }
  };
  const backHandle = () => {
    navigation.goBack();
  };
  return (
    <ScrollView style={styles.mainBody}>
      <Input
        maxLength={50}
        placeholder="First Name"
        label="First Name"
        value={inputState.firstName}
        onChangeText={value => {
          inputHandle('firstName', value);
        }}
      />
      {error?.firstName && (
        <Text style={styles.errorText}>{error?.firstName}</Text>
      )}

      <Input
        placeholder="Last Name"
        label="Last Name"
        value={inputState.lastName}
        onChangeText={value => {
          inputHandle('lastName', value);
        }}
      />
      <Input
        placeholder="Address"
        label="Address"
        value={inputState.address}
        onChangeText={value => {
          inputHandle('address', value);
        }}
      />
      {error?.address && <Text style={styles.errorText}>{error?.address}</Text>}
      <View style={styles.btnBody}>
        <ButtonBTN btnText={'Back'} onPress={() => backHandle()} />
        <ButtonBTN btnText={'Save'} onPress={() => saveHandle(inputState)} />
        <ButtonBTN
          btnText={'Save and Next'}
          onPress={() => saveAndNextHandle(inputState)}
        />
      </View>
    </ScrollView>
  );
};

export default SecondScreen;

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
