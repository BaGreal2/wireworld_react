import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { authSelectors } from '../redux/auth';

export function AuthRequired({ children }) {
	const isAuthenticated = useSelector(authSelectors.isAuthenticated);
	return isAuthenticated ? children : <Navigate to="/login" />;
}

export function PublicOnly({ children }) {
	const isAuthenticated = useSelector(authSelectors.isAuthenticated);
	return isAuthenticated ? <Navigate to="/" /> : children;
}
