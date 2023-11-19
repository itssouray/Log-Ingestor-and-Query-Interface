import React from 'react';

const LogQueryResult = ({ result }) => {
  if (!result || result.length === 0) {
    return <p>No results found.</p>;
  }

  return (
    <div className='LogQueryResult'>
      <h2>Query Results</h2>
      <ul>
        {result.map((log) => (
          <li key={log._id}>
            <p>Level: {log.level}</p>
            <p>Message: {log.message}</p>
            <p>Timestamp: {formatTimestamp(log.timestamp)}</p>
            <p>Resource ID: {log.resourceId}</p>
            <p>Trace ID: {log.traceId}</p>
            <p>Span ID: {log.spanId}</p>
            <p>Commit: {log.commit}</p>

            {Object.keys(log.metadata).map((key) => (
              <p key={key} className='metadata'>
                {key}: {log.metadata[key]}
              </p>
            ))}

          </li>
        ))}
      </ul>
    </div>
  );
};

const formatTimestamp = (timestamp) => {
  if (timestamp instanceof Date) {
    return timestamp.toLocaleString();
  }
  return timestamp;
};

export default LogQueryResult;
