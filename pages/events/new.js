import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function NewEventPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('Konser');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const res = await fetch('/api/events/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        title,
        description,
        date,
        location,
        image,
        category,
      })
    });

    const data = await res.json();

    if (res.ok) {
      router.push('/');
    } else {
      setError(data.error || 'Etkinlik eklenemedi.');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="card">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">🎭 Yeni Etkinlik</h1>
            <p className="text-gray-600">Kültürel etkinliğinizi paylaşın</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Etkinlik Başlığı *
              </label>
              <input
                id="title"
                type="text"
                placeholder="Etkinlik başlığını girin"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="input-field"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Açıklama *
              </label>
              <textarea
                id="description"
                placeholder="Etkinlik hakkında detaylı bilgi verin"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={4}
                className="input-field resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                  Tarih ve Saat *
                </label>
                <input
                  id="date"
                  type="datetime-local"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="input-field"
                />
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  Konum *
                </label>
                <input
                  id="location"
                  type="text"
                  placeholder="Etkinlik konumu"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  className="input-field"
                />
              </div>
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Kategori *
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="input-field"
              >
                <option value="Konser">🎵 Konser</option>
                <option value="Tiyatro">🎭 Tiyatro</option>
                <option value="Festival">🎪 Festival</option>
                <option value="Sergi">🖼️ Sergi</option>
                <option value="Konferans">🎤 Konferans</option>
                <option value="Workshop">🔧 Workshop</option>
                <option value="Diğer">📌 Diğer</option>
              </select>
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                Görsel URL (İsteğe bağlı)
              </label>
              <input
                id="image"
                type="url"
                placeholder="https://ornek.com/gorsel.jpg"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="input-field"
              />
              <p className="text-xs text-gray-500 mt-1">
                Etkinlik görseli için bir URL girin
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <div className="flex gap-4">
              <button 
                type="submit" 
                disabled={isLoading}
                className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Ekleniyor..." : "Etkinlik Ekle"}
              </button>
              <Link href="/events" className="flex-1">
                <button 
                  type="button"
                  className="w-full px-6 py-3 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 transition-colors"
                >
                  İptal
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
