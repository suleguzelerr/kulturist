// pages/events/[id].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function EventDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data: session, status } = useSession();

  const [event, setEvent] = useState(null);
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState('');
  const [messages, setMessages] = useState([]);
  const [replyingTo, setReplyingTo] = useState(null);
  const [loading, setLoading] = useState(true);

  // Etkinlik detayını çek
  useEffect(() => {
    if (id) {
      fetch(`/api/events/${id}`)
        .then(res => res.json())
        .then(data => {
          setEvent(data);
          setLoading(false);
        })
        .catch(() => {
          setFeedback('Etkinlik yüklenemedi.');
          setLoading(false);
        });
    }
  }, [id]);

  // Mesajları çek
  useEffect(() => {
    if (id) {
      fetch(`/api/events/${id}/messages`)
        .then(res => res.json())
        .then(data => setMessages(data));
    }
  }, [id]);

  const handleMessageSubmit = async (e) => {
    e.preventDefault();

    if (!session) {
      setFeedback('Mesaj göndermek için giriş yapmalısınız.');
      return;
    }

    if (!message.trim()) {
      setFeedback('Mesaj boş olamaz.');
      return;
    }

    try {
      const res = await fetch('/api/messages/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: message,
          eventId: parseInt(id),
          receiverId: replyingTo ? replyingTo.senderId : event.createdById,
          parentMessageId: replyingTo ? replyingTo.id : null,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        setMessage('');
        setFeedback('✅ Mesaj gönderildi.');
        setReplyingTo(null);

        // Mesajları yenile
        const refreshed = await fetch(`/api/events/${id}/messages`);
        setMessages(await refreshed.json());
      } else {
        setFeedback(result.error || '❌ Mesaj gönderilemedi.');
      }
    } catch (err) {
      setFeedback('Sunucu hatası. Lütfen tekrar deneyin.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center px-4">
        <div className="card text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Etkinlik Bulunamadı</h2>
          <p className="text-gray-600 mb-6">Aradığınız etkinlik mevcut değil veya silinmiş olabilir.</p>
          <Link href="/events">
            <button className="btn-primary">Etkinliklere Dön</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Event Details */}
        <div className="card mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-800">{event.title}</h1>
            <Link href="/events">
              <button className="btn-secondary">← Geri Dön</button>
            </Link>
          </div>

          {event.image && (
            <img 
              src={event.image} 
              alt={event.title}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="text-2xl mr-3">📅</span>
                <div>
                  <p className="font-medium text-gray-800">Tarih ve Saat</p>
                  <p className="text-gray-600">{new Date(event.date).toLocaleString('tr-TR')}</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-2xl mr-3">📍</span>
                <div>
                  <p className="font-medium text-gray-800">Konum</p>
                  <p className="text-gray-600">{event.location}</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              {event.category && (
                <div className="flex items-center">
                  <span className="text-2xl mr-3">🏷️</span>
                  <div>
                    <p className="font-medium text-gray-800">Kategori</p>
                    <p className="text-gray-600">{event.category}</p>
                  </div>
                </div>
              )}
              <div className="flex items-center">
                <span className="text-2xl mr-3">👤</span>
                <div>
                  <p className="font-medium text-gray-800">Organizatör</p>
                  <p className="text-gray-600">{event.createdBy?.email || 'Bilinmiyor'}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Açıklama</h3>
            <p className="text-gray-700 leading-relaxed">{event.description}</p>
          </div>
        </div>

        {/* Messages Section */}
        <div className="card">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">💬 Etkinlik Hakkında Mesajlar</h2>
          
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="text-5xl mb-4">💭</div>
              <p className="text-xl text-gray-500 mb-2">Henüz mesaj yok</p>
              <p className="text-gray-400">İlk mesajı siz gönderebilirsiniz!</p>
            </div>
          ) : (
            <div className="space-y-4 mb-8">
              {messages.map((msg) => {
                const isMe = session && msg.sender.email === session.user.email;
                return (
                  <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}> 
                    <div className={`max-w-lg w-fit ${isMe ? 'bg-blue-100 border-blue-200 ml-auto' : 'bg-gray-50 border-gray-200 mr-auto'} border rounded-2xl p-4 shadow-sm relative`}>
                      <div className="flex items-center mb-1">
                        <span className={`font-semibold text-sm ${isMe ? 'text-blue-700' : 'text-gray-800'}`}>{isMe ? 'Ben' : msg.sender.email}</span>
                        <span className="ml-2 text-xs text-gray-400">{new Date(msg.createdAt).toLocaleString("tr-TR")}</span>
                      </div>
                      {msg.parentMessageId && (
                        <div className="mb-2 p-2 bg-gray-100 border-l-4 border-blue-300 rounded">
                          <span className="text-xs text-gray-500">Cevaplanan: </span>
                          <span className="text-xs text-gray-700 italic">{messages.find(m => m.id === msg.parentMessageId)?.content?.slice(0, 60) || '...'}</span>
                        </div>
                      )}
                      <p className="text-gray-700 whitespace-pre-line">{msg.content}</p>
                      {status === 'authenticated' && !isMe && (
                        <button
                          onClick={() => {
                            setReplyingTo(msg);
                            setMessage(`@${msg.sender.email} `);
                          }}
                          className="absolute right-2 bottom-2 text-xs text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Cevapla
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Mesaj gönderme formu */}
          <div className="mt-6">
            {replyingTo && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 flex items-center justify-between">
                <div>
                  <span className="text-xs text-blue-700 font-semibold">Cevap yazılıyor: </span>
                  <span className="text-xs text-blue-900">{replyingTo.sender.email}</span>
                  <span className="ml-2 text-gray-500 text-xs italic">{replyingTo.content.slice(0, 60)}</span>
                </div>
                <button
                  onClick={() => setReplyingTo(null)}
                  className="text-xs text-blue-600 hover:text-blue-800 ml-4"
                >
                  İptal
                </button>
              </div>
            )}
            <form onSubmit={handleMessageSubmit} className="flex flex-col md:flex-row gap-3 items-end">
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Etkinlik hakkında mesaj yazın..."
                rows={2}
                className="input-field flex-1 resize-none"
              />
              <button type="submit" className="btn-primary px-6 py-2 h-fit">Mesaj Gönder</button>
            </form>
            {feedback && (
              <div className={`mt-2 p-3 rounded-lg ${feedback.includes('✅') ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-700'}`}>
                <p className="text-sm">{feedback}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
