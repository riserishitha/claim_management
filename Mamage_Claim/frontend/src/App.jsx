import React from 'react';
import ClaimsList from './components/ClaimsList';
import ClaimForm from './components/ClaimForm';

function App() {
  return (
    <div>
      <h1>Insurance Claims System</h1>
      <ClaimForm />
      <ClaimsList />
    </div>
  );
}

export default App;
