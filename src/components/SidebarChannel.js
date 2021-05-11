import React from 'react';
import './SidebarChannel.scss';
import { useDispatch } from 'react-redux';
import { setChannelInfo } from '../features/appSlice';

const SidebarChannel = ({ id, channelName }) => {
	const dispatch = useDispatch();
	return (
		<div
			className='sidebarChannel'
			onClick={() =>
				dispatch(
					setChannelInfo({
						channelId: id,
						channelName: channelName,
					})
				)
			}
		>
			<span>#</span>
			<h4>{channelName}</h4>
		</div>
	);
};

export default SidebarChannel;
