import randomString from 'random-string';
import * as stateActions from './stateActions';
import
{
	createNewMessage
} from './reducers/helper';

export const joinRoom = (
	{ roomId, peerName, displayName, device, useSimulcast, produce }) =>
{
	return {
		type    : 'JOIN_ROOM',
		payload : { roomId, peerName, displayName, device, useSimulcast, produce }
	};
};

export const leaveRoom = () =>
{
	return {
		type : 'LEAVE_ROOM'
	};
};

export const changeDisplayName = (displayName) =>
{
	return {
		type    : 'CHANGE_DISPLAY_NAME',
		payload : { displayName }
	};
};

export const muteMic = () =>
{
	return {
		type : 'MUTE_MIC'
	};
};

export const unmuteMic = () =>
{
	return {
		type : 'UNMUTE_MIC'
	};
};

export const enableWebcam = () =>
{
	return {
		type : 'ENABLE_WEBCAM'
	};
};

export const disableWebcam = () =>
{
	return {
		type : 'DISABLE_WEBCAM'
	};
};

export const changeWebcam = (deviceId) =>
{
	return {
		type    : 'CHANGE_WEBCAM',
		payload : { deviceId }
	};
};

export const changeAudioDevice = (deviceId) =>
{
	return {
		type    : 'CHANGE_AUDIO_DEVICE',
		payload : { deviceId }
	};
};

export const enableAudioOnly = () =>
{
	return {
		type : 'ENABLE_AUDIO_ONLY'
	};
};

export const disableAudioOnly = () =>
{
	return {
		type : 'DISABLE_AUDIO_ONLY'
	};
};

export const mutePeerAudio = (peerName) =>
{
	return {
		type    : 'MUTE_PEER_AUDIO',
		payload : { peerName }
	};
};

export const unmutePeerAudio = (peerName) =>
{
	return {
		type    : 'UNMUTE_PEER_AUDIO',
		payload : { peerName }
	};
};

export const pausePeerVideo = (peerName) =>
{
	return {
		type    : 'PAUSE_PEER_VIDEO',
		payload : { peerName }
	};
};

export const resumePeerVideo = (peerName) =>
{
	return {
		type    : 'RESUME_PEER_VIDEO',
		payload : { peerName }
	};
};

export const pausePeerScreen = (peerName) =>
{
	return {
		type    : 'PAUSE_PEER_SCREEN',
		payload : { peerName }
	};
};

export const resumePeerScreen = (peerName) =>
{
	return {
		type    : 'RESUME_PEER_SCREEN',
		payload : { peerName }
	};
};

export const userLogin = () =>
{
	return {
		type : 'USER_LOGIN'
	};
};

export const userLogout = () =>
{
	return {
		type : 'USER_LOGOUT'
	};
};

export const raiseHand = () =>
{
	return {
		type : 'RAISE_HAND'
	};
};

export const lowerHand = () =>
{
	return {
		type : 'LOWER_HAND'
	};
};

export const restartIce = () =>
{
	return {
		type : 'RESTART_ICE'
	};
};

export const enableScreenSharing = () =>
{
	return {
		type : 'ENABLE_SCREEN_SHARING'
	};
};

export const disableScreenSharing = () =>
{
	return {
		type : 'DISABLE_SCREEN_SHARING'
	};
};

export const installExtension = () =>
{
	return {
		type : 'INSTALL_EXTENSION'
	};
};

export const toggleHand = (enable) =>
{
	if (enable)
		return {
			type : 'RAISE_HAND'
		};
	else
		return {
			type : 'LOWER_HAND'
		};
};

export const sendChatMessage = (text, name, picture) =>
{
	const message = createNewMessage(text, 'response', name, picture);

	return {
		type    : 'SEND_CHAT_MESSAGE',
		payload : { message }
	};
};

export const sendFile = (file, name, picture) =>
{
	return {
		type    : 'SEND_FILE',
		payload : { file, name, picture }
	};
};

export const setSelectedPeer = (selectedPeerName) =>
{
	return {
		type    : 'REQUEST_SELECTED_PEER',
		payload : { selectedPeerName }
	};
};

// This returns a redux-thunk action (a function).
export const notify = ({ type = 'info', text, timeout }) =>
{
	if (!timeout)
	{
		switch (type)
		{
			case 'info':
				timeout = 3000;
				break;
			case 'error':
				timeout = 5000;
				break;
		}
	}

	const notification =
	{
		id      : randomString({ length: 6 }).toLowerCase(),
		type    : type,
		text    : text,
		timeout : timeout
	};

	return (dispatch) =>
	{
		dispatch(stateActions.addNotification(notification));

		setTimeout(() =>
		{
			dispatch(stateActions.removeNotification(notification.id));
		}, timeout);
	};
};
