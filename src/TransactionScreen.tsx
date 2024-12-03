import React, { useMemo, useState } from 'react';
import { View, StyleSheet, Button, Text, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import CustomTextInput from './component/CustomTextInput';
import { IBanType, addTransaction } from './store/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';

const TransactionScreen = ({ navigation }) => {
  const [amount, setAmount] = useState<string>('');
  const [openBeneficiaryName, setOpenBeneficiaryName] = useState<boolean>(false);
  const [openIBAN, setIBANOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [iban, setIban] = useState<string>('');
  const { beneficiary } = useSelector((state: RootState) => {
    return state.accountSlice
  });


  const dispatch = useDispatch()


  const handleTransaction = () => {
    if (name && iban) {
      const accountDetails = { name, iban };
      dispatch(addTransaction({ amount, accountDetails }));
      navigation.goBack();
    }
    else {
      Alert.alert('Enter Valid details')
    }
  };

  const IBAN = useMemo(() => {
    return beneficiary?.
      filter((item: IBanType) => `${item.firstName + ' ' + item.lastName}` === name).map((item: IBanType) => ({ value: item.IBan, label: item.IBan }))
  }, [name])

  return (
    <View style={styles.containerStyle}>
      <CustomTextInput
        onChangeText={setAmount}
        value={amount}
        keyboardType="numeric"
        placeholder="Enter amount"
      />
      <DropDownPicker
        open={openBeneficiaryName}
        value={name}
        items={beneficiary.map((item:IBanType) => ({ value: `${item.firstName + ' ' + item.lastName}`, label: `${item.firstName + ' ' + item.lastName}` }))}
        setOpen={setOpenBeneficiaryName}
        setValue={setName}
        ListEmptyComponent={() => <Text style={styles.emptyContainer}>{'Please Add Beneficiary Account'}</Text>}
        dropDownDirection='TOP'
        style={styles.dropDownStyle}
        containerStyle={styles.dropDownContainerStyle}
      />
      <DropDownPicker
        open={openIBAN}
        value={iban}
        items={IBAN}
        style={styles.dropDownStyle}
        setOpen={setIBANOpen}
        setValue={setIban}
        dropDownDirection='BOTTOM'
        ListEmptyComponent={() => <Text style={styles.emptyContainer}>{'Please Add Beneficiary Account'}</Text>}
        containerStyle={styles.dropDownContainerStyle}
      />
      <Button title="Submit Transaction" onPress={handleTransaction} />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  dropDownContainerStyle: { marginHorizontal: 20, width: '80%', alignSelf: 'center', borderRadius: 0, marginVertical: 8, },
  dropDownStyle: { borderRadius: 0 },
  emptyContainer: { margin: 20 }
},)

export default TransactionScreen;
