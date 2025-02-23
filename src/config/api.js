export const BASE_URL = "https://real-backend-h3n0.onrender.com";

export const apiCall = async (endpoint, options = {}) => {
  try {
    const defaultHeaders = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Call Error:', error);
    throw error;
  }
};

// Add specific API functions
export const submitMedicalData = async (formData) => {
  return apiCall('/api/medical-records', {
    method: 'POST',
    body: JSON.stringify(formData)
  });
};

export const getMedicalRecord = async (id) => {
  return apiCall(`/api/medical-records/${id}`);
}; 