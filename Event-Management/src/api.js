const API = 'http://localhost:5000/api';

export const register = (data) =>
  fetch(`${API}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

export const login = (data) =>
  fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    
  });

  

export const getEvents = (token) =>
  fetch(`${API}/events`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addEvent = (data, token) =>
  fetch(`${API}/events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });

export const updateEventStatus = (id, token) =>
  fetch(`${API}/events/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ status: 'Completed' }),
  });
