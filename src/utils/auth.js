// Authentication utilities
export const AUTH_CREDENTIALS = {
  email: 'info@Kayease.com',
  password: 'Kayease@global.com'
};

// Cookie utilities
export const setCookie = (name, value, minutes) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + (minutes * 60 * 1000));
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict`;
};

export const getCookie = (name) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export const deleteCookie = (name) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

// Authentication functions
export const login = (email, password) => {
  if (email === AUTH_CREDENTIALS.email && password === AUTH_CREDENTIALS.password) {
    const userData = {
      name: 'Admin User',
      email: email,
      role: 'Admin',
      loginTime: new Date().toISOString()
    };
    
    // Store in cookies for 30 minutes
    setCookie('authToken', 'Kayease-admin-token', 30);
    setCookie('userData', JSON.stringify(userData), 30);
    
    // Also store in localStorage as backup
    localStorage.setItem('authToken', 'Kayease-admin-token');
    localStorage.setItem('user', JSON.stringify(userData));
    
    return { success: true, user: userData };
  }
  
  return { success: false, error: 'Invalid email or password' };
};

export const logout = () => {
  // Clear cookies
  deleteCookie('authToken');
  deleteCookie('userData');
  
  // Clear localStorage
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
};

export const isAuthenticated = () => {
  try {
    // Check cookies first
    const cookieToken = getCookie('authToken');
    const cookieUserData = getCookie('userData');
    
    if (cookieToken && cookieUserData) {
      try {
        const userData = JSON.parse(cookieUserData);
        
        // Ensure userData has required fields
        if (!userData.loginTime || !userData.email || !userData.name) {
          logout();
          return { isAuth: false, user: null };
        }
        
        // Check if login is within 30 minutes
        const loginTime = new Date(userData.loginTime);
        const now = new Date();
        const diffMinutes = (now - loginTime) / (1000 * 60);
        
        if (diffMinutes <= 30) {
          return { isAuth: true, user: userData };
        } else {
          // Session expired, clear cookies
          logout();
          return { isAuth: false, user: null };
        }
      } catch (error) {
        console.error('Error parsing cookie user data:', error);
        logout();
        return { isAuth: false, user: null };
      }
    }
    
    // Fallback to localStorage (for backward compatibility)
    const localToken = localStorage.getItem('authToken');
    const localUserData = localStorage.getItem('user');
    
    if (localToken && localUserData) {
      try {
        const userData = JSON.parse(localUserData);
        
        // Ensure userData has required fields
        if (!userData.email || !userData.name) {
          logout();
          return { isAuth: false, user: null };
        }
        
        return { isAuth: true, user: userData };
      } catch (error) {
        console.error('Error parsing localStorage user data:', error);
        logout();
        return { isAuth: false, user: null };
      }
    }
    
    return { isAuth: false, user: null };
  } catch (error) {
    console.error('Error in isAuthenticated:', error);
    return { isAuth: false, user: null };
  }
};

export const requireAuth = (navigate) => {
  const { isAuth } = isAuthenticated();
  if (!isAuth) {
    navigate('/login');
    return false;
  }
  return true;
};