// src/components/AITutor.js
import React, { useState } from 'react';

const AITutor = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  const handleQuerySubmit = async (e) => {
    e.preventDefault();
    // Simulate an AI response (replace this with actual AI functionality)
    const aiResponse = await fakeAIResponse(query);
    setResponse(aiResponse);
    setQuery(''); // Clear the input after submission
  };

  // Simulate AI response for demonstration purposes
  const fakeAIResponse = (userQuery) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`AI Tutor: You asked, "${userQuery}". Here’s what I suggest...`);
      }, 1000);
    });
  };

  return (
    <div>
      <h2>AI Tutor</h2>
      <form onSubmit={handleQuerySubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask your question..."
          required
        />
        <button type="submit">Ask</button>
      </form>
      {response && <div className="ai-response">{response}</div>}
    </div>
  );
};

export default AITutor;
