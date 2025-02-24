function activateFAQAccordion() {
  const accordionItems = document.querySelectorAll('.faq-accordion__item');

  accordionItems.forEach((item) => {
    const button = item.querySelector('button');
    const content = item.querySelector('div');
    window.addEventListener('resize', () => {
      if (item.classList.contains('faq-accordion__item--show')) {
        content.style.maxHeight = `${content.scrollHeight + 5}px`;
      }
    });

    button.addEventListener('click', () => {
      const isOpen = item.classList.contains('faq-accordion__item--show');

      if (isOpen) {
        item.classList.remove('faq-accordion__item--show');
        item.classList.remove('faq-accordion__item--active');
        content.style.maxHeight = null;
      } else {
        accordionItems.forEach((el) => el.classList.remove('faq-accordion__item--active'));

        item.classList.add('faq-accordion__item--active');
        item.classList.add('faq-accordion__item--show');
        content.style.maxHeight = `${content.scrollHeight }px`;
      }
    });
  });
}

export default activateFAQAccordion;
