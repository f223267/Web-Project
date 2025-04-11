$(document).ready(function() {
  // DOM elements
  const $loginForm = $('#login-form');
  const $signupForm = $('#signup-form');
  const $loginBtn = $('#loginBtn');
  const $showSignup = $('#show-signup');
  const $showLogin = $('#show-login');
  const $successModal = new bootstrap.Modal('#successModal');
  const $modalMessage = $('#modalMessage');

  // Toggle between login and signup forms
  $showSignup.on('click', function() {
      $loginForm.hide();
      $signupForm.fadeIn(300);
  });

  $showLogin.on('click', function() {
      $signupForm.hide();
      $loginForm.fadeIn(300);
  });

  // Form validation
  function validateForm($form) {
      let isValid = true;
      
      $form.find('[required]').each(function() {
          const $input = $(this);
          const value = $input.val().trim();
          const $feedback = $input.siblings('.invalid-feedback');
          
          if (value === '') {
              $input.addClass('is-invalid');
              $feedback.show();
              isValid = false;
          } else if ($input.attr('type') === 'email' && !isValidEmail(value)) {
              $input.addClass('is-invalid');
              $feedback.text('Please enter a valid email').show();
              isValid = false;
          } else if ($input.attr('id') === 'signup-password' && value.length < 6) {
              $input.addClass('is-invalid');
              $feedback.text('Password must be at least 6 characters').show();
              isValid = false;
          } else {
              $input.removeClass('is-invalid');
              $feedback.hide();
          }
      });
      
      return isValid;
  }

  // Email validation helper
  function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Handle login form submission
  $('#loginForm').on('submit', function(e) {
      e.preventDefault();
      
      if (validateForm($(this))) {
          // Simulate login process (replace with actual AJAX call)
          localStorage.setItem('isLoggedIn', 'true');
          
          // Update login button
          $loginBtn.text('Logout').attr('href', '#');
          
          // Show success message
          $modalMessage.text('You have successfully logged in!');
          $successModal.show();
          
          // Redirect after modal is closed
          $successModal._element.on('hidden.bs.modal', function() {
              window.location.href = 'home.html';
          });
      }
  });

  // Handle signup form submission
  $('#signupForm').on('submit', function(e) {
      e.preventDefault();
      
      if (validateForm($(this))) {
          // Simulate signup process (replace with actual AJAX call)
          const userData = {
              name: $('#full-name').val().trim(),
              email: $('#signup-email').val().trim(),
              password: $('#signup-password').val()
          };
          
          // Save to localStorage (for demo purposes)
          let users = JSON.parse(localStorage.getItem('gymUsers')) || [];
          users.push(userData);
          localStorage.setItem('gymUsers', JSON.stringify(users));
          
          // Show success message and switch to login form
          $modalMessage.text('Account created successfully! Please login.');
          $successModal.show();
          
          // Reset form and show login
          $(this)[0].reset();
          $signupForm.hide();
          $loginForm.show();
      }
  });

  // Logout functionality
  $loginBtn.on('click', function(e) {
      if ($loginBtn.text() === 'Logout') {
          e.preventDefault();
          localStorage.removeItem('isLoggedIn');
          location.reload();
      }
  });

  // Check login status on page load
  if (localStorage.getItem('isLoggedIn') === 'true') {
      $loginBtn.text('Logout').attr('href', '#');
  }

  // Real-time validation
  $('input').on('input', function() {
      const $input = $(this);
      const value = $input.val().trim();
      const $feedback = $input.siblings('.invalid-feedback');
      
      if (value === '') {
          $input.removeClass('is-invalid');
          $feedback.hide();
      } else if ($input.attr('type') === 'email' && !isValidEmail(value)) {
          $input.addClass('is-invalid');
          $feedback.text('Please enter a valid email').show();
      } else if ($input.attr('id') === 'signup-password' && value.length < 6) {
          $input.addClass('is-invalid');
          $feedback.text('Password must be at least 6 characters').show();
      } else {
          $input.removeClass('is-invalid');
          $feedback.hide();
      }
  });
});