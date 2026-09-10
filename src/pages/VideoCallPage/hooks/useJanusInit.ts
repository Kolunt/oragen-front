//@ts-nocheck
import { useEffect, useMemo, useState } from 'react';
import Janus from '../libs/janus';
import { useNavigate } from 'react-router-dom';
import { randomString } from '../../../utils/randomString';
import { getDateString } from '../../../utils/getDateString';
import { randomNumber } from '../../../utils/randomNumber';
import { ITextСhatParticipants } from '../VideoCallPage';
import { ROUTES, TextChatInstructions } from '../../../enums';
import { useVideoCallStore } from 'store/useVideoCallStore';

let janusScreenVideo = null;
let janusRoom = null;
const iceServers = null;
let videoRoomHandler = null;
const opaqueId = 'janusRoom-' + randomString(12);
let myusername = null;
let myid = null;
let mystream = null;
// We use this other ID just to map our subscriptions to us
let mypvtid = null;
let localTracks = {},
  localVideos = 0;
let feeds = [],
  feedStreams = {};
let bitrateTimer = [];

// publishOwnFeed()
let doSimulcast = false;
let doSvc = null;
let acodec = false;
let vcodec = false;
let doDtx = false;
let subscriberMode = false;
let use_msid = false;
let publishers = [];

// textchat
var participants = {};
var participantsData = [];
let transactions = {};
let textRoomHandler = null;

// screensharing
let screentest = null;
let capture = null;
let role = null;
let room = null;
let source = null;
let screenVideoId = randomNumber(16);

export interface IChatMessages {
  user: string;
  message: string;
}

export interface ITextСhatParticipants {
  username: string;
  display: string;
}

