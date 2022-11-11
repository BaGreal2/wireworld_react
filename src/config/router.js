import { lazy } from 'react';
import { urls } from '../constants/urls';

import * as AuthGate from './AuthGate';

const HomeView = lazy(() => import('../views/HomeView'));
const AboutView = lazy(() => import('../views/AboutView'));
const LoginView = lazy(() => import('../views/LoginView'));
const RegisterView = lazy(() => import('../views/RegisterView'));
const SchemaListView = lazy(() => import('../views/SchemaListView'));
const UploadView = lazy(() => import('../views/UploadView'));
const UserSchemaView = lazy(() => import('../views/UserSchemaView'));

export const routes = [
	{
		key: 'home',
		path: urls.home,
		exact: true,
		element: <HomeView />,
	},
	{
		key: 'about',
		path: urls.about,
		exact: true,
		element: <AboutView />,
	},
	{
		key: 'login',
		path: urls.login,
		exact: true,
		element: (
			<AuthGate.PublicOnly>
				<LoginView />
			</AuthGate.PublicOnly>
		),
	},
	{
		key: 'register',
		path: urls.register,
		exact: true,
		element: (
			<AuthGate.PublicOnly>
				<RegisterView />
			</AuthGate.PublicOnly>
		),
	},
	{
		key: 'schemas',
		path: urls.schemas,
		exact: true,
		element: (
			<AuthGate.AuthRequired>
				<SchemaListView />
			</AuthGate.AuthRequired>
		),
	},
	{
		key: 'upload',
		path: urls.upload,
		exact: true,
		element: (
			<AuthGate.AuthRequired>
				<UploadView />
			</AuthGate.AuthRequired>
		),
	},
	{
		key: 'user_schema',
		path: urls.schemas + '/:id',
		exact: false,
		element: (
			<AuthGate.AuthRequired>
				<UserSchemaView />
			</AuthGate.AuthRequired>
		),
	},
];
