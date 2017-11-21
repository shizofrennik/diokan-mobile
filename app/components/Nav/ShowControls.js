import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {toggleShowControls} from '../../store/sessions';
import {mainColor} from '../../assets/styles/variables';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class ShowControls extends Component {
  constructor() {
    super();
    this.state = {
      show: false
    }
  }

  render() {
    return (
      <View>
        <TouchableHighlight style={{paddingHorizontal: 15}} underlayColor={mainColor} onPress={() => this.props.toggleShowControls()}>
          <Icon name="ellipsis-v" color="white" size={22} />
        </TouchableHighlight>
        {this.state.show && 
        <View style={{width: 35, height: 35, backgroundColor: "red", position: "absolute", bottom: -40, right: 0}}>
          <Text>1</Text>
        </View>}
      </View>
    )
  }
}

const mapStateToProps = (state, props) => {
  return ({
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    toggleShowControls
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowControls)
