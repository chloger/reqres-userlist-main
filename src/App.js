import React, { useState, useEffect } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://reqres.in/api/users?page=1', {
      headers: {
        'x-api-key': 'reqres-free-v1'   // Burada API anahtarını ekliyoruz
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Veri alınırken hata oluştu. Status: ' + response.status);
        }
        return response.json();
      })
      .then(data => {
        setUsers(data.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>Hata: {error}</p>;

  return (
    <div style={{ maxWidth: 600, margin: '20px auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>Kullanıcı Listesi</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {users.map(user => (
          <li key={user.id} style={{ display: 'flex', alignItems: 'center', marginBottom: 15, border: '1px solid #ddd', borderRadius: 8, padding: 10 }}>
            <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} style={{ borderRadius: '50%', marginRight: 15, width: 60, height: 60 }} />
            <div>
              <strong>{user.first_name} {user.last_name}</strong>
              <p>{user.email}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
