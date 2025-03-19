
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
