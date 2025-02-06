import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Table, Alert, Badge, Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const getHeaderAuth = () => ({
  'Authorization': `Bearer ${localStorage.getItem('token')}`,
  'Content-Type': 'application/json',
});

const Suratkeluar = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    kode_transaksi: '',
    tanggal_surat_keluar: '',
    asal_surat: '',
    nrp_pegawai: '',
    softfile: null,
    jenis_surat: 'Biasa',
  });
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedData = localStorage.getItem('suratkeluarData');
    // if (storedData) {
    //   setData(JSON.parse(storedData));
    // } else {
    //   fetch('https://arsipdigital-v2.my.id/api/admin/surat_keluar.php', {
    //     headers: getHeaderAuth(),
    //   })
    //     .then((response) => response.json())
    //     .then((result) => {
    //       const dataResult = Array.isArray(result) ? result : result.data || [];
    //       setData(dataResult);
    //       localStorage.setItem('suratkeluarData', JSON.stringify(dataResult));
    //     })
    //     .catch((error) => {
    //       console.error('Error fetching data:', error);
    //       setError('Failed to fetch data');
    //     });
    // }
    fetch('https://arsipdigital-v2.my.id/api/admin/surat_keluar.php', {
        headers: getHeaderAuth(),
      })
        .then((response) => response.json())
        .then((result) => {
          const dataResult = Array.isArray(result) ? result : result.data || [];
          setData(dataResult);
          localStorage.setItem('suratkeluarData', JSON.stringify(dataResult));
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setError('Failed to fetch data');
        });
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

    const requestMethod = editIndex !== null ? 'PUT' : 'POST';
    const url = `https://arsipdigital-v2.my.id/api/admin/surat_keluar.php${
      editIndex !== null ? `/${data[editIndex].id}` : ''
    }`;

    try {
      const response = await fetch(url, {
        method: requestMethod,
        body: JSON.stringify(formData),
        headers: getHeaderAuth(),
      });

      const result = await response.json();

      let updatedData;
      if (editIndex !== null) {
        updatedData = data.map((item, idx) => 
          idx === editIndex ? { ...formData, id: item.id } : item
        );
        setEditIndex(null);
      } else {
        updatedData = [...data, { ...formData, id: result.id }];
      }

      setData(updatedData);
      localStorage.setItem('suratkeluarData', JSON.stringify(updatedData));
      resetForm();

      MySwal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: editIndex !== null ? 'Data berhasil diperbarui!' : 'Data berhasil ditambahkan!',
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
      tanggal_surat_keluar: '',
      asal_surat: '',
      nrp_pegawai: '',
      softfile: null,
      jenis_surat: 'Biasa',
    });
    setShowForm(false);
    setEditIndex(null);
  };

  const handleDownload = () => {
    const headers = ['ID', 'Kode Transaksi', 'Tanggal', 'Dikirim Kepada', 'NRP Pegawai', 'Softfile', 'Jenis Surat'];
    const rows = data.map(item => [
      item.id,
      item.kode_transaksi,
      item.tanggal_surat_keluar,
      item.asal_surat,
      item.nrp_pegawai,
      item.softfile?.name || '',
      item.jenis_surat,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + 
      [headers.join(','), ...rows.map(row => row.join(','))].join('\n');

    const link = document.createElement('a');
    link.href = encodeURI(csvContent);
    link.download = 'Surat_Keluar_Report.csv';
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
            <h4 className="mb-0">Surat Keluar</h4>
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
                    <Form.Label>Tanggal Surat Keluar</Form.Label>
                    <Form.Control
                      type="date"
                      name="tanggal_surat_keluar"
                      value={formData.tanggal_surat_keluar}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </div>
                <div className="col-md-4">
                  <Form.Group>
                    <Form.Label>Dikirim Kepada</Form.Label>
                    <Form.Control
                      name="asal_surat"
                      value={formData.asal_surat}
                      onChange={handleChange}
                      required
                      placeholder="Enter recipient"
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
                  <th>Tanggal Surat Keluar</th>
                  <th>Dikirim Kepada</th>
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
                    <td>{item.tanggal_surat_keluar}</td>
                    <td>{item.dikirim_kepada}</td>
                    <td>{item.nrp_pegawai}</td>
                    <td>
                      <Badge bg={getBadgeVariant(item.jenis_surat)}>
                        {item.jenis_surat}
                      </Badge>
                    </td>
                    <td>
                      {item.softfile && (
                        <a
                          href={item.softfile}
                          target="_blank"
                          rel="noreferrer"
                          className="text-decoration-none"
                        >
                          <i className="bi bi-file-earmark me-2">
                            {/* {item.softfile} */} Download
                          </i>
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

export default Suratkeluar;