import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { UserProvider } from './Context/UserContext.jsx';
// import * as Sentry from '@sentry/react';
// import 'bootstrap/dist/css/bootstrap.min.css';

// Sentry.init({
// 	dsn: 'https://67595ef823cb7d09efdce406439bb843@o4507667610796032.ingest.us.sentry.io/4507740213936128',
// 	integrations: [
// 		Sentry.browserTracingIntegration(),
// 		Sentry.replayIntegration(),
// 	],
// 	// Performance Monitoring
// 	tracesSampleRate: 1.0, //  Capture 100% of the transactions
// 	// Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
// 	tracePropagationTargets: ['localhost', /^https:\/\/yourserver\.io\/api/],
// 	// Session Replay
// 	replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
// 	replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
// });

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<UserProvider>
			<App />
		</UserProvider>
	</React.StrictMode>
);
