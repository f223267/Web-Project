$(document).ready(function() {
  // Load team data from JSON
  $.getJSON('team-data.json', function(data) {
      initializeTeam(data);
  }).fail(function() {
      // Fallback data if JSON fails to load
      const fallbackData = [
          {
              "image": "t1.jpg",
              "name": "John Doe",
              "position": "Head Trainer & Coach",
              "bio": "Certified personal trainer with 10+ years of experience"
          },
          {
              "image": "t2.jpg",
              "name": "Jane Smith",
              "position": "Nutrition Expert",
              "bio": "Registered dietitian specializing in sports nutrition"
          },
          {
              "image": "t3.jpg",
              "name": "Michael Lee",
              "position": "Yoga & Wellness Coach",
              "bio": "RYT-500 certified yoga instructor with holistic approach"
          }
      ];
      initializeTeam(fallbackData);
  });

  // Initialize team section with data
  function initializeTeam(teamData) {
      const $teamContainer = $('#teamMembers');
      
      teamData.forEach(member => {
          const teamMember = `
              <div class="col-md-4">
                  <div class="team-member">
                      <img src="${member.image}" alt="${member.name}">
                      <h4>${member.name}</h4>
                      <p>${member.position}</p>
                      <p class="bio">${member.bio}</p>
                  </div>
              </div>
          `;
          $teamContainer.append(teamMember);
      });
  }

  // Animation effects
  function animateSections() {
      // About section fade-in
      $('#about').css({
          'opacity': '1',
          'transform': 'translateY(0)'
      });

      // Typewriter effect
      $('.typewriter h2').css('opacity', '1').animate({
          width: '100%'
      }, {
          duration: 2000,
          step: function(now) {
              $(this).css('width', now + '%');
          },
          complete: function() {
              $(this).css('border-right', 'none');
          }
      });

      // Team section appears on scroll
      $(window).scroll(function() {
          const teamOffset = $('#team').offset().top;
          const scrollPos = $(window).scrollTop() + $(window).height() * 0.8;
          
          if (scrollPos > teamOffset) {
              $('#team').css({
                  'opacity': '1',
                  'transform': 'translateY(0)'
              });
          }
      }).scroll(); // Trigger once on load
  }

  // Check login status
  function checkLoginStatus() {
      return localStorage.getItem('isLoggedIn') === 'true';
  }

  // Update login button
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

  // Initialize everything
  animateSections();
  updateLoginButton();
});