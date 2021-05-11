import React, { useState, useEffect } from 'react';
import './Chat.scss';
import { AiFillInfoCircle } from 'react-icons/ai';
import { RiUserSmileLine } from 'react-icons/ri';
import { MdEdit } from 'react-icons/md';
import { IoMdUnlock } from 'react-icons/io';
import { FaUserEdit, FaUserPlus } from 'react-icons/fa';
import Message from './Message';
import { useSelector } from 'react-redux';
import { selectChannelId, selectChannelName } from '../features/appSlice';
import { selectUser } from '../features/userSlice';
import db from '../firebase';
import firebase from 'firebase';

const Chat = () => {
	const user = useSelector(selectUser);
	const channelId = useSelector(selectChannelId);
	const channelName = useSelector(selectChannelName);
	const [input, setInput] = useState('');
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		if (channelId) {
			db.collection('channels')
				.doc(channelId)
				.collection('messages')
				.orderBy('timestamp', 'desc')
				.onSnapshot((snapshot) =>
					setMessages(snapshot.docs.map((doc) => doc.data()))
				);
		}
	}, [channelId]);

	const sendMessage = (e) => {
		e.preventDefault();
		db.collection('channels').doc(channelId).collection('messages').add({
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
			message: input,
			user: user,
		});
		setInput('');
	};

	const showError = (e) => {
		e.preventDefault();
		alert('Message cannot be blank');
	};

	return (
		<div className='chat'>
			<div className='chat__info'>
				<div className='chat__channel'>
					<p>
						<span>#</span>
						{channelName}
					</p>
				</div>
				<div className='chat__channelOptions'>
					<IoMdUnlock />
					<MdEdit />
					<AiFillInfoCircle />
				</div>
			</div>
			<div className='chat__messages'>
				{messages.map((message) => (
					<Message
						timestamp={message.timestamp}
						message={message.message}
						user={message.user}
					/>
				))}
			</div>
			<div className='chat__options'>
				<form className='chat__optionsMessage'>
					<input
						value={input}
						disabled={!channelId}
						onChange={(e) => setInput(e.target.value)}
						placeholder={`Send a message in # ${channelName}`}
					/>
					<button
						onClick={input ? sendMessage : showError}
						disabled={!channelId}
						type='submit'
					>
						<RiUserSmileLine />
					</button>
				</form>
				<div className='chat__optionsInfo'>
					<FaUserPlus />
					<FaUserEdit />
				</div>
			</div>
		</div>
	);
};

export default Chat;
