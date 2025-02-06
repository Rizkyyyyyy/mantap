import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ActivityLog = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // API URL
  const apiUrl = 'http://192.168.1.12/arsipdigital_v2/api/admin/activitylog.php';

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Jika Anda membutuhkan token untuk autentikasi
          },
        });
        if (response.data && response.data.data) {
          setLogs(response.data.data); // Pastikan API mengirim data dalam format yang benar
        } else {
          throw new Error('Data tidak ditemukan');
        }
      } catch (error) {
        setError('Gagal memuat data');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4">
      <h3>Log Aktivitas</h3>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>Action</th>   
              <th>Description</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id}>
                <td>{log.id}</td>
                <td>{log.user_id}</td>
                <td>{log.action}</td>
                <td>{log.description}</td>
                <td>{log.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActivityLog;
