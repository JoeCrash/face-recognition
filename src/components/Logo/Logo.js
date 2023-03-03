import React from 'react';
import Tilt from 'react-parallax-tilt';
import logo from './logo.png';
const Logo = () => {
    return (
        <div className="center">
            <Tilt className="parallax-effect br3 shadow-3" perspective={500}  style={{ height: '150px', width: '150px' }}>
                <img className='tc' src={logo} alt="Logo" />
            </Tilt>
        </div>
        
    );
}

export default Logo;