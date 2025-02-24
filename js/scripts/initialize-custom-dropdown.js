const initCustomDropdown = () => {
  const dropdown = document.querySelector('.subscription-dropdown');
  const button = dropdown.querySelector('.subscription-dropdown__button');
  const items = dropdown.querySelectorAll('.subscription-dropdown__item');

  function toggleDropdown(event) {
    event.preventDefault();
    dropdown.classList.toggle('subscription-dropdown--open');
  }

  function selectItem(event) {
    event.preventDefault();
    const selectedValue = event.target.textContent;
    button.innerText = selectedValue;
    dropdown.classList.remove('subscription-dropdown--open');
  }

  function closeDropdown(event) {
    if (!dropdown.contains(event.target)) {
      dropdown.classList.remove('subscription-dropdown--open');
    }
  }

  button.addEventListener('click', toggleDropdown);
  items.forEach((item) => item.addEventListener('click', selectItem));
  document.addEventListener('click', closeDropdown);
};

export default initCustomDropdown;
