export const BASE_URL = "https://real-backend-h3n0.onrender.com";

export const apiCall = async (endpoint, options = {}) => {
  try {
    const defaultHeaders = {
      'Content-Type': 'application/json',
    };

    const fullUrl = `${BASE_URL}${endpoint}`;
    console.log('Making API call to:', fullUrl); // Debug log

    const response = await fetch(fullUrl, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers
      }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Call Error:', error);
    throw error;
  }
};

// All API endpoints
export const endpoints = {
  createMedicalRecord: (data) => apiCall('/api/medical-records', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  
  getMedicalRecord: (id) => apiCall(`/api/medical-records/${id}`, {
    method: 'GET'
  }),
  
  submitResponse: (data) => apiCall('/api/responses', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  
  updateMedicalRecord: (id, data) => apiCall(`/api/medical-records/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  
  generateReport: (data) => apiCall('/api/generate-report', {
    method: 'POST',
    body: JSON.stringify(data)
  })
};

export default endpoints; 