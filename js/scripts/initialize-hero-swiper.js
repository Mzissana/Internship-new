import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

function updateBottomSpacing() {
  const activeSlide = document.querySelector('.swiper-slide-active');
  const infoBlock = activeSlide?.querySelector('.hero-slide__info');
  const pagination = document.querySelector('.hero-swiper__swiper-pagination');

  if (infoBlock && pagination) {
    const targetBottom = infoBlock.offsetHeight + getBottomPadding();
    pagination.style.bottom = `${targetBottom}px`;
  }
}

function initHeroSwiper() {
  let currentDevice = getCurrentDevice();

  const swiper = new Swiper('.hero-swiper', {
    modules: [Pagination],
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 0,
    autoHeight: true,
    loop: true,
    pagination: {
      el: '.hero-swiper__swiper-pagination',
      clickable: true,
      renderBullet: (index, className) => `<button type="button" class="${className}" tabindex="0" aria-label="Go to slide ${index + 1}"></button>`,
    },
    allowTouchMove: currentDevice !== 'desktop',
    watchOverflow: true,
    on: {
      init: updateBottomSpacing,
      slideChangeTransitionEnd: updateBottomSpacing,
    },
  });

  window.addEventListener('resize', () => {
    const newDevice = getCurrentDevice();
    if (newDevice !== currentDevice) {
      currentDevice = newDevice;
      swiper.params.simulateTouch = newDevice !== 'desktop';
      swiper.update();
    }
    updateBottomSpacing();
  });
  window.addEventListener('load', updateBottomSpacing);
}

function getCurrentDevice() {
  if (window.matchMedia('(min-width: 1440px)').matches) {
    return 'desktop';
  } else if (window.matchMedia('(min-width: 768px)').matches) {
    return 'tablet';
  } else {
    return 'mobile';
  }
}

function getBottomPadding() {
  if (window.matchMedia('(min-width: 1440px)').matches) {
    return 60;
  } else if (window.matchMedia('(min-width: 768px)').matches) {
    return 60;
  } else {
    return 20;
  }
}

export default initHeroSwiper;
