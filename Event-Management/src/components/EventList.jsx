export default function EventList({ events, token, onUpdate }) {
  return (
    <div>
      {events.map((event) => (
        <div key={event._id}>
          <h3>{event.title}</h3>
          <p>{event.date} | {event.location} | {event.status}</p>
          {event.status !== 'Completed' && (
            <button onClick={() => onUpdate(event._id)}>Mark as Completed</button>
          )}
        </div>
      ))}
    </div>
  );
}
