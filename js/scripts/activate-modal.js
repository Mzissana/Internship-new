const modalToggle = document.querySelector('.hero-slide__button');
const modal = document.querySelector('.modal');
const modalCloseButton = document.querySelector('.modal__close-button');

const openModal = () => {
  modal.classList.remove('modal--closed');
  modal.classList.add('modal--open');
  document.body.classList.add('page-body--overlay');
  document.body.style.overflow = 'hidden';
  modalToggle.classList.add('active');
};

const closeModal = () => {
  document.body.classList.remove('page-body--overlay');
  modal.classList.remove('modal--open');
  modal.classList.add('modal--closed');
  document.body.style.overflow = 'visible';
  modalToggle.classList.remove('active');
};

const handleOutsideClick = (event) => {
  if (!modal.contains(event.target) || modalCloseButton.contains(event.target)) {
    closeModal();
  }
};

const handleEscapePress = (event) => {
  if (event.key === 'Escape') {
    closeModal();
  }
};

const toggleModal = (event) => {
  event.stopPropagation();
  if (modal.classList.contains('modal--open')) {
    closeModal();
  } else {
    openModal();
  }
};

const activateModal = () => {
  modalToggle.addEventListener('click', toggleModal);
  modalCloseButton.addEventListener('click', closeModal);
  document.addEventListener('click', handleOutsideClick);
  document.addEventListener('keydown', handleEscapePress);
};

export default activateModal;
