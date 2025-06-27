import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async (pageNumber) => {
    setLoading(true);
    try {
      const response = await fetch(`https://reqres.in/api/users?page=${pageNumber}`, {
        headers: {
          'x-api-key': 'reqres-free-v1'
        }
      });
      if (!response.ok) throw new Error(`Hata: ${response.status}`);
      const data = await response.json();
      setUsers(data.data);
      setTotalPages(data.total_pages);
      setPage(data.page);
    } catch (error) {
      console.error('Veri alınırken hata oluştu:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className="container">
      <h1 className="title">Kullanıcı Listesi</h1>
      {loading ? (
        <p className="loading">Yükleniyor...</p>
      ) : (
        <div className="user-list">
          {users.map(user => (
            <div className="user-card" key={user.id}>
              <img src={user.avatar} alt={user.first_name} />
              <h3>{user.first_name} {user.last_name}</h3>
              <p>{user.email}</p>
            </div>
          ))}
        </div>
      )}
      <div className="pagination">
        <button onClick={handlePrev} disabled={page === 1}>← Önceki</button>
        <span>Sayfa {page} / {totalPages}</span>
        <button onClick={handleNext} disabled={page === totalPages}>Sonraki →</button>
      </div>
    </div>
  );
}

export default App;
