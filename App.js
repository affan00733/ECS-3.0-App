import  React , {Component}from 'react';
import { Button, View,AppState } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './screens/home'
import Login from './src/screens/LoginScreen'
import ChapPoint from './screens/chapPoint'
import Video from './screens/video'
import Profile from './screens/profile'
import LecturePoint from './screens/lecturePoint'

const Stack = createStackNavigator();
import Clipboard from '@react-native-community/clipboard';

function MyStack() {
  return (
    <Stack.Navigator headerMode="none">

      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ChapPoint" component={ChapPoint} />
      <Stack.Screen name="LecturePoint" component={LecturePoint} />
      <Stack.Screen name="Video" component={Video} />
      <Stack.Screen name="Profile" component={Profile} />



    </Stack.Navigator>
  );
}

export default class App extends Component{
  componentDidUpdate() {
    Clipboard.setString('hello world');
  }
  componentDidMount() {
    Clipboard.setString('hello world');
  }
  componentWillMount() {
    Clipboard.setString('hello world');
  }
  componentWillUpdate() {
    Clipboard.setString('hello world');
  }
  componentWillReceiveProps() {
    Clipboard.setString('hello world');

  }
  UNSAFE_componentWillMount() {
    Clipboard.setString('hello world');
  }
  UNSAFE_componentWillUpdate() {
    Clipboard.setString('hello world');
  }
  UNSAFE_componentWillReceiveProps() {
    Clipboard.setString('hello world');
  }
  componentDidMount() {
    Clipboard.setString('hello world');
    AppState.addEventListener("change", this._handleAppStateChange);

  }
  componentWillUnmount() {
    Clipboard.setString('hello world');
    AppState.removeEventListener("change", this._handleAppStateChange);
  }
  componentWillUpdate() {
    Clipboard.setString('hello world');
  }

  _handleAppStateChange = nextAppState => {
    console.log("clipboard");
    Clipboard.setString('hello world');
  };

  shouldComponentUpdate() {
    Clipboard.setString('hello world');
  }

  getSnapshotBeforeUpdate() {
    Clipboard.setString('hello world');

  }

  render() {
    Clipboard.setString('hello world');

  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
}