const initModalDropdown = () => {
  const dropdown = document.querySelector('.modal-dropdown');
  const button = dropdown.querySelector('.modal-dropdown__button');
  const items = dropdown.querySelectorAll('.modal-dropdown__item');

  function toggleDropdown(event) {
    event.preventDefault();
    dropdown.classList.toggle('modal-dropdown--open');
  }

  function selectItem(event) {
    event.preventDefault();
    const selectedValue = event.target.textContent;
    button.innerText = selectedValue;
    dropdown.classList.remove('modal-dropdown--open');
  }

  function closeDropdown(event) {
    if (!dropdown.contains(event.target)) {
      dropdown.classList.remove('modal-dropdown--open');
    }
  }

  button.addEventListener('click', toggleDropdown);
  items.forEach((item) => item.addEventListener('click', selectItem));
  document.addEventListener('click', closeDropdown);
};

export default initModalDropdown;
