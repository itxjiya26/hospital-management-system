import { API_URL } from "../api"; // Adjust the path if needed depending on where the file is located in 'src'
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const Detail = () => {
  const { id } = useParams();
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/api/departments/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Department not found");
        }
        return res.json();
      })
      .then((data) => {
        setDepartment(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div style={{ padding: '30px', textAlign: 'center' }}>Loading department details...</div>;
  if (error) return <div style={{ padding: '30px', textAlign: 'center', color: 'red' }}>Error: {error}</div>;

  return (
    <div style={{ padding: '30px', maxWidth: '800px', margin: '0 auto' }}>
      <Link to="/departments" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: '500' }}>
        &larr; Back to Departments
      </Link>

      <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '24px', marginTop: '20px' }}>
        <span style={{ backgroundColor: '#eff6ff', color: '#2563eb', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>
          {department.code}
        </span>
        <h1 style={{ fontSize: '28px', color: '#0f172a', margin: '10px 0' }}>{department.name}</h1>
        <p style={{ color: '#475569', fontSize: '16px' }}>Lead Physician: <strong>{department.leadDoctor}</strong></p>

        <div style={{ display: 'flex', gap: '20px', marginTop: '20px', paddingTop: '15px', borderTop: '1px solid #f1f5f9' }}>
          <div>Available Beds: <strong>{department.availableBeds}</strong></div>
          <div>ICU Available: <strong>{department.icuAvailable}</strong></div>
        </div>
      </div>
    </div>
  );
};

export default Detail;