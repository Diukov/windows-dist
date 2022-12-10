const forms = () => {
  const formsCollection = document.querySelectorAll('form'),
        inputsCollection = document.querySelectorAll('input'),
        phoneInputs = document.querySelectorAll('input[name="user_phone"]');

  phoneInputs.forEach(item => {
    item.addEventListener('input', () => {
      item.value = item.value.replace(/\D/, '');
    });
  });

  const message = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро мы с Вами свяжемся.',
    failure: 'Что-то пошло не так...'
  };

  const postData = async (url, data) => {
    document.querySelector('.status').textContent(message.loading);

    let result = await fetch(url, {
      method: "POST",
      body: data
    });

    return await result.text();
  };

  const clearInputs = () => {
    inputsCollection.forEach(item => {
      item.value = '';
    });
  };

  formsCollection.forEach(item => {
    item.addEventListener('submit', (event) => {
      event.preventDefault();

      let statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      item.appendChild(statusMessage);

      const formData = new FormData(item);

      postData('assets/server.php', formData)
        .then(result => {
          console.log(result);
          statusMessage.textContent = message.success;
        })
        .catch(() => statusMessage.textContent = message.failure)
        .finally(() => {
          clearInputs();
          setTimeout(() => {
            statusMessage.remove();
          }, 15000);
        });
    });
  });
};

export default forms;