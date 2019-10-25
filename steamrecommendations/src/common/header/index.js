import React from 'react';
import {
  HeaderWrapper,
  Logo,
  Login,
  Button
} from './style';

import './index.less';


function Header() {
    return (
        <HeaderWrapper>
          <Logo />
          <Login>
            <Button></Button>
          </Login>
        </HeaderWrapper>
      
    );
  }

export default Header;