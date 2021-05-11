import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.scss';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import { selectUser, login, logout } from './features/userSlice';
import { auth } from './firebase';
import Login from './Login';

function App() {
	const dispatch = useDispatch();
	const user = useSelector(selectUser);

	useEffect(() => {
		auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				dispatch(
					login({
						uid: authUser.uid,
						photo: authUser.photoURL,
						email: authUser.email,
						displayName: authUser.displayName,
					})
				);
			} else {
				dispatch(logout(logout()));
			}
		});
	}, [dispatch]);

	return (
		<div className='app'>
			{user ? (
				<>
					<div className='one'>
						<Header />
					</div>
					<div className='two'>
						<Sidebar />
						<Chat />
					</div>
				</>
			) : (
				<Login />
			)}
		</div>
	);
}

export default App;
