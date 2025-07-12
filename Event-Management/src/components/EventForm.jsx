import { useState } from 'react';
import { addEvent } from '../api';

export default function EventForm({ token, onAdd }) {
  const [form, setForm] = useState({
    title: '',
    date: '',
    location: '',
    status: 'Pending',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await addEvent(form, token);
    const newEvent = await res.json();
    onAdd(newEvent);
    setForm({ title: '', date: '', location: '', status: 'Pending' });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
      />
      <input
        type="date" // 📅 Calendar input
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        required
      />
      <input
        placeholder="Location"
        value={form.location}
        onChange={(e) => setForm({ ...form, location: e.target.value })}
        required
      />
      <select
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
      >
        <option>Pending</option>
        <option>Progress</option>
        <option>Completed</option>
      </select>
      <button type="submit">Add Event</button>
    </form>
  );
}
