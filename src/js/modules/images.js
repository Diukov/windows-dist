const showGallery = () => {
  const imgPopup = document.createElement('div'),
        gallerySection = document.querySelector('.works'),
        bigImage = document.createElement('img');

  imgPopup.classList.add('popup');
  gallerySection.appendChild(imgPopup);

  imgPopup.style.justifyContent = 'center';
  imgPopup.style.alignItems = 'center';
  imgPopup.style.display = 'none';

  imgPopup.appendChild(bigImage);

  gallerySection.addEventListener('click', (event) => {
    event.preventDefault();

    let target = event.target;

    if (target && target.classList.contains('preview')) {
      imgPopup.style.display = 'flex';

      const path = target.parentNode.getAttribute('href'); // ссылка на изображение большого размера из контейнера над img

      bigImage.setAttribute('src', path);
    }

    if (target && target.matches('div.popup')) { // отслеживается клик на подложку
      imgPopup.style.display = 'none';
    }
  });
};

export default showGallery;
