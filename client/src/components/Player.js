import React, { Component } from "react";
import io from "socket.io-client";
import { timer } from 'rxjs';

class Player extends Component {
    constructor() {
        super();
        this.init();
        this.socket = io();
        this.observable = timer(5000, 500);
        this.subscription = this.observable.subscribe(x => {
            if (this.player) {
                this.props.updatePlayback({ 
                    currentTime: this.player.getCurrentTime(),
                    currentState: this.player.getPlayerState(),
                    totalLength: this.player.getDuration()
                });    
            }
        });

        window['onYouTubeIframeAPIReady'] = (e) => {
            this.YT = window['YT'];
            this.player = new window['YT'].Player('player', {
                videoId: this.props.videoID,
                playerVars: { 'playsinline': 1, 'controls': 0 },
                events: {
                    'onStateChange': this.onPlayerStateChange.bind(this)
                }
            });
        };
    }

    componentDidMount () {
        this.socket.on("toggle", (currentState, conversation) => {
            console.log(`emitted toggle event in ${conversation} detected at Player.js!`);
            if (conversation === this.props.id && currentState !== this.player.getPlayerState()) {
                console.log(`new state ${currentState} and state on this page ${this.player.getPlayerState()}`);
                if (this.player.getPlayerState() === 1) {
                    // playing on this page, so pause
                    this.player.pauseVideo();
                } else if (this.player.getPlayerState() === -1 || this.player.getPlayerState() === 5 || this.player.getPlayerState() === 2) {
                    // unstarted, cued or paused on this page, so play
                    this.player.playVideo();
                }    
            } else {
                console.log("this was my own action");
            }
        });

        this.socket.on("comment", (user, time, conversation) => {
            console.log(`emitted comment by ${user} at ${time} in ${conversation} detected at Player.js!`);
            if (conversation === this.props.id) {
                this.props.updateCommentInfo({
                    user: user,
                    time: time
                });    
            }
        });
    }

    componentWillUnmount () {
        this.subscription.unsubscribe();
    }
    
    init() {
      var tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    onPlayerStateChange = (event) => {
        this.socket.emit("toggle", this.player.getPlayerState(), this.props.id);
    };

    render() {
        return (
            <div className="max-width-1024 player-container">
                <div className="embed-responsive embed-responsive-16by9" id="player"></div>
            </div>
        );
    }
}
  
export default Player;
