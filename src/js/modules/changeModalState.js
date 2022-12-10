import checkNumInputs from "./checkNumInputs.js";

const changeModalState = (state) => {
  const windowShape = document.querySelectorAll('.balcon_icons_img'),
        windowWidth = document.querySelectorAll('#width'),
        windowHeight = document.querySelectorAll('#height'),
        windowType = document.querySelectorAll('#view_type'),
        windowProfile = document.querySelectorAll('.checkbox');

  checkNumInputs('#width');
  checkNumInputs('#height');

  function bindActionToElements (event, elem, prop) {
    elem.forEach((item, index) => {
      item.addEventListener(event, () => {
        switch(item.nodeName) { // проверка ноды, с которой взаимодействует пользователь
          case 'SPAN':
            state[prop] = index;
            break;
          case 'INPUT':
            if (item.getAttribute('type') === 'checkbox') {
              index === 0 ? state[prop] = 'cold' : state[prop] = 'warm';

              elem.forEach((box, i) => { // функционал выбора только одного чекбокса
                box.checked = false; 

                if (i === index) {
                  box.checked = true;
                }
              });
            } else {
              state[prop] = item.value;
            }
            break;
          case 'SELECT':
            state[prop] = item.value;
            break;
        }

        console.log(state);
      });
    });
  }

  bindActionToElements('click', windowShape, 'shape');
  bindActionToElements('input', windowWidth, 'width');
  bindActionToElements('input', windowHeight, 'height');
  bindActionToElements('change', windowType, 'type');
  bindActionToElements('change', windowProfile, 'profile');
};

export default changeModalState;
