import React from 'react';
import './SidebarMiniChannel.scss';
import { useDispatch } from 'react-redux';
import { setChannelInfo } from '../features/appSlice';

const SidebarMiniChannel = ({ id, channelName }) => {
	const dispatch = useDispatch();
	return (
		<div
			className='sidebarMiniChannel'
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
		</div>
	);
};

export default SidebarMiniChannel;
