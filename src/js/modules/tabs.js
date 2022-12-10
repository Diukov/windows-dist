const tabs = (headerSelector, tabsSelector, contentSelector, activeClass, display = 'block') => {
  const header = document.querySelector(headerSelector),
        tabs = document.querySelectorAll(tabsSelector),
        content = document.querySelectorAll(contentSelector);

  function hideTabContent() {
    content.forEach(item => {
      item.style.display = 'none';
    });

    tabs.forEach(item => {
      item.classList.remove(activeClass);
    });
  }

  function showTabContent(i = 0) {
    content[i].style.display = display;
    tabs[i].classList.add(activeClass);
  }

  hideTabContent();
  showTabContent();

  header.addEventListener('click', (event) => {
    const target = event.target;

    if (target &&
       (target.classList.contains(tabsSelector.replace(/\./, "")) || 
        target.parentNode.classList.contains(tabsSelector.replace(/\./, "")))) {
        tabs.forEach((item, index) => {
          if (target === item || target.parentNode === item) {
            hideTabContent();
            showTabContent(index);
          }
        });
    }
  });
};

export default tabs;