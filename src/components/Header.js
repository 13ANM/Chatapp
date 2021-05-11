import React from 'react';
import './Header.scss';
import { FiSearch } from 'react-icons/fi';
import { auth } from '../firebase';
import { Avatar } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';

const Header = () => {
	const user = useSelector(selectUser);

	return (
		<div className='header'>
			<div className='header__logo'>Logo</div>
			<div className='header__search'>
				<input type='text' placeholder='Search channels...' />
				<button>
					<FiSearch />
				</button>
			</div>
			<div className='header__account'>
				<p>{user.displayName}</p>
				<Avatar
					src={user.photo}
					style={{
						width: '2rem',
						height: '2rem',
						cursor: 'pointer',
					}}
				/>
				<button onClick={() => auth.signOut()}>SIGN OUT</button>
			</div>
		</div>
	);
};

export default Header;
