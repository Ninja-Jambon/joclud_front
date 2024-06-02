import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
    </BrowserRouter>
  )
}
