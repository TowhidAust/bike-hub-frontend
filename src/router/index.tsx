import { Spin } from 'antd';
import { lazy, Suspense } from 'react';
import {
	Route,
	BrowserRouter as Router,
	Routes,
	Navigate,
} from 'react-router-dom';
import { PRIVATE_ROUTE, PUBLIC_ROUTE } from './appRoutes';
import PrivateOutlet from './PrivateOutlet';

const LandingPage = lazy(() => import('@/features/LandingPage'));
const UsedBikes = lazy(() => import('@/pages/UsedBikes/UsedBikesPage'));
const UsedBikeDetails = lazy(
	() => import('@/pages/UsedBikes/UsedBikeDetailsPage'),
);
const SignupPage = lazy(() => import('@/pages/Signup/SignupPage'));
const DashboardPage = lazy(() => import('@/pages/Dashboard/DashboardPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFound/NotFoundPage'));
export default function AppRoutes() {
	const publicRoutes = [
		{
			path: PUBLIC_ROUTE.SIGNUP,
			component: SignupPage,
		},

		{
			path: PUBLIC_ROUTE.LANDING,
			component: LandingPage,
		},
		{
			path: PUBLIC_ROUTE.USED_BIKES,
			component: UsedBikes,
		},
		{
			path: PUBLIC_ROUTE.USED_BIKE_DETAILS_ID,
			component: UsedBikeDetails,
		},
	];
	return (
		<Suspense fallback={<Spin />}>
			<Router>
				<Routes>
					{publicRoutes.map((route) => (
						<Route
							key={Math.random()}
							path={route.path}
							element={<route.component />}
						/>
					))}

					<Route element={<PrivateOutlet />}>
						<Route path="/*" element={<DashboardPage />} />
						<Route
							path="/"
							element={<Navigate replace to={PRIVATE_ROUTE.HOME} />}
						/>
					</Route>
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</Router>
		</Suspense>
	);
}
