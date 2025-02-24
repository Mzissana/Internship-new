const initFormValidation = () => {
  const form = document.querySelector('.subscription__form');

  form.setAttribute('novalidate', '');

  const inputs = Array.from(form.querySelectorAll('.subscription-form__input')).filter((input) => ['INPUT', 'TEXTAREA', 'SELECT'].includes(input.tagName));
  const phoneInput = form.querySelector('input[name="phone"]');
  const consentCheckbox = form.querySelector('input[name="consent"]');
  const cityInput = form.querySelector('input[name="city"]');
  const cityDropdown = form.querySelector('.subscription-form__input--city');
  const cityButton = cityDropdown.querySelector('.subscription-dropdown__button');
  const cityItems = cityDropdown.querySelectorAll('.subscription-dropdown__item');

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
    if (!input.checkValidity()) {
      input.classList.add('subscription-form__input--error');
    } else {
      input.classList.remove('subscription-form__input--error');
    }
  };

  const validateCheckbox = (checkbox) => {
    if (!checkbox.checked) {
      checkbox.classList.add('subscription-form__checkbox--error');
    } else {
      checkbox.classList.remove('subscription-form__checkbox--error');
    }
  };

  const validateCity = () => {
    if (!cityInput.value.trim()) {
      cityDropdown.classList.add('subscription-form__input--error');
    } else {
      cityDropdown.classList.remove('subscription-form__input--error');
    }
  };

  cityItems.forEach((item) => {
    item.addEventListener('click', () => {
      const cityValue = item.getAttribute('data-value');
      cityInput.value = cityValue;
      cityButton.textContent = item.textContent;
      validateCity();
    });
  });

  form.addEventListener('input', (event) => {
    if (event.target.classList.contains('subscription-form__input')) {
      validateInput(event.target);
    }
    if (event.target === consentCheckbox) {
      validateCheckbox(event.target);
    }
  });

  form.addEventListener('submit', (event) => {
    let isValid = true;

    if (!consentCheckbox.checked) {
      validateCheckbox(consentCheckbox);
      isValid = false;
    } else {
      consentCheckbox.classList.remove('subscription-form__checkbox--error');
    }

    inputs.forEach((input) => {
      validateInput(input);
      if (!input.checkValidity()) {
        isValid = false;
      }
    });

    if (!cityInput.value.trim()) {
      validateCity();
      isValid = false;
    }

    if (!isValid) {
      event.preventDefault();
    }
  });
};

export default initFormValidation;
