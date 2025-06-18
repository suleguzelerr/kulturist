// pages/events/index.js
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function EventListPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch('/api/events');
      const data = await res.json();
      setEvents(data);
    };

    fetchEvents();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Kültürel Etkinlikler</h1>
        <p className="text-gray-600">Tüm etkinlikleri keşfedin ve katılın</p>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎭</div>
          <p className="text-xl text-gray-500 mb-6">Henüz etkinlik eklenmemiş.</p>
          <Link href="/events/new">
            <button className="btn-primary">İlk Etkinliği Ekle</button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div key={event.id} className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800">{event.title}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  event.status === 'approved' ? 'bg-green-100 text-green-800' :
                  event.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {event.status === 'approved' ? 'Onaylandı' :
                   event.status === 'pending' ? 'Beklemede' : 'Reddedildi'}
                </span>
              </div>
              
              <div className="space-y-3 text-sm text-gray-600 mb-4">
                <p className="flex items-center">
                  <span className="mr-2">📅</span>
                  {new Date(event.date).toLocaleString('tr-TR')}
                </p>
                <p className="flex items-center">
                  <span className="mr-2">📍</span>
                  {event.location}
                </p>
                {event.category && (
                  <p className="flex items-center">
                    <span className="mr-2">🏷️</span>
                    {event.category}
                  </p>
                )}
              </div>
              
              <p className="text-gray-700 mb-4 line-clamp-3">{event.description}</p>
              
              {event.image && (
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              
              <Link href={`/events/${event.id}`}>
                <button className="w-full btn-primary">
                  Detayları Gör
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-12">
        <Link href="/events/new">
          <button className="btn-secondary text-lg px-8 py-4">
            ➕ Yeni Etkinlik Ekle
          </button>
        </Link>
      </div>
    </div>
  );
}
