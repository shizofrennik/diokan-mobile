import React from 'react';
import { Root, Container } from 'native-base';
import NavigationRouter from './NavigationRouter';
import { StatusBar } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';

class RootContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      flash: null
    }
  }
  
  render() {
    return (
      <Root>
        <Container style={{ flex: 1 }}>
          <StatusBar backgroundColor="#046cb4" barStyle="light-content" />
          <NavigationRouter flash={this.state.flash}/>
          <DropdownAlert
            showCancel
            updateStatusBar={false}
            ref={ref => {
              if(!this.state.flash) this.setState({flash: ref})
            }} />
        </Container>
      </Root>
    )
  }
}

export default RootContainer;
