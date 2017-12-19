import React, { Component } from 'react';
import { View, Text, TextInput, DatePickerAndroid, TouchableOpacity } from 'react-native';
import inputsStyle from '../../assets/styles/inputs';
import moment from 'moment';
import DateTimePicker from 'react-native-modal-datetime-picker';

class DateField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPicker: false
    }
  }


  render() {
    let { label, input: { onChange, value }} = this.props;
    let {showPicker} = this.state;
    if(isNaN(value)) value = moment(value).format('x');
    
    return (
      <View>
        {label && <Text style={inputsStyle.label}>{label}</Text>}
        <TouchableOpacity
          style={inputsStyle.dateInput}
          onPress={() => this.setState({ showPicker: true})}>
          <Text style={inputsStyle.textField}>{value ? moment.unix(value/1000).format('DD-MMM-YYYY') : " "}</Text>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={showPicker}
          onConfirm={(date) => {
            onChange(moment(date).format());
            this.setState({ showPicker: false});
          }}
          onCancel={() => this.setState({ showPicker: false})}
        />
      </View>
    )
  }
}

export default DateField;