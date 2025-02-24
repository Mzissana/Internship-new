const menuToggle = document.querySelector('.navigation-menu__toggle');
const menu = document.querySelector('.navigation-menu');
const logo = document.querySelector('.navigation__logo');

function isMobile() {
  return window.matchMedia('(max-width: 767px)').matches;
}

function openMenu() {
  menu.classList.remove('navigation-menu--closed');
  menu.classList.add('navigation-menu--open');
  document.body.classList.add('page-body--overlay');
  menuToggle.classList.add('active');

  if (isMobile()) {
    logo.style.display = 'none';
  }
  document.addEventListener('click', handleOutsideClick);
  window.addEventListener('resize', handleResize);
}

function handleResize() {
  if (menu.classList.contains('navigation-menu--open')) {
    logo.style.display = isMobile() ? 'none' : 'flex';
  }
}

function closeMenu() {
  logo.style.display = 'flex';
  document.body.classList.remove('page-body--overlay');
  menu.classList.remove('navigation-menu--open');
  menu.classList.add('navigation-menu--closed');
  document.body.style.overflow = '';
  menuToggle.classList.remove('active');
  document.removeEventListener('click', handleOutsideClick);
  window.removeEventListener('resize', handleResize);
  document.querySelectorAll('.navigation-menu__link--active').forEach((link) => {
    link.classList.remove('navigation-menu__link--active');
  });
}

function handleOutsideClick(event) {
  if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
    closeMenu();
  }
}

function activateMenu() {
  menuToggle.addEventListener('click', (event) => {
    event.stopPropagation();
    if (menu.classList.contains('navigation-menu--open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });

  document.addEventListener('click', handleOutsideClick);

  const menuLinks = document.querySelectorAll('.navigation-menu__link');
  menuLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const subMenu = link.nextElementSibling;
      if (subMenu && subMenu.classList.contains('navigation-menu__list--sub')) {
        event.preventDefault();
        const isOpen = !subMenu.classList.contains('navigation-menu__list--closed');

        subMenu.classList.toggle('navigation-menu__list--closed');

        if (isOpen) {
          link.classList.remove('navigation-menu__link--active');
        } else {
          link.classList.add('navigation-menu__link--active');
        }
      } else {
        closeMenu();
      }
    });
  });
}

export default activateMenu;
