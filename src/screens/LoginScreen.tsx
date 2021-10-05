import * as React from "react";
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  View,
  StatusBar,
  ToastAndroid,
Linking,
  ActivityIndicator,
  BackHandler,
  ViewPropTypes,
  Alert
  
} from "react-native";
import Button from "../components/Button";
import FormTextInput from "../components/FormTextInput";
import imageLogo from "../assets/images/ecs.png";
import colors from "../config/colors";
import strings from "../config/strings";
import constants from "../config/constants";

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import Font from "react-native-vector-icons/FontAwesome5";
import { Block, Text } from "../../components";

// interface State {
//   email: string;
//   password: string;
//   emailTouched: boolean;
//   passwordTouched: boolean;
//   authCheck : null;
// }

class LoginScreen extends React.Component<{}, State> {
  passwordInputRef = React.createRef<FormTextInput>();

  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      emailTouched: false,
      passwordTouched: false,
      authCheck: undefined,
      authenticating: true
    }
  }
  handleBackButton = () => {
    Alert.alert(
      'Exit App',
      'Exiting the application?', [{
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      }, {
        text: 'OK',
        onPress: () => BackHandler.exitApp()
      },], {
      cancelable: false
    }
    )
    return true;


  }
  componentDidMount = async () => {
    await BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);


    await auth().onAuthStateChanged((user) => {
      if (user) {

        console.log(user.email)

        firestore()
          .collection('auth')
          .doc(user.email)
          .get()
          .then(documentSnapshot => {
            console.log('User exists: ', documentSnapshot.exists);
            if (documentSnapshot.exists) {
              console.log('User data: ', documentSnapshot.data());
              this.props.navigation.navigate('Home')

              console.log(" Signing in")
              ToastAndroid.showWithGravityAndOffset(
                " Signing in ................",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
              );

              ToastAndroid.showWithGravityAndOffset(
                ` Signing in ${user.email} ................`,
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
              );


            }
            else {
              this.setState({ authenticating: false })
            }
          });
      }
      else {
        this.setState({ authenticating: false })
      }
    });
  }
  componentWillUnmount = async () => {
    await BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }
  handleEmailChange = (email: string) => {
    this.setState({ email: email });
  };

  handlePasswordChange = (password: string) => {
    this.setState({ password: password });
  };

  handleEmailSubmitPress = () => {
    if (this.passwordInputRef.current) {
      this.passwordInputRef.current.focus();
    }
  };

  handleEmailBlur = () => {
    this.setState({ emailTouched: true });
  };

  handlePasswordBlur = () => {
    this.setState({ passwordTouched: true });
  };

  handleLoginPress = async () => {
    const { email, password, authCheck } = this.state
    console.log("Login button pressed");
    // alert(`${email} ${password}`)


    await firestore()
      .collection('auth')
      .doc(email)
      .get()
      .then(documentSnapshot => {
        console.log('User exists: ', documentSnapshot.exists);
        if (!documentSnapshot.exists) {
          console.log('User data: ', documentSnapshot.data());
          this.firebaseauthenticate()
          console.log("AAA");

        }
        else {
          alert("Alread  signed in in another device")
        }
      });
  };

  firebaseauthenticate = async () => {
    const { email, password, authCheck } = this.state
    this.setState({ authenticating: true })
    console.log("AA222A");

    await auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {

        console.log('User account signed in!');
        ToastAndroid.showWithGravityAndOffset(
          `User ${email} account signed in!`,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50
        );

        firestore()
          .collection('auth')
          .doc(email.toLowerCase())
          .set({
            email: true
          })
          .then(() => {
            console.log('User added!');
            this.props.navigation.navigate("Home")
            // alert("added and signed in")
          });


      })
      .catch(error => {


        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          ToastAndroid.showWithGravityAndOffset(
            'That email address is invalid!',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
          );
        }
        if (error.code === 'auth/user-not-found') {
          console.log('That user is not available!');
          ToastAndroid.showWithGravityAndOffset(
            'That user is not available!',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
          );
        }
        if (error.code === 'auth/wrong-password') {
          console.log('That password is incorrect!');
          ToastAndroid.showWithGravityAndOffset(
            'That password is incorrect!',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
          );
        }

        this.setState({ authenticating: false })



      });
  }

  render() {
    const {
      email,
      password,
      emailTouched,
      passwordTouched,
      authenticating
    } = this.state;
    const emailError =
      !email && emailTouched
        ? strings.EMAIL_REQUIRED
        : undefined;
    const passwordError =
      !password && passwordTouched
        ? strings.PASSWORD_REQUIRED
        : undefined;

    if (authenticating == true) {
      return (
        <View style={{
          flex: 1,
          justifyContent: "center"
        }}>
          {/* <Text>
            Loading
              </Text> */}
          <ActivityIndicator style={{
            flexDirection: "row",
            justifyContent: "space-around",
            padding: 10,

          }}

            size={72} color="red" />

        </View>
      )
    }
    else {

      return (


        <KeyboardAvoidingView
          style={styles.container}
          // On Android the keyboard behavior is handled
          // by Android itself, so we should disable it
          // by passing `undefined`.
          behavior={constants.IS_IOS ? "padding" : undefined}
        >
          <StatusBar
            barStyle="dark-content"
            backgroundColor="#FFFFFF"
          />
          <Image source={imageLogo} style={styles.logo} />
          <Block flex={false} row style={{ paddingTop: 10 }}>
            <Text title semibold style={{ paddingHorizontal: 10 }}>
              To obtain login credentials,{"\n"} WhatsApp on 
              <Text title bold
                onPress={() => Linking.openURL("whatsapp://send?phone=+919324060076")}

              > +91 93240 60076  </Text>
              <Font
                name={"whatsapp"}
                style={{
                  // margin: 15
                }}
                size={20}
                color={"green"}
              />
            </Text>
          </Block>
          <View style={styles.form}>

            <FormTextInput
              value={this.state.email}
              onChangeText={this.handleEmailChange}
              onSubmitEditing={this.handleEmailSubmitPress}
              placeholder={strings.EMAIL_PLACEHOLDER}
              autoCorrect={false}
              keyboardType="email-address"
              returnKeyType="next"
              onBlur={this.handleEmailBlur}
              error={emailError}
              // `blurOnSubmit` causes a keyboard glitch on
              // Android when we want to manually focus the
              // next input.
              blurOnSubmit={constants.IS_IOS}
            />
            <FormTextInput
              ref={this.passwordInputRef}
              value={this.state.password}
              onChangeText={this.handlePasswordChange}
              placeholder={strings.PASSWORD_PLACEHOLDER}
              secureTextEntry={true}
              returnKeyType="done"
              onBlur={this.handlePasswordBlur}
              error={passwordError}
            />
            <Button
              label={strings.LOGIN}
              onPress={this.handleLoginPress}
              disabled={!email || !password}
            />
          </View>
        </KeyboardAvoidingView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    alignItems: "center",
    justifyContent: "space-between"
  },
  logo: {
    flex: 1,
    width: "100%",
    resizeMode: "contain",
    alignSelf: "center"
  },
  form: {
    flex: 1,
    justifyContent: "center",
    width: "80%"
  }
});

export default LoginScreen;
