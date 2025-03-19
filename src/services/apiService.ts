
/**
 * API Service for communicating with the Spring Boot backend
 * Handles all API requests for the Mastercard Assistant chatbot
 */

// Helper function to handle API errors
const handleApiError = (error: any, message: string): never => {
  console.error(message, error);
  throw new Error(message);
};

// Base URL for the API - can be changed based on environment
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export const sendMessage = async (message: string): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });
    
    if (!response.ok) {
      // For demo purposes (when backend is not available)
      // Return a mock response if we're in development
      if (import.meta.env.DEV) {
        console.warn('Using mock response (backend not available)');
        return `Hello! I'm Mastercard Assistant developed by Wipro. How can I help you today?`;
      }
      throw new Error(`Server responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.response;
  } catch (error) {
    return handleApiError(error, 'Error sending message to API');
  }
};

export const sendMessageWithFile = async (message: string, file: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('message', message);
    formData.append('file', file);
    
    const response = await fetch(`${API_BASE_URL}/chat/file`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      // For demo purposes (when backend is not available)
      if (import.meta.env.DEV) {
        console.warn('Using mock response (backend not available)');
        return `I've processed your file "${file.name}". This is a Mastercard Assistant demo created by Wipro.`;
      }
      throw new Error(`Server responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.response;
  } catch (error) {
    return handleApiError(error, 'Error sending file to API');
  }
};
