import React, { useState, useEffect } from 'react';
import './Sidebar.scss';
import { AiOutlinePlus } from 'react-icons/ai';
import { BiArrowFromLeft, BiArrowFromRight } from 'react-icons/bi';
import SidebarChannel from './SidebarChannel';
import db from '../firebase';
import SidebarMiniChannel from './SidebarMiniChannel';

const Sidebar = () => {
	const [expand, setExpand] = useState(true);
	const [channels, setChannels] = useState([]);

	useEffect(() => {
		db.collection('channels').onSnapshot((snapshot) =>
			setChannels(
				snapshot.docs.map((doc) => ({
					id: doc.id,
					channel: doc.data(),
				}))
			)
		);
	}, []);

	const handleAddChannel = () => {
		const channelName = prompt('Enter a new channel name');

		if (channelName) {
			db.collection('channels').add({
				channelName: channelName,
			});
		}
	};

	return (
		<>
			{expand ? (
				<div className='sidebarOpen'>
					<div className='sidebarOpen__expand'>
						<p>CHANNELS</p>
						<BiArrowFromRight onClick={() => setExpand(!expand)} />
					</div>
					<div className='sidebarOpen__channels'>
						{channels.map(({ id, channel }) => (
							<SidebarChannel
								key={id}
								id={id}
								channelName={channel.channelName}
							/>
						))}
					</div>
					<div className='sidebarOpen__addChannel' onClick={handleAddChannel}>
						<p>ADD CHANNEL</p>
					</div>
				</div>
			) : (
				<div className='sidebarClosed'>
					<div className='sidebarClosed__expand'>
						<BiArrowFromLeft onClick={() => setExpand(!expand)} />
					</div>
					<div className='sidebarClosed__channels'>
						{channels.map(({ id, channel }) => (
							<SidebarMiniChannel
								key={id}
								id={id}
								channelName={channel.channelName}
							/>
						))}
					</div>
					<div className='sidebarClosed__addChannel' onClick={handleAddChannel}>
						<AiOutlinePlus />
					</div>
				</div>
			)}
		</>
	);
};

export default Sidebar;
