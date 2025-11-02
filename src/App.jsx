import React, { useState } from 'react';
import TicketForm from './components/TicketForm';
import TicketCard from './components/TicketCard';
import Chatbot from './components/Chatbot';

export default function App() {
  const [ticketData, setTicketData] = useState(null);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #e3f2fd, #f8f9fa)',
        padding: '20px',
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: '700px',
          width: '100%',
          background: '#ffffff',
          padding: '30px 40px',
          borderRadius: '12px',
          boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
          textAlign: 'center',
          animation: 'fadeIn 0.8s ease-in-out',
        }}
      >
        <h1
          style={{
            marginBottom: '1.5rem',
            fontSize: '1.8rem',
           color: '#3f37c9',
            fontWeight: '700',
          }}
        >
          Fixit AI Helpdesk Ticket System
        </h1>

        {/* Ticket Submission Form */}
        <TicketForm onSubmit={setTicketData} />

        {/* Display ticket details if submitted */}
        {ticketData && <TicketCard ticket={ticketData} />}

        {/* Chatbot section */}
        {ticketData && (
          <div style={{ marginTop: '2rem' }}>
            <h2
              style={{
                fontSize: '1.4rem',
                color: '#3f37c9',
                marginBottom: '1rem',
              }}
            >
              Fixit AI Chatbot
            </h2>
            <Chatbot userEmail={ticketData.user_email} />
          </div>
        )}
      </div>
    </div>
  );
}
