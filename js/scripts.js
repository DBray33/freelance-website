document.addEventListener('DOMContentLoaded', function () {
  const serviceItems = document.querySelectorAll('.service-item');

  serviceItems.forEach((item) => {
    item.addEventListener(
      'touchstart',
      function () {
        serviceItems.forEach((el) => el.classList.remove('service-item-hover'));
        this.classList.add('service-item-hover');
      },
      { passive: true }
    ); // Added passive: true
  });

  document.addEventListener(
    'touchstart',
    function (event) {
      if (!event.target.closest('.service-item')) {
        serviceItems.forEach((el) => el.classList.remove('service-item-hover'));
      }
    },
    { passive: true }
  ); // Added passive: true
});

// Define the handleScroll function
function handleScroll(event) {
  // Your scroll handling logic here
  console.log('Scroll event detected');
}

// Add event listener for wheel events on the entire document
document.addEventListener('wheel', handleScroll, { passive: false }); // PreventDefault requires passive: false

// Handle touch events for scrolling on smaller screens
let touchStartY = 0;

// Define sidebarContent and mainContent
const sidebarContent = document.querySelector('.sidebar-content');
const mainContent = document.querySelector('.main-content');

if (sidebarContent && mainContent) {
  sidebarContent.addEventListener(
    'touchstart',
    function (event) {
      touchStartY = event.touches[0].clientY;
    },
    { passive: true }
  ); // Added passive: true

  sidebarContent.addEventListener(
    'touchmove',
    function (event) {
      const touchEndY = event.touches[0].clientY;
      const deltaY = touchStartY - touchEndY;

      mainContent.scrollBy({
        top: deltaY,
        behavior: 'auto', // Use 'smooth' for smooth scrolling, or 'auto' for instant
      });

      touchStartY = touchEndY;
    },
    { passive: true }
  ); // Added passive: true
}

// Add media query to handle scroll behavior for smaller screens
function handleResize() {
  if (window.innerWidth <= 935) {
    document.removeEventListener('wheel', handleScroll);
  } else {
    document.addEventListener('wheel', handleScroll, { passive: false });
  }
}

// Initial check
handleResize();

// Add event listener for window resize
window.addEventListener('resize', handleResize, { passive: true }); // Added passive: true

// /////////////////////////////////////////////////////
// GUIDE HEADING ANIMATION /////////////////////////////

// /////////////////////////////////////////////////////
// PORTFOLIO ITEM TRANSITION /////////////////////////////
// /////////////////////////////////////////////////////
// SERVICE ITEM SCROLL TRANSITION /////////////////////////////
document.addEventListener('DOMContentLoaded', function () {
  const serviceItems = document.querySelectorAll('.service-item');

  const observerOptions = {
    root: null, // Viewport as container
    threshold: 0.2, // Trigger when 20% of element is visible
  };

  const observerCallback = (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.style.animationDelay = `${index * 0.4}s`;
        entry.target.classList.add('expand-up');
      } else {
        entry.target.classList.remove('expand-up');
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  serviceItems.forEach((item) => observer.observe(item));
});
