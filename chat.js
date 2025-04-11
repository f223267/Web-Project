$(document).ready(function() {
  // DOM elements
  const $chatBox = $('#chat-box');
  const $userInput = $('#user-input');
  const $sendBtn = $('#send-btn');
  const $loginBtn = $('#loginBtn');

  // Check login status
  function checkLoginStatus() {
      return localStorage.getItem('isLoggedIn') === 'true';
  }

  // Update login button
  function updateLoginButton() {
      const isLoggedIn = checkLoginStatus();
      $loginBtn.text(isLoggedIn ? 'Logout' : 'Login');
      
      if (isLoggedIn) {
          $loginBtn.attr('href', '#').off('click').on('click', function(e) {
              e.preventDefault();
              localStorage.removeItem('isLoggedIn');
              location.reload();
          });
      } else {
          $loginBtn.attr('href', 'login.html');
      }
  }

  // Add message to chat
  function addMessage(text, isUser) {
      const messageClass = isUser ? 'user-message' : 'bot-message';
      const $message = $('<div>').addClass('message ' + messageClass).text(text);
      
      $message.hide();
      $chatBox.append($message);
      $message.fadeIn(300);
      $chatBox.scrollTop($chatBox[0].scrollHeight);
  }

  // Show typing indicator
  function showTypingIndicator() {
      const $typing = $('<div>').addClass('message bot-message typing-indicator').text('Typing...');
      $chatBox.append($typing);
      $chatBox.scrollTop($chatBox[0].scrollHeight);
      return $typing;
  }

  // Get bot response
  function getBotResponse(userMessage) {
      // First try to get response from JSON file
      return $.getJSON('chat.json')
          .then(function(data) {
              const lowerMessage = userMessage.toLowerCase();
              
              // Check for exact matches
              if (data[lowerMessage]) {
                  return data[lowerMessage];
              }
              
              // Check for partial matches
              for (const key in data) {
                  if (lowerMessage.includes(key)) {
                      return data[key];
                  }
              }
              
              // Default response
              return "I'm sorry, I didn't understand that. Could you rephrase your question?";
          })
          .catch(function() {
              // Fallback responses if JSON fails to load
              const fallbackResponses = {
                  "hello": "Hello there! How can I help you with your gym questions?",
                  "hours": "Our gym is open from 6:00 AM to 10:00 PM every day.",
                  "membership": "We offer various membership plans. Would you like to know about monthly or yearly options?",
                  "trainer": "We have certified trainers available. Would you like to book a session?",
                  "equipment": "We have state-of-the-art equipment including cardio machines, free weights, and more."
              };
              
              const lowerMessage = userMessage.toLowerCase();
              return fallbackResponses[lowerMessage] || 
                  "I'm having trouble accessing my knowledge base. Please try again later or contact our staff directly.";
          });
  }

  // Handle user message
  function handleUserMessage() {
      const message = $userInput.val().trim();
      if (message === '') return;
      
      // Add user message to chat
      addMessage(message, true);
      $userInput.val('');
      
      // Show typing indicator
      const $typing = showTypingIndicator();
      
      // Get and display bot response after a delay
      setTimeout(function() {
          getBotResponse(message).then(function(response) {
              $typing.remove();
              addMessage(response, false);
          });
      }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  }

  // Event listeners
  $sendBtn.on('click', handleUserMessage);
  $userInput.on('keypress', function(e) {
      if (e.which === 13) { // Enter key
          handleUserMessage();
      }
  });

  // Initialize
  updateLoginButton();
  
  // Add welcome message if chat is empty
  if ($chatBox.children().length === 0) {
      addMessage("Hello! I'm your gym assistant. How can I help you today?", false);
  }
});