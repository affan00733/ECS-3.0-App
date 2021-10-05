import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity, Linking, FlatList,
  BackHandler, ToastAndroid, AppState, View,
  Alert

} from "react-native";
import Font from "react-native-vector-icons/FontAwesome5";
import { LineChart, Path } from "react-native-svg-charts";
import { Line } from "react-native-svg";
import * as shape from "d3-shape";
import Clipboard from '@react-native-community/clipboard';

import { Block, Text } from "../components";
import * as theme from "../theme";
import * as mocks from "../mocks";

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { icon } from './iconConst'
let chapname = []

class App extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      fontsLoaded: false,
      meet: "",
      chapterName: [],
      userSubject: [],
      userEmail: "",
      subOnly: [],
      validCloseWindow: false

    };
  }

 

  _handleAppStateChange = nextAppState => {
    console.log("clipboard");
    Clipboard.setString('hello world');
  };
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

  componentwillMount =async ()=> {
    await BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

  }
  componentDidMount = async () => {
    await BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

    await AppState.addEventListener("change", this._handleAppStateChange);

    console.log("icon", icon)

    this.setState({ fontsLoaded: true });
    await auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user)
        this.setState({ userEmail: user.email })
      }

    })

    console.log("EMail", this.state.userEmail);

    await firestore()
      .collection('meetlink')
      .doc("meet")
      .get()
      .then(documentSnapshot => {
        console.log('meet exists: ', documentSnapshot.exists);
        if (documentSnapshot.exists) {
          console.log('meet data: ', documentSnapshot.data());
          this.setState({ meet: documentSnapshot.data().link })

        }
        else {
        }
      });
    console.log("meet", this.state.meet);

    await firestore()
      .collection('UsersCreated')
      .doc(this.state.userEmail)
      .get()
      .then(documentSnapshot => {
        console.log('usercreated exists: ', documentSnapshot.exists);
        if (documentSnapshot.exists) {
          console.log('usercreated data: ', documentSnapshot.data());
          this.setState({ userSubject: documentSnapshot.data().chapters })

        }
        else {
        }
      });
    console.log("userSubject", this.state.userSubject);



    await firestore()
      .collection('subject')
      .onSnapshot(querySnapshot => {
        const users = [];

        querySnapshot.forEach(documentSnapshot => {
          users.push(
            documentSnapshot.data(),

            // key: documentSnapshot.id,
          );



        });
        this.setState({ chapterName: users })
        console.log("newchap", users)
      })


    // res =await  this.sta.filter(item => !arr2.includes(item));


  }
  componentWillUnmount = async()=> {
  await  BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    await  AppState.removeEventListener("change", this._handleAppStateChange);
  }
  renderChart() {
    const { chart } = this.props;
    const LineShadow = ({ line }) => (
      <Path
        d={line}
        fill="none"
        stroke={theme.colors.primary}
        strokeWidth={7}
        strokeOpacity={0.07}
      />
    );

    return (
      <Text style={{ color: 'blue' }}
      >
        Google
      </Text>
    );
  }

  renderHeader() {
    const { user } = this.props;

    return (
      <Block flex={0.22} column style={{ paddingHorizontal: 15 }}>
        <Block flex={false} row style={{ paddingVertical: 15 }}>
          <Block center>
            <Text h3 white style={{ marginRight: -(25 + 5) }}>
              ECS EDU APP
            </Text> 
          </Block>
          <TouchableOpacity
            onPress={() => {
              BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
              this.props.navigation.navigate("Profile")
            
            }}
          >
            <Image style={styles.avatar} source={user.avatar} />
          </TouchableOpacity>
        </Block>
        {/* <Block card shadow color="white" style={styles.headerChart}>
          <Block row space="between" style={{justifyContent : "center",
                alignContent : "center",
                alignItems : "center",
                alignSelf : "center",
                 paddingHorizontal: 30 }} >
            <Block flex={false} row center>
              <View 
              style={{
                flexDirection : "row",
                justifyContent : "center",
                alignContent : "center",
                alignItems : "center",
                alignSelf : "center",
                
              }}
              >
              <Font
              name={"video"}
              style={{
                paddingRight : 15
              }}
              size={32}
              color={"red"}
            />
              <Text
                style={styles.meet}
                onPress={() => Linking.openURL(this.state.meet)}
                h1>
                LIVE SESSION
                 </Text>
              
              </View>
            </Block>

          </Block>

        </Block> */}
      </Block>
    );
  }

  renderRequest(request, i,name) {
    return (
      <Block row card shadow color="white" style={styles.request}>
        <Block
          flex={0.25}
          card
          column
          color="secondary"
          style={styles.requestStatus}
        >
          <Block flex={0.25} middle center color={theme.colors.primary}>
            <Text large white style={{ textTransform: "uppercase" }}>
              {i + 1}
            </Text>
          </Block>
          <Block flex={0.7} center middle>
            <Text h2 white>
              {request.thumbnail}
            </Text>
            {/* <Font
              name={icon[i]}
              // style={imageStyles}
              size={32}
              color={"white"}
            /> */}
          </Block>
        </Block>
        <Block flex={0.75} column middle>
          <Text h3 style={{ paddingVertical: 8 }}>
            {request.sub}
          </Text>
          <Text caption semibold>
            {/* {request.age} • {request.gender} • {request.distance}km •{" "}
            {request.time}hrs */}
          </Text>
        </Block>
        <Block
          flex={0.25}
          card
          column
          color="secondary"
          style={{
            overflow: "hidden",
            height: 90
          }}
        >
          
          <Block flex={0.9} center middle>
            
            <Font
              name={name}
              // style={imageStyles}
              size={32}
              color={"white"}
            />
          </Block>
        </Block>
      </Block>
    );
  }

  handleNavigate = async (request) => {
    console.log("handleNavigate", request)
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);

    this.props.navigation.navigate("ChapPoint", {
      req: request.sub
    })


  }

  renderRequests() {
    const { requests } = this.props;
    return (
      <Block flex={0.8} column color="gray2" style={styles.requests}>
        {
          this.state.chapterName.map((r, i) => {
            this.state.subOnly.push(r.sub)
          })
        }
        <ScrollView showsVerticalScrollIndicator={false}>
          {
            this.state.chapterName.filter(x => this.state.userSubject.includes(x.sub)).map((request, i) =>
            (

              <TouchableOpacity onPress={() => this.handleNavigate(request)}
                activeOpacity={0.8}
                key={`request-${request.id}`}
              >
                {this.renderRequest(request, i,"unlock")}
              </TouchableOpacity>
            )
              // console.log("Filtered",request)
            )
          }
         
          {
            this.state.chapterName.filter(x => !this.state.userSubject.includes(x.sub)).map((request, i) =>
            (

              <TouchableOpacity onPress={() => {
                alert("Oops you have not enrolled for this subject.....Please contact ECS Academy!!!!")
              }}
                activeOpacity={0.8}
                key={`request-${request.id}`}
              >
                {this.renderRequest(request, i,"lock")}
              </TouchableOpacity>
            )
              // console.log("Filtered",request)
            )
          }
        </ScrollView>
      </Block>
    );
  }

  render() {
    if (!this.state.fontsLoaded) {
      return (
        <Block center middle>
          <Image
            style={{ width: 140, height: 140 }}
            source={require("../assets/icon.png")}
          />
        </Block>
      );
    }

    return (
      <SafeAreaView style={styles.safe}>
        {this.renderHeader()}
        {this.renderRequests()}
      </SafeAreaView>
    );
  }
}

App.defaultProps = {
  user: mocks.user,
  requests: mocks.requests,
  chart: mocks.chart
};

export default App;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: theme.colors.primary
  },
  headerChart: {
    paddingTop: 30,
    paddingBottom: 30,
    zIndex: 1
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 25 / 2,
    marginRight: 5
  },
  requests: {
    marginTop: -55,
    paddingTop: 55 + 20,
    paddingHorizontal: 15,
    zIndex: -1
  },
  requestsHeader: {
    paddingHorizontal: 20,
    paddingBottom: 15
  },
  request: {
    padding: 20,
    marginBottom: 15
  },
  requestStatus: {
    marginRight: 20,
    overflow: "hidden",
    height: 90
  },
  meet: {
    fontWeight: "bold",
    color: "red",
    // textDecorationLine: "underline"
  }
});
