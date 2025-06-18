import { useEffect, useState } from 'react';
import withRole from '../../lib/withRole';

function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/users');
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError('Kullanıcılar yüklenemedi.');
    }
    setLoading(false);
  };

  const handleDelete = async (id, isAdmin) => {
    if (isAdmin) {
      setError('Admin kullanıcı silinemez!');
      return;
    }
    if (!confirm('Bu kullanıcıyı silmek istediğinizden emin misiniz?')) return;
    setError('');
    setSuccess('');
    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok) {
        setSuccess('Kullanıcı silindi.');
        fetchUsers();
      } else {
        setError(data.error || 'Silme işlemi başarısız.');
      }
    } catch {
      setError('Silme işlemi başarısız.');
    }
  };

  const handleRoleChange = async (id, currentRole, isSelf) => {
    if (isSelf) {
      setError('Kendi rolünüzü değiştiremezsiniz!');
      return;
    }
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    setError('');
    setSuccess('');
    try {
      const res = await fetch(`/api/admin/users/${id}/role`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole })
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess('Rol güncellendi.');
        fetchUsers();
      } else {
        setError(data.error || 'Rol güncellenemedi.');
      }
    } catch {
      setError('Rol güncellenemedi.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto card">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Kullanıcı Yönetimi</h1>
        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
        {success && <div className="bg-green-100 text-green-700 p-3 rounded mb-4">{success}</div>}
        {loading ? (
          <div className="text-center py-12">Yükleniyor...</div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">E-posta</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rol</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">İşlemler</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.role === 'admin' ? '👑 Admin' : '👤 Kullanıcı'}</td>
                  <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                    <button
                      onClick={() => handleRoleChange(user.id, user.role, user.isSelf)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs"
                      disabled={user.isSelf}
                    >
                      Rolü {user.role === 'admin' ? 'Kullanıcı' : 'Admin'} Yap
                    </button>
                    <button
                      onClick={() => handleDelete(user.id, user.role === 'admin')}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                      disabled={user.role === 'admin'}
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default withRole(AdminUsersPage, ['admin']); 