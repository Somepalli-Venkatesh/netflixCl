import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import Movies from './components/NetflixAPI.jsx';
import { ClerkProvider } from '@clerk/clerk-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './components/SignUp.jsx';
import SignIn1 from './components/SignIn1.jsx';

const clerkFrontendApiKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkFrontendApiKey) {
  console.error("Clerk publishable key is missing in environment variables.");
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={clerkFrontendApiKey}>
      <App/>
    </ClerkProvider>
  </StrictMode>,
);
