import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * Primary navigation bar.  Uses NavLink from React Router to apply an active
 * style when a route is selected.  The neon gradient text emphasises the
 * DualCast brand and anchors the UI to the dark neon frosted theme.
 */
export default function Navigation() {
  const linkBase = 'px-3 py-2 rounded-md text-sm font-medium hover:text-neon-teal';
  const activeClass = 'text-neon-teal underline';
  return (
    <header className="bg-studio-bg/80 backdrop-blur sticky top-0 z-50 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <h1 className="font-bold text-xl sm:text-2xl neon-text select-none">DualCast AI Studio</h1>
        <nav className="flex space-x-4">
          <NavLink to="/" className={({ isActive }) => `${linkBase} ${isActive ? activeClass : ''}`}>Library</NavLink>
          <NavLink to="/create" className={({ isActive }) => `${linkBase} ${isActive ? activeClass : ''}`}>Create</NavLink>
          <NavLink to="/studio" className={({ isActive }) => `${linkBase} ${isActive ? activeClass : ''}`}>Live Studio</NavLink>
          <NavLink to="/settings" className={({ isActive }) => `${linkBase} ${isActive ? activeClass : ''}`}>Host Settings</NavLink>
        </nav>
      </div>
    </header>
  );
}