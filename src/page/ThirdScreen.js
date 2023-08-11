import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import Input from '../component/Input/Input';
import CheckBoxComponent from '../component/CheckBoxComponent/CheckBoxComponent';
import ButtonBTN from '../component/Button/ButtonBTN';
import ThirdScreenValidation from '../Validation/ThirdScreenValidation';
import CustomDropDown from '../component/DropDown/CustomDropDown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {renderer} from 'react-test-renderer';

const ThirdScreen = ({route, navigation}) => {
  const {e, p, firstName, lastName, address} = route.params;

  const checkBoxError = 'Will be a checkbox input and must be selected';
  const countryCode = [{name: '+91'}, {name: '+1'}];
  const [checked, setChecked] = useState(false);
  const [inputValue, setInputValue] = useState({
    countryCode: '',
    phoneNumber: '',
  });
  const [inputValidation, setInputValidation] = useState({});
  const [displayDate, setDisplayData] = useState({});
  const [error, setError] = useState('');

  const inputHandle = (keyName, keyValue) => {
    const update = {...inputValue};
    update[keyName] = keyValue;
    setInputValue(update);
    const updateSecond = {...inputValidation};
    updateSecond[keyName] = keyValue.length.toString();
    setInputValidation(updateSecond);
  };
  useEffect(() => {
    setError(ThirdScreenValidation(inputValidation));
  }, [inputValidation]);
  console.log('==>', displayDate);
  const saveHandle = async inputValidation => {
    setError(ThirdScreenValidation(inputValidation));
    if (error?.phoneNumber == '' && checked == true) {
      try {
        const data = await AsyncStorage.setItem(
          'thirdScreen',
          JSON.stringify(inputValue),
        );
      } catch (e) {
        // error reading value
      }
    }
  };
  const saveAndNextHandle = async inputValidation => {
    setError(ThirdScreenValidation(inputValidation));

    if (error?.phoneNumber == '' && checked == true) {
      setDisplayData({
        email: JSON.stringify(e),
        pass: JSON.stringify(p),
        fullN: JSON.stringify(firstName),
        lastN: JSON.stringify(lastName),
        address: JSON.stringify(address),
        countryCode: inputValue?.countryCode,
        phoneNumber: inputValue?.phoneNumber,
      });
    }
  };
  const backHandle = () => {
    navigation.goBack();
  };
  return (
    <ScrollView style={styles.mainBody}>
      <CustomDropDown
        label={'Country Code'}
        countries={countryCode}
        onOptionClick={item => inputHandle('countryCode', item)}
      />
      <Input
        maxLength={10}
        placeholder="Phone Number"
        label="Phone Number"
        keyboardType={'numeric'}
        value={inputValue?.phoneNumber}
        onChangeText={value => {
          inputHandle('phoneNumber', value);
        }}
      />
      {error?.phoneNumber && (
        <Text style={styles.errorText}>{error?.phoneNumber}</Text>
      )}
      <CheckBoxComponent
        onPress={() => setChecked(!checked)}
        title="Selected"
        isChecked={checked}
      />
      {checked ? null : <Text style={styles.errorText}>{checkBoxError}</Text>}
      <View style={styles.btnBody}>
        <ButtonBTN btnText={'Back'} onPress={() => backHandle()} />
        <ButtonBTN
          btnText={'Save'}
          onPress={() => saveHandle(inputValidation)}
        />
        <ButtonBTN
          btnText={'Save and Display'}
          onPress={() => saveAndNextHandle(inputValidation)}
        />
      </View>
      <View>
        <Text>{displayDate?.email}</Text>
        <Text>{displayDate?.pass}</Text>
        <Text>{displayDate?.fullN}</Text>
        <Text>{displayDate?.lastN}</Text>
        <Text>{displayDate?.address}</Text>
        <Text>{displayDate?.countryCode}</Text>
        <Text>{displayDate?.phoneNumber}</Text>
      </View>
    </ScrollView>
  );
};

export default ThirdScreen;

const styles = StyleSheet.create({
  mainBody: {
    padding: 10,
  },
  btnBody: {
    flexDirection: 'row',
  },
  errorText: {
    color: 'red',
  },
});
