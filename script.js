const chatbox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');

function appendMessage(sender, message) {
  const messageElement = document.createElement('div');
  messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatbox.appendChild(messageElement);
  chatbox.scrollTop = chatbox.scrollHeight;
}

function sendMessage() {
  const userMessage = userInput.value.trim();
  if (userMessage === '') return;
  appendMessage('You', userMessage);
  userInput.value = '';

  // Replace 'your-api-key' with your OpenAI API key
  const gpt = new OpenAI.ChatCompletion({
    apiKey: '8cLsPsn308YKX4hv4dGrT3BlbkFJqhX5glk3p2XBVpPMkTwt'
  });
  
  gpt.createChat({ messages: [{ role: 'user', content: userMessage }] })
    .then(response => {
      const botMessage = response.messages[0].content;
      appendMessage('Bot', botMessage);
    })
    .catch(error => console.error('Error:', error));
}
