import React from "react";
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    Image,
    View,
    Dimensions,
    TouchableOpacity, Linking,
    TouchableWithoutFeedback,
    TouchableHighlight,
    AppState, Button,Pressable

} from "react-native";
import Font from "react-native-vector-icons/FontAwesome";
import { LineChart, Path } from "react-native-svg-charts";
import { Line } from "react-native-svg";
import * as shape from "d3-shape";
import YoutubePlayer from "react-native-youtube-iframe";
import YouTube from 'react-native-youtube'
import { Block, Text } from "../components";
import * as theme from "../theme";
import * as mocks from "../mocks";
import { YouTubeStandaloneAndroid } from 'react-native-youtube';
import Slider from '@react-native-community/slider';
import Clipboard from '@react-native-community/clipboard';

const height = Dimensions.get('window').height
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fontsLoaded: false,
            orientation: '',
            video: "",
            appState: AppState.currentState,
            playbackRate: 1,
            playingState: true

        };
    }


    loadFonts() {
        Clipboard.setString('hello world');

    }

    getOrientation = () => {
        if (this.refs.rootView) {
            if (Dimensions.get('window').width < Dimensions.get('window').height) {
                Clipboard.setString('hello world');

                this.setState({ orientation: 'portrait' });
            }
            else {
                Clipboard.setString('hello world');

                this.setState({ orientation: 'landscape' });
            }
        }
    }

    async componentDidMount() {
        AppState.addEventListener("change", this._handleAppStateChange);
        Clipboard.setString('hello world');
        await this.loadFonts();
        this.setState({ fontsLoaded: true });
        this.getOrientation();

        Dimensions.addEventListener('change', () => {
            this.getOrientation();
        });

        let vid = await this.props.route.params.vid
        this.setState({ video: vid })
        console.log("video", this.state.video)
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
            <Block flex={0.20} column style={{ paddingHorizontal: 15 }}>
                <Block flex={false} row style={{ paddingVertical: 15 }}>
                    <Block center>
                        <Text h3 white style={{ marginRight: -(25 + 5) }}>
                            Video
                        </Text>
                    </Block>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate("Profile")}
                    >
                        <Image style={styles.avatar} source={user.avatar} />
                    </TouchableOpacity>
                </Block>
            </Block>
        );
    }

    renderRequest(request) {
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
                        <Text small white style={{ textTransform: "uppercase" }}>
                            {request.priority}
                        </Text>
                    </Block>
                    <Block flex={0.7} center middle>
                        <Text h2 white>
                            {request.bloodType}
                        </Text>
                    </Block>
                </Block>
                <Block flex={0.75} column middle>
                    <Text h3 style={{ paddingVertical: 8 }}>
                        {request.name}
                    </Text>
                    <Text caption semibold>
                        {request.age} • {request.gender} • {request.distance}km •{" "}
                        {request.time}hrs
                    </Text>
                </Block>
            </Block>
        );
    }




    componentWillUnmount() {
        Clipboard.setString('hello world');

        AppState.removeEventListener("change", this._handleAppStateChange);
    }

    _handleAppStateChange = nextAppState => {
        // if (
        //   this.state.appState.match(/inactive|background/) &&
        //   nextAppState === "active"
        // ) {
        //   console.log("App has come to the foreground!");
        // }
        console.log(this.state.appState);
        Clipboard.setString('hello world');
        this.setState({ appState: nextAppState });
    };

    changePause = () => {
        this.setState({ playingState: !this.state.playingState })
    }

    renderRequests() {
        const { requests } = this.props;

        if (this.state.orientation == "portrait") {

            return (
                <Block
                    ref="rootView"
                    flex={0.8} column color="gray2" style={[styles.requests]}>

                    {/* <Pressable
                        onPress={() => {
                            // handle or ignore
                        }}
                        onLongPress={() => {
                            // handle or ignore
                        }}> */}

                        <View
                            pointerEvents="none"
                        >
                            <YoutubePlayer
                                height={height * 0.3}
                                play={this.state.playingState}
                                videoId={this.state.video}

                                onChangeState={
                                    Clipboard.setString('hello world')
                                }

                                playbackRate={this.state.playbackRate}

                            // onPlaybackRateChange={(a) => {
                            //     console.log("playback rate", a);
                            // }}

                            />
                            {/* <TouchableOpacity
                            style={{
                                top: 0,
                                height: height * 0.1,
                                width: '100%',
                                position: 'absolute',
                                // backgroundColor : "red"
                            }}
                        /> */}
                        </View>
                    {/* </Pressable> */}
                    <View>
                        <Text
                            style={{
                                fontSize: 17,
                                fontWeight: "bold",
                            }}
                        >
                            Playback Speed
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-around",
                        }}
                    >
                        <Slider
                            style={{ width: 200, height: 40 }}
                            minimumValue={0.25}
                            maximumValue={2}
                            minimumTrackTintColor="red"
                            maximumTrackTintColor="blue"
                            onValueChange={(value) => {
                                this.setState({ playbackRate: value.toFixed(2) })
                            }}
                        />
                        <Text
                            style={{
                                fontSize: 20
                            }}
                        >{this.state.playbackRate}</Text>
                    </View>
                    <View>

                        <TouchableOpacity
                            style={{
                                height: height * 0.05,
                                width: height * 0.2,
                                // borderColor: "red",
                                borderRadius: 25,
                                // borderWidth: 10,
                                justifyContent: "center",
                                alignContent: "center",
                                alignItems: "center",
                                alignSelf: "center",
                                backgroundColor: "red"

                            }}
                            onPress={() =>
                                // this.setState(({ playingState }) => ({ playingState: !playingState }))
                                this.setState(prevState => ({
                                    playingState: !prevState.playingState
                                }))

                            }
                        >
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: "bold",
                                    color: "white"
                                }}
                            >
                                Play / Pause</Text>
                        </TouchableOpacity>
                        {/* <Button title={'play'} onPress={this.changePause()} /> */}

                    </View>
                    <View>
                        <Text style={styles.land}>
                            Instructions:
                        </Text>
                        <Text style={styles.land}>
                            1. Please click on fullscreen
                        </Text>
                        <Text style={styles.land}>
                            2. Keep a calculator, notebook and required stationary with you till the end of the lecture.
                        </Text>
                        <Text style={styles.land}>
                            3. Solve the given homework problems at the end without fail. If facing any doubts, clear them in the next live session.
                        </Text>
                    </View>

                </Block>


            );
        }
        else {
            return (
                <Block
                    ref="rootView"
                    flex={0.8} column color="gray2" style={[styles.requests]}>
                    <View
                    // style={{marginTop : -220,paddingTop : 10}}
                    >
                        <YoutubePlayer
                            height={height * 0.3}
                            // play={true}
                            videoId={this.state.video}
                        // fullscreen
                        />
                    </View>
                    <View
                        style={{
                            height: height,
                            width: "130%",
                            backgroundColor: "rgba(255, 255, 255, 0.3)",
                            marginBottom: 100,
                            marginTop: 20,
                            position: "absolute",
                            // top : "10px"
                        }}
                    >

                    </View>
                    <View>
                        <Text style={styles.land}>
                            Please be in portrait mode to access the player
                        </Text>
                    </View>

                </Block>);
        }


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
            <SafeAreaView
                style={styles.safe}
                onStartShouldSetResponder={() => {
                    console.log('You click by View')
                    Clipboard.setString('hello world');
                }}
                onResponderGrant={() => Clipboard.setString('hello world')}
                onResponderRelease={() => Clipboard.setString('hello world')}
                onTouchStart={() => Clipboard.setString('hello world')}
                onTouchMove={() => {
                    console.log('You click by View3')
                    Clipboard.setString('hello world');
                }}
                onTouchE={() => {
                    console.log('You click by View4')
                    Clipboard.setString('hello world');
                }}
                onTouchCancel={() => {
                    console.log('You click by View5')
                    Clipboard.setString('hello world');
                }}
                onTouchEnd={() => {
                    console.log('You click by View6')
                    Clipboard.setString('hello world');
                }}



            >
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
        paddingTop: 35 + 20,
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
    land: {
        fontSize: 20,
        fontWeight: "bold",
        paddingBottom: 5
    }
});





