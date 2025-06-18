// pages/admin/events.js

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function AdminEventPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Yükleme bitince admin değilse yönlendir
    if (status !== 'loading' && (!session || session.user.role !== 'admin')) {
      router.replace('/');
    }
  }, [session, status, router]);

  useEffect(() => {
    // Yalnızca adminler için veriyi çek
    const fetchEvents = async () => {
      try {
        const res = await fetch('/api/events');
        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error('Etkinlikler yüklenirken hata:', error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.role === 'admin') {
      fetchEvents();
    } else {
      setLoading(false);
    }
  }, [session]);

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!session || session.user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center px-4">
        <div className="card text-center">
          <div className="text-6xl mb-4">🚫</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Erişim Reddedildi</h2>
          <p className="text-gray-600 mb-6">Bu sayfaya yalnızca admin kullanıcılar erişebilir.</p>
          <Link href="/">
            <button className="btn-primary">Ana Sayfaya Dön</button>
          </Link>
        </div>
      </div>
    );
  }

  const handleApprove = async (id) => {
    try {
      await fetch('/api/events/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const res = await fetch('/api/events');
      const data = await res.json();
      setEvents(data);
    } catch (error) {
      console.error('Onaylama hatası:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Bu etkinliği silmek istediğinizden emin misiniz?')) {
      return;
    }
    
    try {
      await fetch('/api/events/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const res = await fetch('/api/events');
      const data = await res.json();
      setEvents(data);
    } catch (error) {
      console.error('Silme hatası:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="card">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">🎭 Admin Etkinlik Kontrol Paneli</h1>
              <p className="text-gray-600">Tüm etkinlikleri yönetin ve onaylayın</p>
            </div>
            <Link href="/admin/dashboard">
              <button className="btn-secondary">← Dashboard'a Dön</button>
            </Link>
          </div>

          {events.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📭</div>
              <p className="text-xl text-gray-500">Henüz etkinlik yok</p>
            </div>
          ) : (
            <div className="space-y-6">
              {events.map((event) => (
                <div key={event.id} className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{event.title}</h3>
                      <p className="text-gray-600 mb-3 line-clamp-2">{event.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center">
                          <span className="mr-2">📅</span>
                          {new Date(event.date).toLocaleString('tr-TR')}
                        </div>
                        <div className="flex items-center">
                          <span className="mr-2">📍</span>
                          {event.location}
                        </div>
                        {event.category && (
                          <div className="flex items-center">
                            <span className="mr-2">🏷️</span>
                            {event.category}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          event.status === 'approved' ? 'bg-green-100 text-green-800' :
                          event.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {event.status === 'approved' ? 'Onaylandı' :
                           event.status === 'pending' ? 'Beklemede' : 'Reddedildi'}
                        </span>
                        <span className="ml-4 text-sm text-gray-500">
                          Oluşturan: {event.createdBy?.email || 'Bilinmiyor'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    {event.status !== 'approved' && (
                      <button 
                        onClick={() => handleApprove(event.id)}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                      >
                        ✅ Onayla
                      </button>
                    )}
                    <button 
                      onClick={() => handleDelete(event.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
                    >
                      🗑️ Sil
                    </button>
                    <Link href={`/events/${event.id}`}>
                      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium">
                        👁️ Görüntüle
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
