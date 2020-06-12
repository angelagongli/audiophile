import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Nav from "../components/Nav";
import Header from "../components/Header";
import Player from "../components/Player";
import Text from "../components/Text";
import API from "../utils/API";
import UserContext from "../utils/userContext";
import { Grid, Container } from '@material-ui/core';

function Play(props) {
    const [conversationDetails, setConversationDetails] = useState({});
    const [playback, setPlayback] = useState({});
    const [commentInfo, setCommentInfo] = useState({});
    const {id} = useParams();

    useEffect(() => {
        loadConversationDetails();
    }, []);

    const { username, userID } = useContext(UserContext);

    function loadConversationDetails() {
    API.getConversation(id)
        .then(res => {
            let track = res.data.track;
            setConversationDetails({
                videoID: track.videoID,
                title: track.title,
                channel: track.channel,
                description: track.description,
                published: track.published,
                date: track.date,
                maker: res.data.maker.username,
                joiner: res.data.joiner.username,
                makerID: res.data.maker._id,
                joinerID: res.data.joiner._id,
                metadata: res.data.metadata ? res.data.metadata : ""
            })
        })
        .catch(err => console.log(err));
    };

    function updatePlayback(playbackObject) {
        setPlayback(playbackObject);
    }

    function updateCommentInfo(commentObject) {
        setCommentInfo(commentObject);
    }

    function prettifyTime(time) {
        if (time > 3600) {
          return Math.floor(time / 3600) + ":" +
          (Math.floor(time % 3600) < 600 ? "0" : "") +
          Math.floor((time % 3600) / 60) + ":" +
          (Math.floor((time % 3600) % 60) < 10 ? "0" : "") +
          Math.floor((time % 3600) % 60);
        } else {
          return Math.floor(time / 60) + ":" +
          (Math.floor(time % 60) < 10 ? "0" : "") +
          Math.floor(time % 60);
        }
    }

    return (
        <div>
            <Nav {...props} />
            <Container>
                <Grid container>
                    <Grid item sm={12}>
                        <Header>
                            Playing Now: {conversationDetails.title} <br />
                        </Header>
                        <h2>
                            A conversation between {conversationDetails.maker} and {conversationDetails.joiner}
                        </h2>
                        <div id="notifications"></div>
                    </Grid>
                    <Grid item sm={6}>
                        <Player id={id} videoID={conversationDetails.videoID}
                            updatePlayback={updatePlayback} updateCommentInfo={updateCommentInfo} />
                        <div id="playback-info">
                            <h2>
                                Current Playback: {playback.currentState === 1 ?
                                <span style={{color: "red"}}>Playing</span> :
                                <span style={{color: "blue"}}>Paused</span>} at
                                <span style={playback.currentState === 1 ?
                                {color: "red"} : {color: "blue"}}>
                                {" " + prettifyTime(playback.currentTime)}
                                </span>
                                /{prettifyTime(playback.totalLength)}
                            </h2>
                        </div>
                    </Grid>
                    <Grid item sm={6}>
                        <Text id={id} userID={userID}
                            playback={playback} commentInfo={commentInfo} prettifyTime={prettifyTime}
                            maker={conversationDetails.maker} makerID={conversationDetails.makerID}
                            joiner={conversationDetails.joiner} joinerID={conversationDetails.joinerID} />
                    </Grid>
                </Grid>      
            </Container>
        </div>
    );
}

export default Play;
    