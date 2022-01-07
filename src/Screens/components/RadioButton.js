import React from 'react';
import {Text, View} from 'react-native';
import {RadioButton} from 'react-native-paper';

export const RadioButtonComponent = (value, text) => {
  const [checked, setChecked] = React.useState('first');
  return (
    <View>
      <Text style={{display: 'flex', flexDirection: 'row'}}>Select Gender</Text>
      <Text style={{display: 'flex', flexDirection: 'row'}}>Male</Text>
      <RadioButton
        value="first"
        status={checked === 'first' ? 'checked' : 'unchecked'}
        onPress={() => setChecked('first')}
        style={{display: 'flex', flexDirection: 'row'}}
      />
      <Text style={{display: 'flex', flexDirection: 'row'}}>Female</Text>
      <RadioButton
        value="second"
        status={checked === 'second' ? 'checked' : 'unchecked'}
        onPress={() => setChecked('second')}
      />
     
    </View>
  );
};
