
/**
 * API Service for communicating with the Spring Boot backend
 */

export const sendMessage = async (message: string): Promise<string> => {
  try {
    const response = await fetch('http://localhost:8080/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to get response from server');
    }
    
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error sending message to API:', error);
    throw error;
  }
};

export const sendMessageWithFile = async (message: string, file: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('message', message);
    formData.append('file', file);
    
    const response = await fetch('http://localhost:8080/api/chat/file', {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Failed to get response from server');
    }
    
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error sending file to API:', error);
    throw error;
  }
};
