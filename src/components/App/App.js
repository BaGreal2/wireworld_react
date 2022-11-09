import MobileView from '../MobileView/MovileView';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authOperations } from '../../redux/auth';

import { routes } from '../../config/router';
import './App.css';
import '../../config/axios';

(function () {
	if (localStorage.getItem('theme') === 'theme-dark') {
		localStorage.setItem('theme', 'theme-dark');
		document.body.className = 'theme-dark';
	} else {
		localStorage.setItem('theme', 'theme-light');
		document.body.className = 'theme-light';
	}
})();

(function () {
	if (localStorage.getItem('language') === 'ukr') {
		localStorage.setItem('language', 'ukr');
		document.body.id = 'ukr';
	} else {
		localStorage.setItem('language', 'eng');
		document.body.id = 'eng';
	}
})();

export default function App() {
	const dispatch = useDispatch();
	const isMobile = window.matchMedia(
		'only screen and (max-width: 760px)'
	).matches;

	useEffect(() => {
		dispatch(authOperations.fetchUserData());
	}, [dispatch]);

	return (
		<div>
			{isMobile ? (
				<MobileView />
			) : (
				<Suspense fallback={null}>
					<Router>
						<Routes>
							{routes.map((route) => (
								<Route {...route} />
							))}
						</Routes>
					</Router>
				</Suspense>
			)}
		</div>
	);
}
