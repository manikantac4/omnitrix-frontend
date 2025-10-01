import React, { useState, useEffect } from 'react';

const AlarmAdmin = () => {
  const [message, setMessage] = useState('');
  const [time, setTime] = useState('');
  const [alarms, setAlarms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_BASE = 'http://localhost:5000';

  useEffect(() => {
    fetchAlarms();
    // Poll for new alarms every 5 seconds to keep list updated
    const interval = setInterval(fetchAlarms, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchAlarms = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/alarms`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setAlarms(Array.isArray(data) ? data : []);
      setError('');
      console.log('Fetched alarms:', data);
    } catch (err) {
      setError('Cannot connect to backend. Make sure server is running on port 5000.');
      console.error('Error fetching alarms:', err);
      setAlarms([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAlarm = async (e) => {
    e.preventDefault();
    
    if (!message.trim() || !time) {
      setError('Please fill in all fields');
      setTimeout(() => setError(''), 3000);
      return;
    }

    try {
      setLoading(true);
      const alarmData = {
        message: message.trim(),
        time: new Date(time).toISOString()
      };
      
      console.log('Sending alarm data:', alarmData);
      
      const response = await fetch(`${API_BASE}/alarms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(alarmData)
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Server error:', errorData);
        throw new Error(`Failed to add alarm: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('Alarm added successfully:', result);
      
      setMessage('');
      setTime('');
      setError('');
      
      // Refresh alarm list immediately
      await fetchAlarms();
      
      // Show success message
      setError('✓ Alarm added successfully!');
      setTimeout(() => setError(''), 3000);
    } catch (err) {
      setError(`Failed to add alarm: ${err.message}. Check backend connection.`);
      console.error('Error adding alarm:', err);
      setTimeout(() => setError(''), 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAlarm = async (id) => {
    if (!window.confirm('Are you sure you want to delete this alarm?')) {
      return;
    }
    
    try {
      setLoading(true);
      console.log('Deleting alarm with ID:', id);
      
      const response = await fetch(`${API_BASE}/alarms/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error(`Failed to delete: ${response.status}`);
      }
      
      console.log('Alarm deleted successfully');
      setError('');
      
      // Refresh alarm list immediately
      await fetchAlarms();
      
      // Show success message
      setError('✓ Alarm deleted successfully!');
      setTimeout(() => setError(''), 3000);
    } catch (err) {
      setError(`Failed to delete alarm: ${err.message}`);
      console.error('Error deleting alarm:', err);
      setTimeout(() => setError(''), 5000);
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="min-h-screen w-full bg-transparent flex flex-col items-center justify-start p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-4xl mx-auto space-y-8">
        
        {/* Title */}
        <h1 
          className="text-3xl sm:text-4xl md:text-5xl font-black tracking-wider text-center mb-8"
          style={{
            fontFamily: '"Orbitron", "Exo 2", monospace',
            color: '#86efac',
            textShadow: `
              0 0 20px rgba(34, 197, 94, 0.8),
              0 0 40px rgba(34, 197, 94, 0.6),
              0 0 60px rgba(34, 197, 94, 0.4)
            `,
            animation: 'titlePulse 3s ease-in-out infinite'
          }}
        >
          OMNITRIX 2025 ADMIN ALARM PANEL
        </h1>

        {/* Error Message */}
        {error && (
          <div 
            className={`border-2 rounded-xl p-4 text-center shadow-lg ${
              error.includes('✓') 
                ? 'bg-green-500/10 border-green-500/60 text-green-300' 
                : 'bg-red-500/10 border-red-500/60 text-red-300'
            }`}
            style={{
              fontFamily: '"Orbitron", monospace',
              boxShadow: error.includes('✓') 
                ? '0 0 20px rgba(34, 197, 94, 0.3)' 
                : '0 0 20px rgba(239, 68, 68, 0.3)'
            }}
          >
            {error}
          </div>
        )}

        {/* Add Alarm Form */}
        <div className="alarm-form-container">
          <h2 className="text-2xl font-black text-center mb-6 tracking-wider"
            style={{
              fontFamily: '"Orbitron", monospace',
              color: '#86efac',
              textShadow: '0 0 10px rgba(34, 197, 94, 0.6)'
            }}
          >
            Add New Alarm
          </h2>
          
          <div className="space-y-6">
            {/* Message Input */}
            <div className="flex flex-col gap-2">
              <label 
                htmlFor="message" 
                className="text-sm font-bold uppercase tracking-wide"
                style={{
                  fontFamily: '"Orbitron", monospace',
                  color: '#86efac'
                }}
              >
                Alarm Message
              </label>
              <input
                id="message"
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter alarm message..."
                disabled={loading}
                className="alarm-input"
              />
            </div>

            {/* DateTime Input */}
            <div className="flex flex-col gap-2">
              <label 
                htmlFor="datetime" 
                className="text-sm font-bold uppercase tracking-wide"
                style={{
                  fontFamily: '"Orbitron", monospace',
                  color: '#86efac'
                }}
              >
                Date & Time
              </label>
              <input
                id="datetime"
                type="datetime-local"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                disabled={loading}
                className="alarm-input"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleAddAlarm}
              disabled={loading}
              className="alarm-button w-full"
            >
              {loading ? 'Processing...' : '+ Add Alarm'}
            </button>
          </div>
        </div>

        {/* Alarms List */}
        <div className="alarm-form-container">
          <h2 className="text-2xl font-black text-center mb-6 tracking-wider"
            style={{
              fontFamily: '"Orbitron", monospace',
              color: '#86efac',
              textShadow: '0 0 10px rgba(34, 197, 94, 0.6)'
            }}
          >
            Active Alarms ({alarms.length})
          </h2>
          
          {loading && alarms.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 py-12 text-green-300/70"
              style={{ fontFamily: '"Orbitron", monospace' }}
            >
              <div className="loading-spinner"></div>
              <span>Loading alarms...</span>
            </div>
          ) : alarms.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-green-300/70"
              style={{ fontFamily: '"Orbitron", monospace' }}
            >
              <span>No alarms set. Add your first alarm above!</span>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {alarms.map((alarm) => (
                <div 
                  key={alarm._id || alarm.id} 
                  className="alarm-card"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="text-4xl" style={{ filter: 'drop-shadow(0 0 10px rgba(34, 197, 94, 0.6))' }}>
                      🔔
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-lg font-bold"
                        style={{
                          fontFamily: '"Orbitron", monospace',
                          color: '#86efac'
                        }}
                      >
                        {alarm.message}
                      </h3>
                      <p className="text-sm"
                        style={{
                          fontFamily: '"Orbitron", monospace',
                          color: 'rgba(134, 239, 172, 0.7)'
                        }}
                      >
                        📅 {formatDateTime(alarm.time)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteAlarm(alarm._id || alarm.id)}
                    disabled={loading}
                    className="delete-button"
                    title="Delete alarm"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Exo+2:wght@700;900&display=swap');

        .alarm-form-container {
          background: rgba(0, 0, 0, 0.3);
          border: 2px solid #22c55e;
          border-radius: 1rem;
          padding: 2rem;
          box-shadow: 
            0 0 20px rgba(34, 197, 94, 0.4),
            0 0 40px rgba(34, 197, 94, 0.2),
            inset 0 0 20px rgba(34, 197, 94, 0.1);
          backdrop-filter: blur(10px);
        }

        .alarm-input {
          font-family: 'Orbitron', monospace;
          background: rgba(0, 0, 0, 0.4);
          border: 2px solid #22c55e;
          border-radius: 0.5rem;
          padding: 0.875rem 1rem;
          color: #86efac;
          font-size: 1rem;
          outline: none;
          transition: all 0.3s ease;
          box-shadow: 0 0 10px rgba(34, 197, 94, 0.2);
        }

        .alarm-input::placeholder {
          color: rgba(134, 239, 172, 0.5);
        }

        .alarm-input:focus {
          border-color: #86efac;
          box-shadow: 
            0 0 20px rgba(34, 197, 94, 0.6),
            0 0 30px rgba(34, 197, 94, 0.4);
        }

        .alarm-input:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .alarm-button {
          font-family: 'Orbitron', monospace;
          font-size: 1.125rem;
          font-weight: 900;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #86efac;
          background: rgba(34, 197, 94, 0.1);
          border: 3px solid #22c55e;
          border-radius: 9999px;
          padding: 1rem 2rem;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 
            0 0 20px rgba(34, 197, 94, 0.6),
            0 0 40px rgba(34, 197, 94, 0.4);
          margin-top: 1rem;
        }

        .alarm-button:hover:not(:disabled) {
          transform: scale(1.05);
          background: rgba(34, 197, 94, 0.2);
          box-shadow: 
            0 0 30px rgba(34, 197, 94, 0.9),
            0 0 60px rgba(34, 197, 94, 0.7);
        }

        .alarm-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: scale(1);
        }

        .alarm-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(0, 0, 0, 0.4);
          border: 2px solid rgba(34, 197, 94, 0.6);
          border-radius: 0.75rem;
          padding: 1.25rem;
          transition: all 0.3s ease;
          box-shadow: 0 0 15px rgba(34, 197, 94, 0.3);
        }

        .alarm-card:hover {
          border-color: #86efac;
          box-shadow: 0 0 25px rgba(34, 197, 94, 0.6);
          transform: translateY(-2px);
        }

        .delete-button {
          font-size: 1.5rem;
          background: rgba(239, 68, 68, 0.1);
          border: 2px solid rgba(239, 68, 68, 0.6);
          border-radius: 0.5rem;
          padding: 0.5rem 0.75rem;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 0 10px rgba(239, 68, 68, 0.3);
          flex-shrink: 0;
        }

        .delete-button:hover:not(:disabled) {
          background: rgba(239, 68, 68, 0.3);
          border-color: #ef4444;
          box-shadow: 0 0 20px rgba(239, 68, 68, 0.6);
          transform: scale(1.1);
        }

        .delete-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 4px solid rgba(34, 197, 94, 0.2);
          border-top-color: #22c55e;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes titlePulse {
          0%, 100% { 
            text-shadow: 
              0 0 20px rgba(34, 197, 94, 0.8),
              0 0 40px rgba(34, 197, 94, 0.6),
              0 0 60px rgba(34, 197, 94, 0.4);
          }
          50% { 
            text-shadow: 
              0 0 30px rgba(34, 197, 94, 1),
              0 0 60px rgba(34, 197, 94, 0.8),
              0 0 90px rgba(34, 197, 94, 0.6);
          }
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 640px) {
          .alarm-form-container {
            padding: 1.25rem;
          }

          .alarm-card {
            flex-direction: column;
            gap: 1rem;
            align-items: stretch;
          }

          .delete-button {
            width: 100%;
            padding: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AlarmAdmin;