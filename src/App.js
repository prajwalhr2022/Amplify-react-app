import React from 'react';
import './App.css';
import { Amplify } from 'aws-amplify';
import { Authenticator, withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import Quiz from './Quiz';
import ErrorBoundary from './ErrorBoundary'; // Import ErrorBoundary

Amplify.configure(awsExports);

function App() {
    return (
        <div className="App">
            <ErrorBoundary>
                <Authenticator>
                    {({ signOut, user }) => {
                        try {
                            return (
                                <main>
                                    <header className='App-header'>
                                        <Quiz />
                                        <button
                                            onClick={() => {
                                                signOut();
                                                console.log('User signed out');
                                            }}
                                            style={{
                                                margin: '20px',
                                                fontSize: '0.8rem',
                                                padding: '5px 10px',
                                                marginTop: '20px'
                                            }}
                                        >
                                            Sign Out
                                        </button>
                                        {user && <p>Logged in as: {user.username}</p>}
                                    </header>
                                </main>
                            );
                        } catch (error) {
                            console.error("Error during rendering:", error);
                            return <p>An error occurred.</p>; // Fallback UI in case of rendering error
                        }
                    }}
                </Authenticator>
            </ErrorBoundary>
        </div>
    );
}

export default withAuthenticator(App);