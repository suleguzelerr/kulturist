import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const { data: session, status } = useSession();
  const [events, setEvents] = useState([]);
  const [categories] = useState(["Konser", "Tiyatro", "Festival"]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchApprovedEvents = async () => {
      const res = await fetch("/api/events/approved");
      const data = await res.json();
      setEvents(data);
    };
    fetchApprovedEvents();
  }, []);

  const filteredEvents = selectedCategory
    ? events.filter((event) => event.category === selectedCategory)
    : events;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-3xl p-12 text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">🎭 KÜLTÜRİST</h1>
        <p className="text-xl text-gray-600 italic">"Kültürü birlikte yaşa!"</p>
      </section>

      {/* User Area */}
      <div className="text-center mb-8">
        {status === "loading" ? (
          <p className="text-gray-600">Oturum kontrol ediliyor...</p>
        ) : session ? (
          <div className="space-y-4">
            <p className="text-lg text-gray-700">Hoş geldin, {session.user.email}</p>
            <button className="btn-danger" onClick={() => signOut()}>
              Çıkış Yap
            </button>
          </div>
        ) : (
          <div className="space-x-4">
            <Link href="/auth/register">
              <button className="btn-secondary">Kayıt Ol</button>
            </Link>
            <Link href="/auth/login">
              <button className="btn-gray">Giriş Yap</button>
            </Link>
          </div>
        )}
      </div>

      {/* Main Action Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        <button className="btn-primary">🎫 Etkinlikleri Keşfet</button>
        <Link href="/events/new">
          <button className="btn-primary">➕ Etkinlik Ekle</button>
        </Link>
        <Link href="/notifications">
          <button className="btn-primary">🔔 Bildirimler</button>
        </Link>
      </div>

      {/* Categories */}
      <div className="text-center mb-12">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Etkinlik Kategorileri</h3>
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <span
              key={cat}
              onClick={() =>
                setSelectedCategory(cat === selectedCategory ? null : cat)
              }
              className={`category-pill ${
                cat === selectedCategory ? "active" : ""
              }`}
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* Events */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Yaklaşan Etkinlikler</h2>
        {filteredEvents.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">Bu kategoriye ait etkinlik bulunamadı.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <Link key={event.id} href={`/events/${event.id}`} passHref>
                <div className="card cursor-pointer group">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-primary-600 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>
                  <div className="space-y-2 text-sm text-gray-500">
                    <p>
                      <strong>Tarih:</strong>{" "}
                      {new Date(event.date).toLocaleString("tr-TR")}
                    </p>
                    <p>
                      <strong>Konum:</strong> {event.location}
                    </p>
                  </div>
                  {event.image && (
                    <img
                      src={event.image}
                      alt="Etkinlik görseli"
                      className="w-full h-48 object-cover rounded-lg mt-4"
                    />
                  )}
                  <p className="text-primary-600 font-medium mt-4 group-hover:text-primary-700 transition-colors">
                    👉 Detaylar ve Mesaj Gönder
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-500 border-t border-gray-200">
        <p>Kültürist © 2025 – Kültürel yaşamı desteklemek için tasarlandı.</p>
      </footer>
    </div>
  );
}
