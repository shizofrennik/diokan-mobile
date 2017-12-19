import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import { secondaryTextColor } from '../../assets/styles/variables';
import inputsStyle from '../../assets/styles/inputs';

const InputField = ({ label, width, placeholder, customStyles, keyboardType, meta: { touched, error }, input: { onChange, ...restInput}}) => {
  return (
    
    <View style={{width}}>
      {label && <Text style={inputsStyle.label}>{label}</Text>}
      <TextInput
        underlineColorAndroid={"transparent"}
        onChangeText={onChange}
        placeholder={placeholder}
        keyboardType={keyboardType ? keyboardType : "default"}
        placeholderTextColor={secondaryTextColor}
        {...restInput}
        style={customStyles ? customStyles : inputsStyle.input} />
        {touched &&
        (error &&
        <Text style={{color: "red", bottom: 4, position: "absolute", fontSize: 12}}>
          {error}
        </Text>)}
    </View>
  );
}

export default InputField;