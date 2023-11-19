import React, { useState } from 'react';
import Select from 'react-select';

const filterOptions = [
  { value: 'level', label: 'Level' },
  { value: 'message', label: 'Message' },
  { value: 'resourceId', label: 'Resource ID' },
  { value: 'timestamp', label: 'Timestamp' },
  { value: 'traceId', label: 'Trace ID' },
  { value: 'spanId', label: 'Span ID' },
  { value: 'commit', label: 'Commit' },
  { value: 'metadata.parentResourceId', label: 'Parent Resource ID' },
];

const LogQueryForm = ({ onQuery }) => {
  const [query, setQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState(null);

  const handleQuerySubmit = async () => {
    try {
      const filters = selectedFilter ? { [selectedFilter.value]: query } : null;
      const response = await fetch('http://localhost:3000/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, filters }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch logs. Server response: ' + response.statusText);
      }

      const result = await response.json();
      console.log('Server Response:', result);

      onQuery(result);
    } catch (error) {
      console.error('Error querying logs:', error.message);
    }
  };

  return (
    <div className='LogQueryForm'>
      <h2>Log Query Interface</h2>
      <div className='query'>
        <label>
          Enter Log Query:
        </label>
          <input
            type="text"
            placeholder="Enter your log query here..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleQuerySubmit()}
          />
        
      </div>
      <div className='filter'>
        <label>
          Select Filter:
        </label>
          <Select
            className='dropdown'
            placeholder="Select filter..."
            options={filterOptions}
            onChange={(selectedOption) => setSelectedFilter(selectedOption)}
          />
       
      </div>
      <div>
        <button onClick={handleQuerySubmit}>Search</button>
      </div>
    </div>
  );
};

export default LogQueryForm;
