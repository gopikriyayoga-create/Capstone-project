import React, { useState } from 'react';

export default function AuthContainer() {
  // Toggle between 'login' and 'signup' pages
  const [isLoginView, setIsLoginView] = useState(true);
  
  // Single state object to manage all form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Handle errors (e.g., password mismatch)
  const [error, setError] = useState('');

  // 1. Unified change handler for all inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (error) setError('');
  };

  // 2. Submission logic with validation
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isLoginView) {
      // Signup-specific validation: Password matching
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match!");
        return;
      }
      console.log("Account Created:", { 
        name: formData.name, 
        email: formData.email, 
        password: formData.password 
      });
      alert("Success! Account created for " + formData.name);
    } else {
      // Login-specific logic
      console.log("Logging in with:", { 
        email: formData.email, 
        password: formData.password 
      });
      alert("Success! Logged in as " + formData.email);
    }
  };

  return (
    <section className='flex flex-col lg:flex-row min-h-screen items-center justify-center  p-4'>
      
      {/* Form Container */}
      <div className='w-full max-w-md bg-[#10212b]  text-white p-8 rounded-2xl shadow-2xl lg:rounded-r-none'>
        
        {/* Header/Logo */}
        <div className='flex items-center gap-3 mb-10 justify-center lg:justify-start'>
          <img src="src/Logo.png" alt="logo" className="w-10 h-10 object-contain"/>
          <h1 className='text-3xl font-bold tracking-tight'>Crypto</h1>
        </div>

        <div className='mb-8'>
          <h2 className='text-2xl font-semibold'>
            {isLoginView ? 'Login' : 'Create Account'}
          </h2>
          <p className='text-blue-200 mt-2 text-sm'>
            {isLoginView ? "Don't have an account?" : "Already have an account?"}
            <button 
              type="button"
              onClick={() => { setIsLoginView(!isLoginView); setError(''); }} 
              className='ml-1 font-bold underline hover:text-white transition'
            >
              {isLoginView ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>

        {/* Display Validation Error */}
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 p-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className='space-y-5'>
          {/* Create Account Fields */}
          {!isLoginView && (
            <div className='flex flex-col space-y-1'>
              <label className='text-xs font-bold uppercase text-blue-300'>Full Name</label>
              <input 
                type="text" name="name" required
                value={formData.name} onChange={handleChange}
                className='bg-blue-800 border border-blue-700 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-400'
                placeholder="Enter your name"
              />
            </div>
          )}

          {/* Shared Fields */}
          <div className='flex flex-col space-y-1'>
            <label className='text-xs font-bold uppercase text-blue-300'>E-mail</label>
            <input 
              type="email" name="email" required
              value={formData.email} onChange={handleChange}
              className='bg-blue-800 border border-blue-700 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-400'
              placeholder="name@email.com"
            />
          </div>

          <div className='flex flex-col space-y-1'>
            <label className='text-xs font-bold uppercase text-blue-300'>Password</label>
            <input 
              type="password" name="password" required
              value={formData.password} onChange={handleChange}
              className='bg-blue-800 border border-blue-700 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-400'
              placeholder="••••••••"
            />
          </div>

          {/* Create Account Confirmation Field */}
          {!isLoginView && (
            <div className='flex flex-col space-y-1'>
              <label className='text-xs font-bold uppercase text-blue-300'>Confirm Password</label>
              <input 
                type="password" name="confirmPassword" required
                value={formData.confirmPassword} onChange={handleChange}
                className='bg-blue-800 border border-blue-700 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-400'
                placeholder="Repeat your password"
              />
            </div>
          )}

          <button 
            type="submit"
            className='w-full bg-white text-blue-900 font-bold py-3 rounded-lg hover:bg-blue-50 active:scale-95 transition-all shadow-md mt-4'
          >
            {isLoginView ? 'Login' : 'Create account'}
          </button>
        </form>
      </div>

      {/* Hero Image (Desktop Only) */}
      <div className='hidden lg:block w-full max-w-md h-120 overflow-hidden rounded-r-2xl shadow-2xl'>
        <img src="Login.png" alt="Crypto App" className='w-full h-full object-cover' />
      </div>
    </section>
  );
}
