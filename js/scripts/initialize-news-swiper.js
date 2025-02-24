import Swiper from 'swiper';
import { Navigation, Pagination, Grid } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/grid';


function initNewsSwiper() {
  let currentDevice = getCurrentDevice();
  let swiper = createSwiper(currentDevice);

  window.addEventListener('resize', () => {
    const newDevice = getCurrentDevice();
    if (newDevice !== currentDevice) {
      currentDevice = newDevice;
      swiper.destroy(true, true);
      swiper = createSwiper(currentDevice);
    } else {
      updateSlideHeights(swiper, currentDevice);
    }
  });
}

function createSwiper(device) {
  reorderSlides();
  const swiper = new Swiper('.news-swiper', {
    modules: [Navigation, Pagination, Grid],
    spaceBetween: getSpace(device),
    direction: 'horizontal',
    slidesPerView: getSlidesPerView(device),
    loop: false,
    grid: {
      rows: getGridRows(device),
      fill: getGridFill(device),
    },
    navigation: {
      nextEl: '.news-swiper-container__button--next',
      prevEl: '.news-swiper-container__button--prev',
    },
    pagination: {
      el: '.news-pagination__wrapper',
      clickable: true,
      type: 'bullets',
      renderBullet: function (index, className) {
        return `<span class="${className}">${index + 1}</span>`;
      },
      bulletClass: 'pagination-bullet',
      bulletActiveClass: 'pagination-bullet-active',
    },
    allowTouchMove: true,
    on: {
      init: function () {
        updateSlideHeights(this, device);
        updatePagination(this);
      },
      slideChange: function () {
        updatePagination(this);
      },
    },
  });

  updatePagination(swiper);
  return swiper;
}

function updateSlideHeights(swiper, device) {
  swiper.slides.forEach((slide, index) => {
    if (device === 'mobile') {
      slide.style.height = index % 2 === 0 ? '330px' : '240px';
    } else if (device === 'tablet') {
      slide.style.height = '350px';
    } else {
      slide.style.height = '400px';
    }
  });
}


function updatePagination(swiper) {
  const totalSlides = swiper.slides.length;
  const currentSlide = swiper.activeIndex + 1;
  const maxVisibleBullets = 4;
  const bullets = document.querySelectorAll('.pagination-bullet');
  let startBullet = 1;
  let endBullet = maxVisibleBullets;

  if (currentSlide <= 3) {
    startBullet = 1;
    endBullet = 4;
  } else if (currentSlide >= totalSlides - 2) {
    startBullet = totalSlides - 3;
    endBullet = totalSlides;
  } else {
    startBullet = currentSlide - 2;
    endBullet = currentSlide + 1;
  }

  bullets.forEach((bullet, index) => {
    const bulletNumber = index + 1;
    if (bulletNumber >= startBullet && bulletNumber <= endBullet) {
      bullet.style.display = 'inline-block';
    } else {
      bullet.style.display = 'none';
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

let originalSlideOrder = [];

function reorderSlides() {
  const slides = document.querySelectorAll('.news-swiper__slide');
  const swiperWrapper = slides[0].parentNode;

  if (originalSlideOrder.length === 0) {
    originalSlideOrder = Array.from(slides);
  }

  const currentDevice = getCurrentDevice();

  if (currentDevice !== 'tablet') {
    originalSlideOrder.forEach((slide) => {
      swiperWrapper.appendChild(slide);
    });
  }

  if (currentDevice === 'tablet') {
    originalSlideOrder.forEach((slide) => {
      swiperWrapper.appendChild(slide);
    });

    const slide2 = slides[1];
    const slide3 = slides[2];

    swiperWrapper.insertBefore(slide3, slide2);
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
      return 20;
  }
}

function getGridFill(device) {
  switch (device) {
    case 'desktop':
      return 'row';
    case 'tablet':
      return 'column';
    case 'mobile':
    default:
      return 'column';
  }
}

function getGridRows(device) {
  switch (device) {
    case 'desktop':
      return 1;
    case 'tablet':
      return 2;
    case 'mobile':
    default:
      return 2;
  }
}

export default initNewsSwiper;
