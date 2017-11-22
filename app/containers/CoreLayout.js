import React from 'react';
import { Root, Container } from 'native-base';
import NavigationRouter from './NavigationRouter';
import { StatusBar } from 'react-native';

const RootContainer = (props) => (
  <Root>
    <Container style={{ flex: 1 }}>
      <StatusBar backgroundColor="#046cb4" barStyle="light-content" />
      <NavigationRouter />
    </Container>
  </Root>
);

export default RootContainer;
