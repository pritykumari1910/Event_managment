import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEvents, updateEventStatus } from '../api';
import Navbar from '../components/Navbar';
import EventForm from '../components/EventForm';
import EventList from '../components/EventList';
import './Dashboard.css'; // Custom styles for layout and responsiveness

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const loadEvents = async () => {
      try {
        if (!token) {
          console.error('No token found, redirecting to login...');
          navigate('/login');
          return;
        }

        const res = await getEvents(token);

        if (!res.ok) {
          const errorData = await res.json();
          console.error('Failed to fetch events:', errorData);
          if (res.status === 401) {
            localStorage.removeItem('token');
            navigate('/login');
          }
          return;
        }

        const data = await res.json();
        if (Array.isArray(data)) {
          setEvents(data);
        } else {
          console.warn('Expected an array but got:', data);
          setEvents([]);
        }
      } catch (err) {
        console.error('Error fetching events:', err);
        setEvents([]);
      }
    };

    loadEvents();
  }, [navigate, token]);

  const handleAdd = (newEvent) => {
    setEvents((prev) => [...prev, newEvent]);
  };

  const handleUpdate = async (id) => {
    try {
      const res = await updateEventStatus(id, token);
      if (!res.ok) {
        console.error('Failed to update event');
        return;
      }
      const updated = await res.json();
      setEvents((prev) =>
        prev.map((e) => (e._id === id ? updated : e))
      );
    } catch (err) {
      console.error('Error updating event:', err);
    }
  };

  const filteredEvents = events.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <Navbar />
      <h1>Event Manager Dashboard</h1>

      <input
        type="text"
        className="search-input"
        placeholder="Search events by title"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="event-form-container">
        <EventForm token={token} onAdd={handleAdd} />
      </div>

      <div className="event-list">
        <EventList events={filteredEvents} token={token} onUpdate={handleUpdate} />
      </div>
    </div>
  );
}