
/**
 * API Service for communicating with the Spring Boot backend
 * 
 * TODO: Implement the actual API endpoints once the Spring Boot backend is ready
 * The Spring Boot backend should have an endpoint like:
 * 
 * POST /api/chat
 * Request body: { message: string }
 * Response: { response: string }
 * 
 * Spring Boot Controller Example:
 * 
 * @RestController
 * @RequestMapping("/api")
 * public class ChatController {
 *   
 *   @PostMapping("/chat")
 *   public ResponseEntity<Map<String, String>> processChat(@RequestBody Map<String, String> request) {
 *     String userMessage = request.get("message");
 *     // Process the message with your AI logic
 *     String response = yourAIService.generateResponse(userMessage);
 *     
 *     Map<String, String> responseBody = new HashMap<>();
 *     responseBody.put("response", response);
 *     
 *     return ResponseEntity.ok(responseBody);
 *   }
 * }
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
