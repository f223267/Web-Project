$(document).ready(function() {
  // Load carousel data from JSON file
  $.getJSON('carousel-data.json', function(data) {
      initializeCarousel(data);
  }).fail(function() {
      // Fallback data if JSON fails to load
      const fallbackData = [
          {
              "image": "img3.webp",
              "title": "Welcome to Our Gym",
              "description": "Experience world-class training with professional coaches.",
              "buttons": [
                  {"text": "Explore Services", "action": "explore"},
                  {"text": "Chat Now", "href": "chat.html"}
              ],
              "active": true
          },
          {
              "image": "img1.jpg",
              "title": "Modern Equipment",
              "description": "Stay fit with our high-tech gym machines and personalized workouts.",
              "buttons": [
                  {"text": "Learn More", "action": "explore"},
                  {"text": "Chat Now", "href": "chat.html"}
              ]
          },
          {
              "image": "img2.jpg",
              "title": "Train with Experts",
              "description": "Get guidance from professional trainers for the best results.",
              "buttons": [
                  {"text": "Get Started", "action": "explore"},
                  {"text": "Chat Now", "href": "chat.html"}
              ]
          }
      ];
      initializeCarousel(fallbackData);
  });

  // Initialize carousel with data
  function initializeCarousel(data) {
      const $carouselContainer = $('#carouselItems');
      
      data.forEach((item, index) => {
          const activeClass = item.active ? 'active' : '';
          const buttonsHtml = item.buttons.map(button => {
              if (button.action) {
                  return `<a href="#" class="btn cta-btn" data-action="${button.action}">${button.text}</a>`;
              } else {
                  return `<a href="${button.href}" class="btn chat-btn">${button.text}</a>`;
              }
          }).join('');

          const carouselItem = `
              <div class="carousel-item ${activeClass}">
                  <img src="${item.image}" class="d-block w-100" alt="${item.title}">
                  <div class="carousel-caption">
                      <h1>${item.title}</h1>
                      <p>${item.description}</p>
                      ${buttonsHtml}
                  </div>
              </div>
          `;
          $carouselContainer.append(carouselItem);
      });

      // Initialize carousel
      const carousel = new bootstrap.Carousel('#heroCarousel');
  }

  // Check login status
  function checkLoginStatus() {
      return localStorage.getItem('isLoggedIn') === 'true';
  }

  // Update login button based on status
  function updateLoginButton() {
      const isLoggedIn = checkLoginStatus();
      $('#loginBtn').text(isLoggedIn ? 'Logout' : 'Login');
      
      if (isLoggedIn) {
          $('#loginBtn').attr('href', '#').off('click').on('click', function(e) {
              e.preventDefault();
              localStorage.removeItem('isLoggedIn');
              location.reload();
          });
      } else {
          $('#loginBtn').attr('href', 'login.html');
      }
  }

  // Handle protected actions
  $(document).on('click', '[data-action="explore"]', function(e) {
      e.preventDefault();
      if (!checkLoginStatus()) {
          $('#loginModal').modal('show');
      } else {
          window.location.href = 'services.html';
      }
  });

  // Initialize
  updateLoginButton();
});