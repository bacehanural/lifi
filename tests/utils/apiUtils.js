import axios from 'axios';

/**
 * Utility to send GET requests to the LI.FI API.
 * @param {string} endpoint - The API endpoint.
 * @param {object} params - Query parameters for the request.
 * @returns {Promise} - Axios response promise.
 */
export async function sendGetRequest(endpoint, params = {}) {
  const baseUrl = 'https://li.quest/v1';

  try {
    const response = await axios.get(`${baseUrl}${endpoint}`, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error('API Error Response:', error.response?.data || error.message); // Debug log added
    throw new Error(`GET Request Failed: ${JSON.stringify(error.response?.data) || error.message}`);
  }
}