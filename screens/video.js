import React from 'react'
import {
    View, StyleSheet, Dimensions, TouchableOpacity, Text, ToastAndroid,
    Linking
} from 'react-native'
// import { WebView } from 'react-native-webview';
import { Images, nowTheme, articles, tabs } from '../constants';
import { Button, Select, Icon, Input, Header, Switch } from '../components';
import YouTubePlayer from "react-native-youtube-sdk";
import Font from "react-native-vector-icons/FontAwesome5";
import Slider from '@react-native-community/slider';

// import YoutubePlayer from 'react-native-youtube-iframe';
const { width, height } = Dimensions.get("screen");

type Props = {
    behind: React.Component,
    front: React.Component,
    under: React.Component
}

// Show something on top of other
export default class App extends React.Component<Props> {
    constructor(props) {
        super(props)

        this.state = {
            partL: "",
            playT: true,
            orientation: '',
            playState: "",
            duration: 0,
            currentTime : 0
        }
    }

    getOrientation = () => {
        if (this.refs.rootView) {
            if (Dimensions.get('window').width < Dimensions.get('window').height) {
                // this.pause()
                this.setState({ orientation: 'portrait' });
            }
            else {
                // this.pause()
                this.setState({ orientation: 'landscape' });
            }
        }
    }
    componentDidMount =async () => {
        this.getOrientation();
        Dimensions.addEventListener('change', () => {
            this.getOrientation();
        });
        
        this.setState({ partL: this.props.route.params.vid})
        // console.log("PARAM PART",this.props.route.params.paramName.semister.subject.chapter.part.partL)
        console.log(this.state.orientation);
    }
    pause = () => {
        this.youTubePlayer.pause()
    }
    render() {
        const { behind, front, under } = this.props
        console.log("PARAM PART", this.state.partL)
        // if (this.state.orientation == "portrait") {
        return (
            <View style={styles.container}
                ref="rootView"
            >
                <View style={styles.center}>
                    <View style={styles.behind}>
                        {behind}
                        {/* <Text>Cçcccccccccccccc</Text> */}

                        <YouTubePlayer
                            ref={ref => (this.youTubePlayer = ref)}
                            videoId={this.state.partL}
                            autoPlay={true}
                            fullscreen={false}
                            showFullScreenButton={false}
                            showSeekBar={true}
                            showPlayPauseButton={true}
                            // startTime={5}
                            style={{ width: "100%", height: "100%" }}
                            onError={e => console.log(e)}
                            onChangeState={async(e) => {
                                console.log(e)
                                const duration = await this.youTubePlayer.getVideoDuration();
                                const currentTime = await this.youTubePlayer.getCurrentTime();

                                this.setState({ duration: duration, currentTime: currentTime, playState: e.state })
                            }}
                            onChangeFullscreen={e => console.log(e)}
                        />

                       

                    </View>

                    {front}


                </View>
                
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",

                }}>
                    <TouchableOpacity style={styles.buttonPortrait} onPress={async () => {
                        const currentTime = await this.youTubePlayer.getCurrentTime();

                        


                        this.youTubePlayer.seekTo(currentTime - 10)
                    }} >
                        <Font
                            name={"backward"}
                            size={16}
                            color={"white"}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonPortrait} onPress={async () => {
                        const currentTime = await this.youTubePlayer.getCurrentTime();

                        this.youTubePlayer.seekTo(currentTime + 10)
                    }} >
                        <Font
                            name={"forward"}
                            size={16}
                            color={"white"}
                        />
                    </TouchableOpacity>
                </View>


                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",

                }}>
                    <TouchableOpacity style={styles.buttonLandscape} onPress={async () => {
                        console.log(this.state.playState);
                        if (this.state.playState == "PLAYING") {
                            this.youTubePlayer.pause()
                        }
                        else if (this.state.playState == "PAUSED") {
                            this.youTubePlayer.play()
                        }
                    }} >
                        <Font
                            name={this.state.playState == "PLAYING" ? "pause" : "play"}
                            size={16}
                            color={"white"}
                        />

                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonLandscape} onPress={async () => {
                        console.log(this.state.playState);
                        if (this.state.playState == "PLAYING") {
                            this.youTubePlayer.pause()
                        }
                        else if (this.state.playState == "PAUSED") {
                            this.youTubePlayer.play()
                        }
                    }} >
                        <Font
                            name={this.state.playState == "PLAYING" ? "pause" : "play"}
                            size={16}
                            color={"white"}
                        />

                    </TouchableOpacity>
                </View>
            </View>
        )


    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        height: 100,
        // justifyContent: 'center',
        backgroundColor: "black"
    },
    center: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    behind: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 0,
        top: 0,
        // marginTop:80,
        width: '100%',
        height: '100%',

    },
    buttonPortrait: {
        backgroundColor: "red",
        margin: 12,
        padding: 12,
        borderRadius: 4,
        bottom: height * 0.2,

    },
    buttonLandscape: {
        backgroundColor: "red",
        margin: 12,
        padding: 12,
        borderRadius: 4,
        bottom: height * 0.35,

    },


})