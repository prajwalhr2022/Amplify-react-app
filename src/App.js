import React from "react";
import "./App.css";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "./aws-exports";
import Quiz from "./Quiz";

// Configure Amplify
Amplify.configure(awsExports);

function App() {
  return (
    <div className="App">
      <Authenticator>
        {({ signOut, user }) => (
          <main>
            <header className="App-header">
              <h2>Welcome, {user?.username}!</h2>
              <Quiz />
              <button 
                onClick={signOut} 
                style={{ 
                  margin: "20px", 
                  fontSize: "0.8rem", 
                  padding: "5px 10px", 
                  marginTop: "20px"
                }}
              >
                Sign Out
              </button>
            </header>
          </main>
        )}
      </Authenticator>
    </div>
  );
}

// No need for withAuthenticator
export default App;
