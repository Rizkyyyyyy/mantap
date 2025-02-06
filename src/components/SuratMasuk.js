import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Table, Alert, Badge, Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const getHeaderAuth = () => ({
  Authorization: `Bearer ${localStorage.getItem('authToken')}`,
  'Content-Type': 'application/json',
});

const SuratMasuk = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    kode_transaksi: '',
    tanggal_surat_masuk: '',
    asal_surat: '',
    nrp_pegawai: '',
    softfile: null,
    jenis_surat: 'Biasa',
  });
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem('suratMasukData');
    if (storedData) {
      setData(JSON.parse(storedData));
    } else {
      fetch('https://arsipdigital-v2.my.id/api/admin/surat_masuk.php', {
        headers: getHeaderAuth(),
      })
        .then((response) => response.json())
        .then((result) => {
          const dataResult = result.data || [];
          setData(dataResult);
          localStorage.setItem('suratMasukData', JSON.stringify(dataResult));
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setError('Failed to fetch data');
        });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        softfile: {
          name: file.name,
          url: URL.createObjectURL(file),
        },
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const requestMethod = editIndex !== null ? 'PUT' : 'POST';
      const url = `https://arsipdigital-v2.my.id/api/admin/surat_masuk.php${
        editIndex !== null ? `/${data[editIndex].id}` : ''
      }`;

      const response = await fetch(url, {
        method: requestMethod,
        body: JSON.stringify(formData),
        headers: getHeaderAuth(),
      });

      const result = await response.json();

      const updatedData = editIndex !== null
        ? data.map((item, idx) => idx === editIndex ? { ...formData, id: item.id } : item)
        : [...data, { ...formData, id: result.id }];

      localStorage.setItem('suratMasukData', JSON.stringify(updatedData));
      setData(updatedData);
      resetForm();
      
      MySwal.fire({
        icon: 'success',
        title: 'Success',
        text: editIndex !== null ? 'Data updated successfully!' : 'Data added successfully!',
      });
    } catch (error) {
      setError('Failed to save data');
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to save data',
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      kode_transaksi: '',
      tanggal_surat_masuk: '',
      asal_surat: '',
      nrp_pegawai: '',
      softfile: null,
      jenis_surat: 'Biasa',
    });
    setShowForm(false);
    setEditIndex(null);
  };

  const handleDownload = () => {
    const headers = ['ID', 'Kode Transaksi', 'Tanggal', 'Asal Surat', 'NRP Pegawai', 'Softfile', 'Jenis Surat'];
    const rows = data.map(item => [
      item.id,
      item.kode_transaksi,
      item.tanggal_surat_masuk,
      item.asal_surat,
      item.nrp_pegawai,
      item.softfile?.name || '',
      item.jenis_surat,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + 
      [headers.join(','), ...rows.map(row => row.join(','))].join('\n');

    const link = document.createElement('a');
    link.href = encodeURI(csvContent);
    link.download = 'Surat_Masuk_Report.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getBadgeVariant = (jenisSurat) => {
    switch (jenisSurat) {
      case 'Penting':
        return 'warning';
      case 'Rahasia':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="container py-4">
      <Card>
        <Card.Header className="bg-white">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="mb-0">Surat Masuk</h4>
            <div>
              <Button 
                variant="outline-primary" 
                onClick={handleDownload}
                className="me-2"
              >
                <i className="bi bi-download me-2"></i>
                Download Report
              </Button>
              <Button
                variant="primary"
                onClick={() => setShowForm(!showForm)}
              >
                <i className={`bi ${showForm ? 'bi-x' : 'bi-plus'} me-2`}></i>
                {showForm ? 'Cancel' : 'Add New'}
              </Button>
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          {error && (
            <Alert variant="danger" className="mb-4">
              {error}
            </Alert>
          )}

          {showForm && (
            <Form onSubmit={handleSubmit} className="mb-4">
              <div className="row g-3">
                <div className="col-md-4">
                  <Form.Group>
                    <Form.Label>Kode Transaksi</Form.Label>
                    <Form.Control
                      name="kode_transaksi"
                      value={formData.kode_transaksi}
                      onChange={handleChange}
                      required
                      placeholder="Enter transaction code"
                    />
                  </Form.Group>
                </div>
                <div className="col-md-4">
                  <Form.Group>
                    <Form.Label>Tanggal Surat Masuk</Form.Label>
                    <Form.Control
                      type="date"
                      name="tanggal_surat_masuk"
                      value={formData.tanggal_surat_masuk}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </div>
                <div className="col-md-4">
                  <Form.Group>
                    <Form.Label>Asal Surat</Form.Label>
                    <Form.Control
                      name="asal_surat"
                      value={formData.asal_surat}
                      onChange={handleChange}
                      required
                      placeholder="Enter letter source"
                    />
                  </Form.Group>
                </div>
                <div className="col-md-4">
                  <Form.Group>
                    <Form.Label>NRP Pegawai</Form.Label>
                    <Form.Control
                      name="nrp_pegawai"
                      value={formData.nrp_pegawai}
                      onChange={handleChange}
                      required
                      placeholder="Enter employee NRP"
                    />
                  </Form.Group>
                </div>
                <div className="col-md-4">
                  <Form.Group>
                    <Form.Label>Softfile</Form.Label>
                    <Form.Control
                      type="file"
                      onChange={handleFileChange}
                      required={!editIndex}
                    />
                  </Form.Group>
                </div>
                <div className="col-md-4">
                  <Form.Group>
                    <Form.Label>Jenis Surat</Form.Label>
                    <Form.Select
                      name="jenis_surat"
                      value={formData.jenis_surat}
                      onChange={handleChange}
                    >
                      <option value="Biasa">Biasa</option>
                      <option value="Penting">Penting</option>
                      <option value="Rahasia">Rahasia</option>
                    </Form.Select>
                  </Form.Group>
                </div>
              </div>
              <div className="mt-4">
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="d-flex align-items-center"
                >
                  {loading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        className="me-2"
                      />
                      Saving...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-save me-2"></i>
                      {editIndex !== null ? 'Update' : 'Save'}
                    </>
                  )}
                </Button>
              </div>
            </Form>
          )}

          <div className="table-responsive">
            <Table hover bordered className="align-middle">
              <thead className="bg-light">
                <tr>
                  <th>No</th>
                  <th>Kode Transaksi</th>
                  <th>Tanggal</th>
                  <th>Asal Surat</th>
                  <th>NRP Pegawai</th>
                  <th>Jenis Surat</th>
                  <th>Softfile</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.kode_transaksi}</td>
                    <td>{item.tanggal_surat_masuk}</td>
                    <td>{item.asal_surat}</td>
                    <td>{item.nrp_pegawai}</td>
                    <td>
                      <Badge bg={getBadgeVariant(item.jenis_surat)}>
                        {item.jenis_surat}
                      </Badge>
                    </td>
                    <td>
                      {item.softfile && (
                        <a
                          href={item.softfile.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-decoration-none"
                        >
                          <i className="bi bi-file-earmark me-2"></i>
                          {item.softfile.name}
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SuratMasuk;