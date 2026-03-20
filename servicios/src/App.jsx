import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

import React from 'react';
import AppRoutes from './routes/AppRoutes';

function App() {
return (
<div className="min-h-screen bg-gray-50">
  <AppRoutes />
</div>
);
}

export default App;