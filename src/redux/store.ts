import { configureStore, isRejectedWithValue } from '@reduxjs/toolkit';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import session from 'redux-persist/lib/storage/session';
import { setupListeners } from '@reduxjs/toolkit/query';
import type { Middleware } from '@reduxjs/toolkit';
import counterReducer from '@/redux/counterSlice';
import activeMenuSliceReducer from '@/redux/activeMenubarSlice';
import authReducer from '@/redux/authSlice';
import orderSummaryReducer from './orderSummarySlice';
import listProductReducer from './admin/listProductSlice';

import { globalErrorHandling } from './helper';
import { emptySliceApi } from '@/api/emptySliceApi';

const persistConfig = {
	key: 'auth',
	version: 1,
	storage: session,
};

const orderSummaryPersistConfig = {
	key: 'orderSummary',
	version: 1,
	storage: session,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedOrderSummaryReducer = persistReducer(orderSummaryPersistConfig, orderSummaryReducer);

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger: Middleware = (api) => (next) => (action) => {
	// RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
	if (isRejectedWithValue(action)) {
		// use your global error handling for each api error
		globalErrorHandling(api, action);
	}

	return next(action);
};

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		auth: persistedAuthReducer,
		activeMenu: activeMenuSliceReducer,
		orderSummary: persistedOrderSummaryReducer,
		listProduct: listProductReducer,
		[emptySliceApi.reducerPath]: emptySliceApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		})
			.concat(emptySliceApi.middleware)
			.concat(rtkQueryErrorLogger),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