export const useJanusInit = (
  init: boolean,
  me: any,
  setMe: any,
  setUsers: any,
  server: string,
  myroom?: number,
  username: string,
  token: string,
  pin: string,
  setIsRegister: (isRegister: boolean) => void,
  setUsername: (username: string) => void,
  myScreenVideo: any,
  setMyScreenVideo: any,
  setNumberNewMessages: (numberNewMessages: number) => void,
  textChatParticipants: ITextСhatParticipants[],
  setTextChatParticipants: (newValue: ITextСhatParticipants[]) => void,
  limitParticipants?: number,
  checkCallOwner: boolean
) => {
  const [chatMessages, setChatMessages] = useState<IChatMessages[]>([]);
  const [ready, setReady] = useState(false);
  const typeVideoCall = useVideoCallStore((state) => state.type);
  const navigate = useNavigate();

  useEffect(() => {
    if (init) {
      Janus.init({
        debug: 'all',
        callback: function () {
          // Create session
          janusRoom = new Janus({
            server: server,
            iceServers: iceServers,
            token: token,
            success: function () {
              // Attach to VideoRoom plugin
              janusRoom.attach({
                plugin: 'janus.plugin.videoroom',
                opaqueId: opaqueId,
                success: function (pluginHandle) {
                  videoRoomHandler = pluginHandle;
                },
                error: function (error) {
                  Janus.error('  -- Error attaching plugin...', error);
                  alert('Error attaching plugin... ' + error);
                },
                consentDialog: function (on) {
                  Janus.debug(
                    'Consent dialog should be ' + (on ? 'on' : 'off') + ' now'
                  );
                },
                iceState: function (state) {
                  Janus.log('ICE state changed to ' + state);
                },
                mediaState: function (medium, on, mid) {},
                webrtcState: function (on) {
                  Janus.log(
                    'Janus says our WebRTC PeerConnection is ' +
                      (on ? 'up' : 'down') +
                      ' now'
                  );
                },
                slowLink: function (uplink, lost, mid) {
                  Janus.warn(
                    'Janus reports problems ' +
                      (uplink ? 'sending' : 'receiving') +
                      ' packets on mid ' +
                      mid +
                      ' (' +
                      lost +
                      ' lost packets)'
                  );
                },
                onmessage: function (msg, jsep) {
                  Janus.debug(' ::: Got a message (publisher) :::', msg);
                  let event = msg['videoroom'];
                  Janus.debug('Event: ' + event);
                  if (event) {
                    if (event === 'joined') {
                      // Publisher/manager created, negotiate WebRTC and attach to existing feeds, if any
                      myid = msg['id'];
                      mypvtid = msg['private_id'];
                      Janus.log(
                        'Successfully joined room ' +
                          msg['room'] +
                          ' with ID ' +
                          myid
                      );
                      if (subscriberMode) {
                      } else {
                        publishOwnFeed(true);
                      }
                      // Any new feed to attach to?
                      if (msg['publishers']) {
                        let list = msg['publishers'];

                        // if (list.length >= limitParticipants) {
                        //   destroyVideoCall();
                        //   setError(
                        //     'Превышено максимальное количество участников !!!'
                        //   );
                        // }

                        Janus.debug(
                          'Got a list of available publishers/feeds:',
                          list
                        );
                        for (let f in list) {
                          if (list[f]['dummy']) continue;
                          let id = list[f]['id'];
                          let streams = list[f]['streams'];
                          let display = list[f]['display'];
                          for (let i in streams) {
                            let stream = streams[i];
                            stream['id'] = id;
                            stream['display'] = display;
                          }
                          feedStreams[id] = streams;
                          Janus.debug(
                            '  >> [' + id + '] ' + display + ':',
                            streams
                          );
                          newRemoteFeed(id, display, streams);
                        }
                      }
                    } else if (event === 'destroyed') {
                      // The room has been destroyed
                      Janus.warn('The room has been destroyed!');
                      alert('The room has been destroyed', function () {
                        window.location.reload();
                      });
                    } else if (event === 'event') {
                      // Any info on our streams or a new feed to attach to?
                      if (msg['streams']) {
                        let streams = msg['streams'];
                        for (let i in streams) {
                          let stream = streams[i];
                          stream['id'] = myid;
                          stream['display'] = myusername;
                        }
                        feedStreams[myid] = streams;
                      } else if (msg['publishers']) {
                        let list = msg['publishers'];
                        Janus.debug(
                          'Got a list of available publishers/feeds:',
                          list
                        );
                        for (let f in list) {
                          if (list[f]['dummy']) continue;
                          let id = list[f]['id'];
                          let display = list[f]['display'];
                          let streams = list[f]['streams'];
                          for (let i in streams) {
                            let stream = streams[i];
                            stream['id'] = id;
                            stream['display'] = display;
                          }
                          feedStreams[id] = streams;
                          Janus.debug(
                            '  >> [' + id + '] ' + display + ':',
                            streams
                          );
                          newRemoteFeed(id, display, streams);
                        }
                      } else if (msg['leaving']) {
                        // One of the publishers has gone away?
                        let leaving = msg['leaving'];
                        Janus.log('Publisher left: ' + leaving);
                        let remoteFeed = null;
                        for (let i = 1; i < limitParticipants; i++) {
                          if (feeds[i] && feeds[i].rfid == leaving) {
                            remoteFeed = feeds[i];
                            break;
                          }
                        }
                        if (remoteFeed) {
                          Janus.debug(
                            'Feed ' +
                              remoteFeed.rfid +
                              ' (' +
                              remoteFeed.rfdisplay +
                              ') has left the room, detaching'
                          );
                          removeUser(remoteFeed.rfindex);
                          feeds[remoteFeed.rfindex] = null;
                          remoteFeed.detach();
                        }
                        delete feedStreams[leaving];
                      } else if (msg['unpublished']) {
                        // One of the publishers has unpublished?
                        let unpublished = msg['unpublished'];
                        Janus.log('Publisher left: ' + unpublished);
                        if (unpublished === 'ok') {
                          // That's us
                          videoRoomHandler.hangup();
                          return;
                        }
                        let remoteFeed = null;
                        for (let i = 1; i < limitParticipants; i++) {
                          if (feeds[i] && feeds[i].rfid == unpublished) {
                            remoteFeed = feeds[i];
                            break;
                          }
                        }
                        if (remoteFeed) {
                          Janus.debug(
                            'Feed ' +
                              remoteFeed.rfid +
                              ' (' +
                              remoteFeed.rfdisplay +
                              ') has left the room, detaching'
                          );
                          removeUser(remoteFeed.rfindex);
                          feeds[remoteFeed.rfindex] = null;
                          remoteFeed.detach();
                        }
                        delete feedStreams[unpublished];
                      } else if (msg['error']) {
                        if (msg['error_code'] === 426) {
                          // This is a "no such room" error: give a more meaningful description
                          alert(
                            '<p>Apparently room <code>' +
                              myroom +
                              '</code> (the one this demo uses as a test room) ' +
                              'does not exist...</p><p>Do you have an updated <code>janusRoom.plugin.janusRoom.jcfg</code> ' +
                              'configuration file? If not, make sure you copy the details of room <code>' +
                              myroom +
                              '</code> ' +
                              'from that sample in your current configuration file, then restart Janus and try again.'
                          );
                        } else {
                          alert(msg['error']);
                        }
                      }
                    }
                  }
                  if (jsep) {
                    Janus.debug('Handling SDP as well...', jsep);
                    videoRoomHandler.handleRemoteJsep({ jsep: jsep });
                    // Check if any of the media we wanted to publish has
                    // been rejected (e.g., wrong or unsupported codec)
                    let audio = msg['audio_codec'];
                    if (
                      mystream &&
                      mystream.getAudioTracks() &&
                      mystream.getAudioTracks().length > 0 &&
                      !audio
                    ) {
                      // Audio has been rejected
                      toastr.warning(
                        "Our audio stream has been rejected, viewers won't hear us"
                      );
                    }
                    let video = msg['video_codec'];
                    if (
                      mystream &&
                      mystream.getVideoTracks() &&
                      mystream.getVideoTracks().length > 0 &&
                      !video
                    ) {
                      // Video has been rejected
                      toastr.warning(
                        "Our video stream has been rejected, viewers won't see us"
                      );
                      // Hide the webcam video
                    }
                  }
                },
                onlocaltrack: function (track, on) {
                  Janus.debug(
                    'Local track ' + (on ? 'added' : 'removed') + ':',
                    track
                  );
                  // We use the track ID as name of the element, but it may contain invalid characters
                  let trackId = track.id.replace(/[{}]/g, '');
                  if (!on) {
                    // Track removed, get rid of the stream and the rendering
                    let stream = localTracks[trackId];
                    if (stream) {
                      try {
                        let tracks = stream.getTracks();
                        for (let i in tracks) {
                          let mst = tracks[i];
                          if (mst !== null && mst !== undefined) mst.stop();
                        }
                      } catch (e) {}
                    }
                    if (track.kind === 'video') {
                      localVideos--;
                      if (localVideos === 0) {
                        // No video, at least for now: show a placeholder
                      }
                    }
                    delete localTracks[trackId];
                    return;
                  }
                  // If we're here, a new track was added
                  let stream = localTracks[trackId];
                  if (stream) {
                    // We've been here already
                    return;
                  }

                  if (track.kind === 'audio') {
                    // We ignore local audio tracks, they'd generate echo anyway
                    if (localVideos === 0) {
                      // No video, at least for now: show a placeholder
                    }
                  } else {
                    // New video track: create a stream out of it
                    localVideos++;
                    stream = new MediaStream([track]);
                    localTracks[trackId] = stream;
                    // Janus.attachMediaStream(myVideo.current, stream);
                    addMeVideoTrack(stream);
                  }
                  if (
                    videoRoomHandler.webrtcStuff.pc.iceConnectionState !==
                      'completed' &&
                    videoRoomHandler.webrtcStuff.pc.iceConnectionState !==
                      'connected'
                  ) {
                  }
                },
                onremotetrack: function (track, mid, on) {
                  // The publisher stream is sendonly, we don't expect anything here
                },
                oncleanup: function () {
                  Janus.log(
                    ' ::: Got a cleanup notification: we are unpublished now :::'
                  );
                  mystream = null;
                  delete feedStreams[myid];
                  localTracks = {};
                  localVideos = 0;
                },
              });
              janusRoom.attach({
                plugin: 'janus.plugin.textroom',
                opaqueId: opaqueId,
                success: function (pluginHandle) {
                  textRoomHandler = pluginHandle;
                  Janus.log(
                    'Plugin attached! (' +
                      textRoomHandler.getPlugin() +
                      ', id=' +
                      textRoomHandler.getId() +
                      ')'
                  );
                  // Setup the DataChannel
                  let body = { request: 'setup' };
                  Janus.debug('Sending message:', body);
                  textRoomHandler.send({ message: body });
                },
                error: function (error) {
                  console.error('  -- Error attaching plugin...', error);
                  alert('Error attaching plugin... ' + error);
                },
                iceState: function (state) {
                  Janus.log('ICE state changed to ' + state);
                },
                mediaState: function (medium, on) {
                  Janus.log(
                    'Janus ' +
                      (on ? 'started' : 'stopped') +
                      ' receiving our ' +
                      medium
                  );
                },
                webrtcState: function (on) {
                  setReady(!!on);
                  Janus.log(
                    'Janus says our WebRTC PeerConnection is ' +
                      (on ? 'up' : 'down') +
                      ' now'
                  );
                },
                onmessage: function (msg, jsep) {
                  Janus.debug(' ::: Got a message :::', msg);
                  if (msg['error']) {
                    alert(msg['error']);
                  }
                  if (jsep) {
                    // Answer
                    textRoomHandler.createAnswer({
                      jsep: jsep,
                      // We only use datachannels
                      tracks: [{ type: 'data' }],
                      success: function (jsep) {
                        Janus.debug('Got SDP!', jsep);
                        let body = { request: 'ack' };
                        textRoomHandler.send({ message: body, jsep: jsep });
                      },
                      error: function (error) {
                        Janus.error('WebRTC error:', error);
                        alert('WebRTC error... ' + error.message);
                      },
                    });
                  }
                },
                // eslint-disable-next-line no-unused-vars
                ondataopen: function (label, protocol) {
                  Janus.log('The DataChannel is available!');
                  // Prompt for a display name to join the default room
                },
                ondata: function (data) {
                  // Janus.debug('We got data from the DataChannel!', data);
                  let json = JSON.parse(data);
                  let transaction = json['transaction'];
                  if (transactions[transaction]) {
                    // Someone was waiting for this
                    transactions[transaction](json);
                    delete transactions[transaction];
                    return;
                  }
                  let what = json['textroom'];
                  if (what === 'message') {
                    // Incoming message: public or private?
                    let msg = json['text'];
                    let from = json['from'];
                    let dateString = getDateString(json['date']);
                    let whisper = json['whisper'];
                    if (whisper === true) {
                      // Private message
                    } else {
                      // Public message
                    }
                    setChatMessages((prev) => [
                      ...prev,
                      {
                        user: from,
                        message: msg,
                      },
                    ]);
                    if (
                      !msg.includes(
                        TextChatInstructions.OPEN_GENERAL_FULL_SCREEN
                      ) &&
                      !msg.includes(
                        TextChatInstructions.CLOSE_GENERAL_FULL_SCREEN
                      )
                    ) {
                      setNumberNewMessages((prev) => prev + 1);
                    }
                  } else if (what === 'announcement') {
                    // Room announcement
                    let msg = json['text'];
                    let dateString = getDateString(json['date']);
                  } else if (what === 'join') {
                    // Somebody joined
                    let username = json['username'];
                    let display = json['display'];
                    participants[username] = display ? display : username;
                  } else if (what === 'leave') {
                    // Somebody left
                    let username = json['username'];
                    delete participants[username];
                  } else if (what === 'kicked') {
                    // Somebody was kicked
                    let username = json['username'];
                    delete participants[username];
                    if (username === myid) {
                      alert('You have been kicked from the room', function () {
                        window.location.reload();
                      });
                    }
                  } else if (what === 'destroyed') {
                    if (json['room'] !== myroom) return;
                    // Room was destroyed, goodbye!
                    Janus.warn('The room has been destroyed!');
                    alert('The room has been destroyed', function () {
                      window.location.reload();
                    });
                  }
                },
                oncleanup: function () {
                  Janus.log(' ::: Got a cleanup notification :::');
                },
              });
            },
          });
        },
      });
    }
  }, [init]);

  // Создание объекта me
  function publishOwnFeed(useAudio) {
    console.log(
      '%c!!!!!!!!!!',
      'color: green; font-size: 50px; font-weight: bold'
    );
    console.log('useAudio', useAudio);
    setMe((prev) => ({
      ...prev,
      id: screenVideoId,
      videoRoomHandler: videoRoomHandler,
      textRoomHandler: textRoomHandler,
      sound: false,
      video: true,
      // video: false,
    }));

    let tracks = [];
    if (useAudio) tracks.push({ type: 'audio', capture: true, recv: false });

    tracks.push({
      type: 'video',
      capture: true,
      recv: false,
      // We may need to enable simulcast or SVC on the video track
      simulcast: doSimulcast,
      // We only support SVC for VP9 and (still WIP) AV1
      svc: (vcodec === 'vp9' || vcodec === 'av1') && doSvc ? doSvc : null,
    });

    videoRoomHandler.createOffer({
      tracks: tracks,
      customizeSdp: function (jsep) {
        // If DTX is enabled, munge the SDP
        if (doDtx) {
          jsep.sdp = jsep.sdp.replace(
            'useinbandfec=1',
            'useinbandfec=1;usedtx=1'
          );
        }
      },
      success: function (jsep) {
        // Janus.debug('Got publisher SDP!', jsep);
        let publish = { request: 'configure', audio: useAudio, video: true };
        // let publish = { request: 'configure', audio: useAudio, video: false };
        if (acodec) publish['audiocodec'] = acodec;
        if (vcodec) publish['videocodec'] = vcodec;
        videoRoomHandler.send({ message: publish, jsep: jsep });
      },
      error: function (error) {
        console.log(
          '%c!!!!!!!!!!',
          'color: green; font-size: 50px; font-weight: bold'
        );
        // Janus.error('WebRTC error:', error);
        if (useAudio) {
          publishOwnFeed(false);
        } else {
          // alert('WebRTC error... ' + error.message);
        }
      },
    });
  }

  // Добавление видеотрека в объект me
  const addMeVideoTrack = (stream) => {
    setMe((prev) => ({ ...prev, videoTrack: stream }));
  };

  // Добавление аудиотрека в объект user
  const addAudioTrack = (id, stream) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, audioTrack: stream } : user
      )
    );
  };

  // Добавление видеотрека в объект user
  const addVideoTrack = (id, stream) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, videoTrack: stream } : user
      )
    );
  };

  // Добавление handler в объект user
  const addVideoRoomHandler = (id, videoRoomHandler) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, videoRoomHandler: videoRoomHandler } : user
      )
    );
  };

  // Добавление outHandleId в объект user
  const addOutHandleId = (id: string, value: number) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, outHandleId: value } : user
      )
    );
  };

  // Создание объекта user
  function newRemoteFeed(id, display, streams) {
    // A new feed has been published, create a new plugin handle and attach to it as a subscriber
    let remoteFeed = null;
    if (!streams) {
      streams = feedStreams[id];
    }

    let screenSharing = false;
    if (streams.length === 1 && streams[0].type === 'video') {
      screenSharing = true;
    }

    let user = {
      id,
      display: display,
      outHandleId: 99,
      audioTrack: '',
      videoTrack: '',
      handler: '',
      mute: true,
      video: true,
      isScreenSharing: screenSharing,
    };
    setUsers((prev) => [...prev, user]);

    janusRoom.attach({
      plugin: 'janus.plugin.videoroom',
      opaqueId: opaqueId,
      success: function (pluginHandle) {
        remoteFeed = pluginHandle;
        remoteFeed.remoteTracks = {};
        remoteFeed.remoteVideos = 0;
        remoteFeed.simulcastStarted = false;
        remoteFeed.svcStarted = false;
        let subscription = [];
        for (let i in streams) {
          let stream = streams[i];
          // If the publisher is VP8/VP9 and this is an older Safari, let's avoid video
          if (
            stream.type === 'video' &&
            Janus.webRTCAdapter.browserDetails.browser === 'safari' &&
            (stream.codec === 'vp9' ||
              (stream.codec === 'vp8' && !Janus.safariVp8))
          ) {
            toastr.warning(
              'Publisher is using ' +
                stream.codec.toUpperCase +
                ", but Safari doesn't support it: disabling video stream #" +
                stream.mindex
            );
            continue;
          }
          subscription.push({
            feed: stream.id, // This is mandatory
            mid: stream.mid, // This is optional (all streams, if missing)
          });
          // FIXME Right now, this is always the same feed: in the future, it won't
          remoteFeed.rfid = stream.id;
          // remoteFeed.rfdisplay = escapeXmlTags(stream.display);
          remoteFeed.rfdisplay = stream.display;
        }
        // We wait for the plugin to send us an offer
        let subscribe = {
          request: 'join',
          room: myroom,
          ptype: 'subscriber',
          streams: subscription,
          use_msid: use_msid,
          private_id: mypvtid,
          pin: pin,
        };
        remoteFeed.send({ message: subscribe });
      },
      error: function (error) {
        Janus.error('  -- Error attaching plugin...', error);
        alert('Error attaching plugin... ' + error);
      },
      iceState: function (state) {},
      webrtcState: function (on) {},
      slowLink: function (uplink, lost, mid) {
        Janus.warn(
          'Janus reports problems ' +
            (uplink ? 'sending' : 'receiving') +
            ' packets on mid ' +
            mid +
            ' (' +
            lost +
            ' lost packets)'
        );
      },
      onmessage: function (msg, jsep) {
        Janus.debug(' ::: Got a message (subscriber) :::', msg);
        let event = msg['videoroom'];
        Janus.debug('Event: ' + event);
        if (msg['error']) {
          alert(msg['error']);
        } else if (event) {
          if (event === 'attached') {
            // Subscriber created and attached
            for (let i = 1; i < limitParticipants; i++) {
              if (!feeds[i]) {
                feeds[i] = remoteFeed;
                remoteFeed.rfindex = i;
                addOutHandleId(user.id, remoteFeed.rfindex);
                addVideoRoomHandler(user.id, remoteFeed);
                break;
              }
            }
            Janus.log('Successfully attached to feed in room ' + msg['room']);
          } else if (event === 'event') {
            // Check if we got a simulcast-related event from this publisher
            let substream = msg['substream'];
            let temporal = msg['temporal'];
            if (
              (substream !== null && substream !== undefined) ||
              (temporal !== null && temporal !== undefined)
            ) {
              if (!remoteFeed.simulcastStarted) {
                remoteFeed.simulcastStarted = true;
                // Add some new buttons
                addSimulcastSvcButtons(remoteFeed.rfindex, true);
              }
              // We just received notice that there's been a switch, update the buttons
              updateSimulcastSvcButtons(
                remoteFeed.rfindex,
                substream,
                temporal
              );
            }
            // Or maybe SVC?
            let spatial = msg['spatial_layer'];
            temporal = msg['temporal_layer'];
            if (
              (spatial !== null && spatial !== undefined) ||
              (temporal !== null && temporal !== undefined)
            ) {
              if (!remoteFeed.svcStarted) {
                remoteFeed.svcStarted = true;
                // Add some new buttons
                addSimulcastSvcButtons(remoteFeed.rfindex, true);
              }
              // We just received notice that there's been a switch, update the buttons
              updateSimulcastSvcButtons(remoteFeed.rfindex, spatial, temporal);
            }
          } else {
            // What has just happened?
          }
        }
        if (jsep) {
          let stereo = jsep.sdp.indexOf('stereo=1') !== -1;
          // Answer and attach
          remoteFeed.createAnswer({
            jsep: jsep,
            tracks: [{ type: 'data' }],
            customizeSdp: function (jsep) {
              if (stereo && jsep.sdp.indexOf('stereo=1') == -1) {
                // Make sure that our offer contains stereo too
                jsep.sdp = jsep.sdp.replace(
                  'useinbandfec=1',
                  'useinbandfec=1;stereo=1'
                );
              }
            },
            success: function (jsep) {
              let body = { request: 'start', room: myroom };
              remoteFeed.send({ message: body, jsep: jsep });
            },
            error: function (error) {
              alert('WebRTC error... ' + error.message);
            },
          });
        }
      },
      // eslint-disable-next-line no-unused-vars
      onlocaltrack: function (track, on) {
        // The subscriber stream is recvonly, we don't expect anything here
      },
      onremotetrack: function (track, mid, on, metadata) {
        if (!on) {
          // Track removed, get rid of the stream and the rendering
          if (track.kind === 'video') {
            remoteFeed.remoteVideos--;
          }
          delete remoteFeed.remoteTracks[mid];
          return;
        }

        if (track.kind === 'audio') {
          // New audio track: create a stream out of it, and use a hidden <audio> element
          let stream = new MediaStream([track]);
          addAudioTrack(user.id, stream);
        } else {
          // New video track: create a stream out of it
          remoteFeed.remoteVideos++;
          let stream = new MediaStream([track]);
          addVideoTrack(user.id, stream);
        }
      },
      oncleanup: function () {
        if (bitrateTimer[remoteFeed.rfindex])
          clearInterval(bitrateTimer[remoteFeed.rfindex]);
        bitrateTimer[remoteFeed.rfindex] = null;
        remoteFeed.simulcastStarted = false;
        remoteFeed.remoteTracks = {};
        remoteFeed.remoteVideos = 0;
      },
    });
  }

  // Удаление объекта user
  const removeUser = (id: number) => {
    // const currentUser = users.find((user) => user.id === id);
    // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', currentUser);
    // kickUser({ id: userId, participantId: 2 });
    setUsers((prev) => prev.filter((user) => user.outHandleId !== id));
  };

  // Регистрация комнаты видео
  const registerVideoRoom = (value: boolean) => {
    subscriberMode = value;

    if (username.trim().length || subscriberMode) {
      let register = {
        request: 'join',
        room: myroom,
        ptype: 'publisher',
        display: username,
        pin: pin,
      };
      myusername = username;
      videoRoomHandler.send({ message: register });

      registerTextRoom();
      setIsRegister(true);
      setMe((prev) => ({ ...prev, display: username }));
      setUsername('');
    }
  };

  // Регистрация комнаты текстовый чат
  const registerTextRoom = () => {
    let register = {
      textroom: 'join',
      transaction: randomString(12),
      room: myroom,
      username: randomString(12),
      display: username,
      pin: pin,
    };

    textRoomHandler.data({
      text: JSON.stringify(register),
      error: function (reason) {
        alert(reason);
      },
    });
  };

  // Отправить сообщение в текстовый чат
  const sendData = (newMessage: string) => {
    let message = {
      textroom: 'message',
      transaction: randomString(12),
      room: myroom,
      text: newMessage,
    };

    textRoomHandler.data({
      text: JSON.stringify(message),
      error(reason) {
        console.log(reason);
      },
      success() {},
    });
  };

  // Завершить трансляцию
  async function destroyVideoCall() {
    await janusRoom.destroy();
    // await me.handler.session.destroy();
    setIsRegister(false);
    setUsers([]);
    navigate(
      typeVideoCall === 'remoteVisit' ? ROUTES.CONTACTS_INFO : ROUTES.EVENTS
    );
    navigate(0);
  }

  ///////////////////// ScreenSharing  //////////////////////////////

  // Транслировать свой экран
  function shareScreen() {
    janusScreenVideo = new Janus({
      server: server,
      iceServers: iceServers,
      token: token,
      success: function () {
        // Attach to VideoRoom plugin
        janusScreenVideo.attach({
          plugin: 'janus.plugin.videoroom',
          opaqueId: opaqueId,
          success: function (pluginHandle) {
            screentest = pluginHandle;
            shareScreenStart();
            Janus.log(
              'Plugin attached! (' +
                screentest.getPlugin() +
                ', id=' +
                screentest.getId() +
                ')'
            );
            // Prepare the username registration
          },
          error: function (error) {
            Janus.error('  -- Error attaching plugin...', error);
            alert('Error attaching plugin... ' + error);
          },
          consentDialog: function (on) {
            Janus.debug(
              'Consent dialog should be ' + (on ? 'on' : 'off') + ' now'
            );
            if (on) {
              // Darken screen
            } else {
              // Restore screen
            }
          },
          iceState: function (state) {
            Janus.log('ICE state changed to ' + state);
          },
          mediaState: function (medium, on, mid) {
            Janus.log(
              'Janus ' +
                (on ? 'started' : 'stopped') +
                ' receiving our ' +
                medium +
                ' (mid=' +
                mid +
                ')'
            );
          },
          webrtcState: function (on) {
            Janus.log(
              'Janus says our WebRTC PeerConnection is ' +
                (on ? 'up' : 'down') +
                ' now'
            );
            if (on) {
              // show roomId
              // alert(
              //   'Your screen sharing session just started: pass the <b>' +
              //     room +
              //     '</b> session identifier to those who want to attend.'
              // );
            } else {
              alert('Your screen sharing session just stopped.', function () {
                janusRoom.destroy();
                window.location.reload();
              });
            }
          },
          slowLink: function (uplink, lost, mid) {
            Janus.warn(
              'Janus reports problems ' +
                (uplink ? 'sending' : 'receiving') +
                ' packets on mid ' +
                mid +
                ' (' +
                lost +
                ' lost packets)'
            );
          },
          onmessage: function (msg, jsep) {
            Janus.debug(' ::: Got a message (publisher) :::', msg);
            let event = msg['videoroom'];
            Janus.debug('Event: ' + event);
            if (event) {
              if (event === 'joined') {
                myid = msg['id'];
                Janus.log(
                  'Successfully joined room ' + msg['room'] + ' with ID ' + myid
                );
                if (role === 'publisher') {
                  // This is our session, publish our stream
                  Janus.debug(
                    'Negotiating WebRTC stream for our screen (capture ' +
                      capture +
                      ')'
                  );
                  // Safari expects a user gesture to share the screen: see issue #2455
                  if (Janus.webRTCAdapter.browserDetails.browser === 'safari') {
                    alert(
                      'Safari requires a user gesture before the screen can be shared: close this dialog to do that. See issue #2455 for more details',
                      function () {
                        screentest.createOffer({
                          // We want to capture the screen and audio, but sendonly
                          tracks: [
                            { type: 'audio', capture: true, recv: false },
                            {
                              type: 'screen',
                              capture: true,
                              recv: false,
                            },
                          ],
                          success: function (jsep) {
                            Janus.debug('Got publisher SDP!', jsep);
                            let publish = {
                              request: 'configure',
                              audio: true,
                              video: true,
                            };
                            screentest.send({
                              message: publish,
                              jsep: jsep,
                            });
                          },
                          error: function (error) {
                            Janus.error('WebRTC error:', error);
                            alert('WebRTC error... ' + error.message);
                          },
                        });
                      }
                    );
                  } else {
                    // Other browsers should be fine, we try to call getDisplayMedia directly
                    screentest.createOffer({
                      // We want sendonly audio and screensharing
                      tracks: [
                        //concealed sending audio to screen broadcasts
                        // { type: 'audio', capture: true, recv: false },
                        { type: 'screen', capture: true, recv: false },
                      ],
                      success: function (jsep) {
                        Janus.debug('Got publisher SDP!', jsep);
                        let publish = {
                          request: 'configure',
                          audio: true,
                          video: true,
                        };
                        screentest.send({ message: publish, jsep: jsep });
                      },
                      error: function (error) {
                        Janus.error('WebRTC error:', error);
                        alert('WebRTC error... ' + error.message);
                      },
                    });
                  }
                } else {
                  // We're just watching a session, any feed to attach to?
                  if (msg['publishers']) {
                    let list = msg['publishers'];
                    Janus.debug(
                      'Got a list of available publishers/feeds:',
                      list
                    );
                    for (let f in list) {
                      if (list[f]['dummy']) continue;
                      let id = list[f]['id'];
                      let display = list[f]['display'];
                      Janus.debug('  >> [' + id + '] ' + display);
                    }
                  }
                }
              } else if (event === 'event') {
                // Any feed to attach to?
                if (role === 'listener' && msg['publishers']) {
                  let list = msg['publishers'];
                  Janus.debug(
                    'Got a list of available publishers/feeds:',
                    list
                  );
                  for (let f in list) {
                    if (list[f]['dummy']) continue;
                    let id = list[f]['id'];
                    let display = list[f]['display'];
                    Janus.debug('  >> [' + id + '] ' + display);
                  }
                } else if (msg['leaving']) {
                  // One of the publishers has gone away?
                  let leaving = msg['leaving'];
                  Janus.log('Publisher left: ' + leaving);
                  if (role === 'listener' && msg['leaving'] === source) {
                    alert(
                      'The screen sharing session is over, the publisher left',
                      function () {
                        window.location.reload();
                      }
                    );
                  }
                } else if (msg['error']) {
                  alert(msg['error']);
                }
              }
            }
            if (jsep) {
              Janus.debug('Handling SDP as well...', jsep);
              screentest.handleRemoteJsep({ jsep: jsep });
            }
          },
          onlocaltrack: function (track, on) {
            Janus.debug(
              'Local track ' + (on ? 'added' : 'removed') + ':',
              track
            );
            // We use the track ID as name of the element, but it may contain invalid characters
            let trackId = track.id.replace(/[{}]/g, '');
            if (!on) {
              // Track removed, get rid of the stream and the rendering
              let stream = localTracks[trackId];
              if (stream) {
                try {
                  let tracks = stream.getTracks();
                  for (let i in tracks) {
                    let mst = tracks[i];
                    if (mst) mst.stop();
                  }
                } catch (e) {}
              }
              if (track.kind === 'video') {
                localVideos--;
                if (localVideos === 0) {
                  // No video, at least for now: show a placeholder
                }
              }
              delete localTracks[trackId];
              return;
            }
            // If we're here, a new track was added
            let stream = localTracks[trackId];
            if (stream) {
              // We've been here already
              return;
            }
            if (track.kind === 'audio') {
              // We ignore local audio tracks, they'd generate echo anyway
              if (localVideos === 0) {
                // No video, at least for now: show a placeholder
              }
            } else {
              // New video track: create a stream out of it
              localVideos++;
              let stream = new MediaStream([track]);
              localTracks[trackId] = stream;
              Janus.log('Created local stream:', stream);
              addMyScreenVideoVideoTrack(stream);
            }
            if (
              screentest.webrtcStuff.pc.iceConnectionState !== 'completed' &&
              screentest.webrtcStuff.pc.iceConnectionState !== 'connected'
            ) {
            }
          },
          // eslint-disable-next-line no-unused-vars
          onremotetrack: function (track, mid, on) {
            // The publisher stream is sendonly, we don't expect anything here
          },
          oncleanup: function () {
            Janus.log(' ::: Got a cleanup notification :::');
            localTracks = {};
            localVideos = 0;
          },
        });
      },
    });
  }

  function shareScreenStart() {
    capture = 'screen';

    // Create a new room
    role = 'publisher';

    myusername = `Screen sharing: ${me.display}`;

    let register = {
      request: 'join',
      room: myroom,
      ptype: 'publisher',
      display: myusername,
      pin: pin,
    };
    screentest.send({ message: register });

    setMyScreenVideo((prev) => ({
      ...prev,
      videoRoomHandler: screentest,
      video: true,
    }));
  }

  // Добавление видеотрека в объект myScreenVideo
  const addMyScreenVideoVideoTrack = (stream) => {
    setMyScreenVideo((prev) => ({ ...prev, videoTrack: stream }));
  };

  const toggleScreenDisplay = async () => {
    if (myScreenVideo.video) {
      await destroyMyScreenVideo();
      setMyScreenVideo((prev) => ({ ...prev, video: false }));
    } else {
      await shareScreen();
      setMyScreenVideo((prev) => ({ ...prev, video: true }));
    }
  };

  // Завершить трансляцию своего экрана
  const destroyMyScreenVideo = async () => {
    janusScreenVideo.destroy();
  };

  // Проверка на количество участников в textRoom
  const getTextRoomParticipants = () => {
    const data = {
      request: 'listparticipants',
      room: myroom,
    };

    textRoomHandler.send({
      message: data,
      success: function (result) {
        // let list = [...textChatParticipants,...result.participants]
        setTextChatParticipants((prev) => [...prev, ...result.participants]);
        console.log(result);
      },
    });
  };

  // Проверка на количество участников в videoRoom
  const getVideoRoomParticipants = () => {
    const data = {
      request: 'listparticipants',
      room: myroom,
      // request: 'list',
    };

    videoRoomHandler.send({
      message: data,
      success: function (result) {
        console.log(result);
      },
    });
  };

  useEffect(() => {
    if (chatMessages.length) {
      getTextRoomParticipants();
    }
  }, [chatMessages]);

  useEffect(() => {
    if (ready) {
      registerVideoRoom(false);
    }
  }, [ready]);

  // Тестовая функция
  const printUsers = () => {
    console.log(users);
  };

  return {
    ready,
    chatMessages,
    registerVideoRoom,
    sendData,
    destroyVideoCall,
    toggleScreenDisplay,
    getNumberUsers: getTextRoomParticipants,
    getVideoRoomParticipants,
  };
};
