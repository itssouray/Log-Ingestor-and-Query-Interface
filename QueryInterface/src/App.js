import React, { useState } from 'react';
import './style.css';
import LogQueryForm from './components/LogQueryForm';
import LogQueryResult from './components/LogQueryResult';

function App() {
  const [queryResult, setQueryResult] = useState(null);

  const handleQuery = (result) => {
    setQueryResult(result);
  };

  return (
    <div className="App">
      <LogQueryForm onQuery={handleQuery} />
      {queryResult && <LogQueryResult result={queryResult} />}
    </div>
  );
}

export default App;
