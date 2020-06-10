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

    return (
        <div>
            <Nav {...props} />
            <Container>
                <Grid container>
                    <Grid item sm={12}>
                        <Header>
                            Playing Now: {conversationDetails.title} <br />
                            A conversation between {conversationDetails.maker} and {conversationDetails.joiner}
                        </Header>
                        <Player id={id} videoID={conversationDetails.videoID}
                            updatePlayback={updatePlayback} updateCommentInfo={updateCommentInfo} />
                        <div id="notifications"></div>
                        <Text id={id} userID={userID}
                            currentTime={playback.currentTime} commentInfo={commentInfo} 
                            maker={conversationDetails.maker} makerID={conversationDetails.makerID}
                            joiner={conversationDetails.joiner} joinerID={conversationDetails.joinerID} />
                    </Grid>
                </Grid>      
            </Container>
        </div>
    );
}

export default Play;
    