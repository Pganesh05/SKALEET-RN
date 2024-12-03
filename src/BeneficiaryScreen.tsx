import React, { useState } from 'react';
import {  Button, Text, Alert, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import IBAN from 'iban'
import CustomTextInput from './component/CustomTextInput';
import { addBeneficiary } from './store/reducer';

const BeneficiaryScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [iban, setIban] = useState<string>('');

  const dispatch = useDispatch();

  const handleTransaction = () => {
    if (!IBAN.isValid(iban)) {
      Alert.alert('Enter Valid beneficiary number')
      return
    }
    const BeneficiaryDetails = { firstName, lastName, iban };
    dispatch(addBeneficiary(BeneficiaryDetails))
    navigation.goBack();
  };


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center', }}
       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <CustomTextInput
          onChangeText={setFirstName}
          value={firstName}
          keyboardType="numeric"
          placeholder="First Name"
        />
        <CustomTextInput
          onChangeText={setLastName}
          value={lastName}
          placeholder="Last Name"
        />
        <CustomTextInput
          onChangeText={setIban}
          value={iban}
          placeholder="IBAN"
        />
        {iban && !IBAN.isValid(iban) && <Text style={styles.errorMsg}>invalid iban number</Text>}
        <Button title="Add Beneficiary" onPress={handleTransaction} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};


export const styles = StyleSheet.create({
  errorMsg: {
    color: 'red'
  }
})
export default BeneficiaryScreen;
