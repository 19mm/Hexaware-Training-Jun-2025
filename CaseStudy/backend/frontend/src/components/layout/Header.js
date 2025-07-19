import React, { useEffect, useState } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../../services/AuthService';

const Header = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleLogout = () => {
    AuthService.logout();
    setCurrentUser(undefined);
    navigate('/login');
    window.location.reload();
  };

  const CarIcon = () => (
    <Icon name='car' size='large' style={{ color: '#ffffff', marginRight: '0.5em' }} />
  );

  const menuItemStyle = {
    fontSize: '1.15em',
    padding: '1.2em 1em',
  };

  return (
    <Menu fixed='top' inverted style={{ backgroundColor: '#1240faff', borderRadius: '0' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1.5em',
          color: '#ffffff'
        }}
      >
        {currentUser?.roles?.includes('ADMIN') ? (
          <>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Menu.Item as={Link} to='/admin/dashboard' header style={{ ...menuItemStyle, paddingLeft: 0 }}>
                <CarIcon />
                RoadReady (Admin)
              </Menu.Item>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
              <Menu.Item style={menuItemStyle}>
                <Icon name='user secret' /> {currentUser.email}
              </Menu.Item>
              <Menu.Item onClick={handleLogout} style={{ ...menuItemStyle, cursor: 'pointer' }}>
                Logout
              </Menu.Item>
            </div>
          </>
        ) : (
          <>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Menu.Item as={Link} to='/' header style={{ ...menuItemStyle, paddingLeft: 0 }}>
                <CarIcon />
                RoadReady
              </Menu.Item>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
              <Menu.Item as={Link} to='/' style={menuItemStyle}>Home</Menu.Item>
              <Menu.Item as={Link} to='/browse-cars' style={menuItemStyle}>Browse Cars</Menu.Item>
              {currentUser && (
                <>
                  <Menu.Item as={Link} to='/my-bookings' style={menuItemStyle}>My Bookings</Menu.Item>
                  <Menu.Item as={Link} to='/profile' style={menuItemStyle}>User Profile</Menu.Item>
                </>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
              {currentUser ? (
                <>
                  <Menu.Item style={menuItemStyle}>
                    <Icon name='user circle' /> {currentUser.email}
                  </Menu.Item>
                  <Menu.Item onClick={handleLogout} style={{ ...menuItemStyle, cursor: 'pointer' }}>
                    Logout
                  </Menu.Item>
                </>
              ) : (
                <>
                  <Menu.Item as={Link} to='/login' style={menuItemStyle}>Login</Menu.Item>
                  <Menu.Item
                    as={Link}
                    to='/register'
                    style={{
                      ...menuItemStyle,
                      backgroundColor: 'white',
                      color: '#214EFF',
                      borderRadius: '6px',
                      fontWeight: 'bold',
                      padding: '0.7em 1em',
                      border: '2px solid white',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#1240faff';
                      e.currentTarget.style.color = '#ffffff';
                      e.currentTarget.style.borderColor = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'white';
                      e.currentTarget.style.color = '#1240faff';
                      e.currentTarget.style.borderColor = '#ffffff';
                    }}
                  >
                    Register
                  </Menu.Item>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </Menu>
  );
};

export default Header;