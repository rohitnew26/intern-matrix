import apiClient from './apiClient';

export const fetchCertificates = async ({ status = 'all', limit = 200 } = {}) => {
  try {
    const params = { _limit: limit, _sort: 'issued_on', _order: 'desc' };
    if (status && status !== 'all') params.status = status;
    const res = await apiClient.get('/certificates', { params });
    return res.data || [];
  } catch (err) {
    console.error('Admin certificate fetch failed', err);
    return [];
  }
};

export const updateCertificateStatus = async ({ certificateId, status }) => {
  if (!certificateId) throw new Error('Certificate id is required');
  try {
    const res = await apiClient.patch(`/certificates/${encodeURIComponent(certificateId)}`, { status });
    return res.data;
  } catch (err) {
    console.error('Failed to update certificate status', err);
    throw err;
  }
};
