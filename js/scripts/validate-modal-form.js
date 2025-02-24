const initModalValidation = () => {
  const form = document.querySelector('.modal__form');

  form.setAttribute('novalidate', '');

  const phoneInput = form.querySelector('input[name="phone"]');
  const consentCheckbox = form.querySelector('input[name="consent"]');
  const cityInput = form.querySelector('input[name="city"]');
  const cityDropdown = form.querySelector('.modal-form__input--city');
  const cityButton = cityDropdown.querySelector('.modal-dropdown__button');
  const cityItems = cityDropdown.querySelectorAll('.modal-dropdown__item');

  const maskPhone = (input) => {
    input.addEventListener('input', () => {
      let value = input.value.replace(/\D/g, '');
      if (value.startsWith('7')) {
        value = `+${value}`;
      } else if (!value.startsWith('+7')) {
        value = `+7${value}`;
      }

      input.value = value.replace(
        /^(\+7)(\d{3})(\d{3})(\d{2})(\d{2}).*/,
        '$1 ($2) $3-$4-$5'
      );
    });
  };

  if (phoneInput) {
    maskPhone(phoneInput);
  }

  const validateInput = (input) => {
    input.classList.toggle('modal-form__input--error', !input.checkValidity());
  };

  const validateCheckbox = (checkbox) => {
    checkbox.classList.toggle('modal-form__checkbox--error', !checkbox.checked);
  };

  const validateCity = () => {
    const isCityValid = !!cityInput.value.trim();
    cityDropdown.classList.toggle('modal-form__input--error', !isCityValid);
  };

  cityItems.forEach((item) => {
    item.addEventListener('click', () => {
      cityInput.value = item.getAttribute('data-value');
      cityButton.textContent = item.textContent;
      validateCity();
    });
  });

  form.addEventListener('input', (event) => {
    if (event.target === phoneInput) {
      validateInput(phoneInput);
    }
    if (event.target === consentCheckbox) {
      validateCheckbox(consentCheckbox);
    }
  });

  form.addEventListener('submit', (event) => {
    validateInput(phoneInput);
    validateCheckbox(consentCheckbox);
    validateCity();

    if (!form.checkValidity() || !cityInput.value.trim()) {
      event.preventDefault();
    }
  });
};

export default initModalValidation;
