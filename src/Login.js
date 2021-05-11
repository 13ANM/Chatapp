import React from 'react';
import './Login.scss';
import { auth, provider } from './firebase';

const Login = () => {
	const signIn = () => {
		auth.signInWithPopup(provider).catch((error) => alert(error.message));
	};

	return (
		<div className='login'>
			<div className='login__logo'>Logo</div>
			<button onClick={signIn}>SIGN IN</button>
		</div>
	);
};

export default Login;
