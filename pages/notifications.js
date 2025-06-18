// pages/notifications.js
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function NotificationsPage() {
  const { data: session, status } = useSession();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchNotifications = async () => {
    const res = await fetch("/api/notifications");
    const data = await res.json();
    setNotifications(data);
    setLoading(false);
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchNotifications();
    } else {
      setLoading(false);
    }
  }, [status]);

  const handleRead = async (id, eventId) => {
    await fetch("/api/notifications/read", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (eventId) {
      router.push(`/events/${eventId}`);
    } else {
      fetchNotifications(); // Yönlendirme yoksa sadece liste güncelle
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

  if (status !== "authenticated") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center px-4">
        <div className="card text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Giriş Gerekli</h2>
          <p className="text-gray-600 mb-6">Bildirimleri görmek için giriş yapmalısınız.</p>
          <Link href="/auth/login">
            <button className="btn-primary">Giriş Yap</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="card">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">📬 Bildirimler</h1>
            <p className="text-gray-600">Tüm bildirimlerinizi burada görebilirsiniz</p>
          </div>

          {notifications.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📭</div>
              <p className="text-xl text-gray-500 mb-2">Henüz bildiriminiz yok</p>
              <p className="text-gray-400">Yeni etkinlikler ve mesajlar geldiğinde burada görünecek</p>
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => handleRead(n.id, n.eventId)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md ${
                    n.read 
                      ? 'bg-gray-50 border-gray-200' 
                      : 'bg-white border-primary-200 shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className={`mb-2 ${n.read ? 'text-gray-600' : 'text-gray-800 font-medium'}`}>
                        {n.message}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(n.createdAt).toLocaleString("tr-TR")}
                      </p>
                    </div>
                    {!n.read && (
                      <div className="ml-4">
                        <span className="inline-block w-3 h-3 bg-primary-500 rounded-full"></span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 text-center">
            <Link href="/">
              <button className="btn-secondary">
                ← Ana Sayfaya Dön
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
