// Define the routes and their corresponding HTML files
const routess = {
  '/':"/FLOATING-Chat/UI-API-Chat.html",
    '/home': '/FLOATING-Chat/home.html',
    '/about': '/FLOATING-Chat/about.html',
    '/contact': '/FLOATING-Chat/contact.html',
  };
  
  
  // Function to load content into the #app container
  const loadContent = async (path) => {
    try {
      const response = await fetch(path);
      if (!response.ok) throw new Error('Page not found');
      const content = await response.text();
      document.getElementById('app').innerHTML = content;
    } catch (error) {
      document.getElementById('app').innerHTML = '<h2>404 - Page Not Found</h2>';
    }
  };
  
  const toggleNavbar = (path) => {
    const navbar = document.getElementById('navbar');
    if (path === '/' || path === '/FLOATING-Chat/UI-API-Chat.html') {
      navbar.style.display = 'block'; // Show navbar on the main page
    } else {
      navbar.style.display = 'none'; // Hide navbar on other pages
    }
  };
  // Function to handle navigation
  const navigateTo = (url) => {
    history.pushState(null, null, url); // Update the URL in the browser
    handleRoute(); // Handle the route change
  };
  
  // Function to handle route changes
  const handleRoute = () => {
    const path = window.location.pathname; // Get the current path
    console.log(path);
    
    const route = routess[path]; // Find the corresponding route
    console.log('====================================');
    console.log(route);
    console.log('====================================');
    toggleNavbar(path);
    const currentPath = document.getElementById('app').getAttribute('data-current-path');
  if (currentPath === path) {
    console.log('Content is already loaded, skipping reload.');
    return;
  }

  if (route) {
    loadContent(route);
    document.getElementById('app').setAttribute('data-current-path', path);
  } else {
    document.getElementById('app').innerHTML = '<h2>404 - Page Not Found</h2>';
    document.getElementById('app').setAttribute('data-current-path', '404');
  }
  };
  
  // Set up event listeners for navigation
  document.addEventListener('click', (e) => {
    console.log('====================================');
    console.log(e);
    console.log('====================================');
    if (e.target.matches('[data-link]')) {
      e.preventDefault(); // Prevent default link behavior
      navigateTo(e.target.href); // Navigate to the link's href
    }
  });
  
  // Listen for browser navigation (back/forward buttons)
  window.addEventListener('popstate', handleRoute);
  
  // Load the initial route
  window.addEventListener('load', handleRoute);
  