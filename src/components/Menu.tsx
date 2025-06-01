import React from 'react';
import './Menu.css';

const Menu: React.FC = () => {
  return (
    <aside className="menu">
      <ul>
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href="/wills">Wills</a></li>
        <li><a href="/settings">Settings</a></li>
        <li><a href="/logout">Logout</a></li>
      </ul>
    </aside>
  );
};

export default Menu;
