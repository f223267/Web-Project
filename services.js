$(document).ready(function() {
  // DOM elements
  const $servicesContainer = $('#servicesContainer');
  const $serviceModal = new bootstrap.Modal('#serviceModal');
  const $serviceModalTitle = $('#serviceModalTitle');
  const $serviceModalBody = $('#serviceModalBody');
  const $bookNowBtn = $('#bookNowBtn');
  const $loginBtn = $('#loginBtn');

  // Services data
  const services = [
      {
          icon: 'fas fa-dumbbell',
          title: 'Personal Training',
          description: 'Get 1-on-1 training sessions tailored to your fitness goals with our certified trainers.',
          details: 'Our personal training program includes customized workout plans, progress tracking, and nutritional guidance. Sessions are available in 30, 45, or 60-minute increments.',
          price: 'Starting at $60/session'
      },
      {
          icon: 'fas fa-heartbeat',
          title: 'Cardio Workouts',
          description: 'Improve your stamina with our expert-guided cardio routines using state-of-the-art equipment.',
          details: 'Choose from treadmill, elliptical, cycling, or rowing workouts. Our trainers will help you optimize your cardio sessions for maximum results.',
          price: 'Included in all memberships'
      },
      {
          icon: 'fas fa-utensils',
          title: 'Nutrition Guidance',
          description: 'Personalized diet plans to complement your fitness journey and help you reach your goals faster.',
          details: 'Our nutritionists will create meal plans based on your dietary preferences, fitness goals, and lifestyle. Includes weekly check-ins and adjustments.',
          price: '$100/month (3-month minimum)'
      },
      {
          icon: 'fas fa-user-friends',
          title: 'Group Classes',
          description: 'Join fun and engaging fitness classes for all levels, from beginners to advanced athletes.',
          details: 'We offer HIIT, Zumba, Pilates, Spin, and Bootcamp classes. Schedule varies daily with morning, afternoon, and evening options.',
          price: 'Included in all memberships'
      },
      {
          icon: 'fas fa-spa',
          title: 'Yoga & Relaxation',
          description: 'Rejuvenate your mind and body with expert yoga sessions in our dedicated studio space.',
          details: 'Choose from Vinyasa, Hatha, Yin, or Restorative yoga. All levels welcome. Mats and props provided.',
          price: 'Drop-in $20 or included in premium membership'
      },
      {
          icon: 'fas fa-biking',
          title: 'Strength Training',
          description: 'Enhance your muscle growth with guided strength training programs using free weights and machines.',
          details: 'Our trainers will teach proper form and technique while helping you progressively increase your strength. Programs available for all fitness levels.',
          price: 'Included in all memberships'
      }
  ];

  // Load services
  function loadServices() {
      services.forEach(service => {
          const serviceCard = `
              <div class="col-md-4">
                  <div class="card service-card" data-service='${JSON.stringify(service).replace(/'/g, "\\'")}'>
                      <i class="${service.icon}"></i>
                      <h4>${service.title}</h4>
                      <p>${service.description}</p>
                      <button class="btn btn-custom learn-more-btn">Learn More</button>
                  </div>
              </div>
          `;
          $servicesContainer.append(serviceCard);
      });
  }

  // Show service details
  $(document).on('click', '.learn-more-btn', function() {
      const $card = $(this).closest('.card');
      const serviceData = JSON.parse($card.attr('data-service'));
      
      $serviceModalTitle.text(serviceData.title);
      $serviceModalBody.html(`
          <p>${serviceData.details}</p>
          <p class="text-center mt-3"><strong>${serviceData.price}</strong></p>
      `);
      
      // Update book now button if logged in
      if (localStorage.getItem('isLoggedIn') === 'true') {
          $bookNowBtn.attr('href', 'booking.html?service=' + encodeURIComponent(serviceData.title));
          $bookNowBtn.show();
      } else {
          $bookNowBtn.hide();
      }
      
      $serviceModal.show();
  });

  // Check login status
  function checkLoginStatus() {
      return localStorage.getItem('isLoggedIn') === 'true';
  }

  // Update login button
  function updateLoginButton() {
      const isLoggedIn = checkLoginStatus();
      $loginBtn.text(isLoggedIn ? 'Logout' : 'Login');
      
      if (isLoggedIn) {
          $loginBtn.attr('href', '#').off('click').on('click', function(e) {
              e.preventDefault();
              localStorage.removeItem('isLoggedIn');
              location.reload();
          });
      } else {
          $loginBtn.attr('href', 'login.html');
      }
  }

  // Initialize
  loadServices();
  updateLoginButton();
});