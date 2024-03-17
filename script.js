function getAnswer() {
  const question = document.getElementById('question').value.trim();
  if (question === '') {
    alert('Пожалуйста, введите ваш вопрос');
    return;
  }
  
  // Здесь можно добавить логику для поиска ответа в Интернете.
  // В данном примере просто генерируется фиктивная ссылка.
  const answerContainer = document.getElementById('answer');
  answerContainer.innerHTML = `<p>Возможно, ответ на ваш вопрос можно найти <a href="https://www.example.com?q=${encodeURIComponent(question)}" target="_blank">здесь</a>.</p>`;
}
