import checkNumInputs from "./checkNumInputs";

const forms = (state) => {
  const formsCollection = document.querySelectorAll('form'),
        inputsCollection = document.querySelectorAll('input'),
        windowsCollection = document.querySelectorAll('[data-modal]');

  checkNumInputs('input[name="user_phone"]');

  const message = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро мы с Вами свяжемся.',
    failure: 'Что-то пошло не так...'
  };

  const postData = async (url, data) => {
    document.querySelector('.status').textContent = message.loading;

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

      if (item.getAttribute('data-calc') === 'end') { // если конечная страница формы - добавит данные из калькулятора
        for (let key in state) {
          formData.append(key, state[key]);
        }
      }

      postData('assets/server.php', formData)
        .then(result => {
          console.log(result);
          statusMessage.textContent = message.success;
        })
        .catch(() => statusMessage.textContent = message.failure)
        .finally(() => {
          clearInputs();
          
          for (let key in state) {
            delete state[key];
          }

          setTimeout(() => {
            statusMessage.remove();
            
            windowsCollection.forEach(item => {
              item.style.display = 'none';
            })
          }, 2000);
        });
    });
  });
};

export default forms;
