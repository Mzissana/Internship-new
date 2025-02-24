import Swiper from 'swiper';
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function initProgramsSwiper() {
  let currentDevice = getCurrentDevice();
  const swiper = new Swiper('.programs-swiper', {
    modules: [Navigation, Pagination, Scrollbar],
    slidesPerView: 'auto',
    slidesPerGroup: 1,
    spaceBetween: getSpace(currentDevice),
    loop: false,
    navigation: {
      nextEl: '.programs-swiper-container__button--next',
      prevEl: '.programs-swiper-container__button--prev',
    },
    scrollbar: {
      el: '.programs__scrollbar',
      hide: false,
      draggable: true,
      snapOnRelease: true,
      dragSize: currentDevice === 'desktop' ? 395 : 324,
    },
    allowTouchMove: currentDevice !== 'desktop',
    watchOverflow: true,
  });

  window.addEventListener('resize', () => {
    const newDevice = getCurrentDevice();
    if (newDevice !== currentDevice) {
      currentDevice = newDevice;
      swiper.params.slidesPerView = getSlidesPerView(newDevice);
      swiper.params.spaceBetween = getSpace(newDevice);
      swiper.params.simulateTouch = newDevice !== 'desktop';
      swiper.update();
      swiper.updateSize();
      swiper.navigation.update();
      swiper.scrollbar.updateSize();
    }
  });
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

function getSlidesPerView(device) {
  switch (device) {
    case 'desktop':
      return 3;
    case 'tablet':
      return 2;
    case 'mobile':
    default:
      return 1;
  }
}

function getSpace(device) {
  switch (device) {
    case 'desktop':
      return 32;
    case 'tablet':
      return 30;
    case 'mobile':
    default:
      return 5;
  }
}

export default initProgramsSwiper;
