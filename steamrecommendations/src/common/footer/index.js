import React from 'react';
import './index.less';
import { FooterWrapper,Button} from './style';

function Footer() {
    return (
        <FooterWrapper >
            Terms and Conditions Apply.@2019 CIS550
            <div>
                <Button>
                {/* <i className="iconfont">&#xf23b;</i> */}
                    <div></div>
                     More Info
                </Button>
            </div>
        </FooterWrapper>
    );
  }

export default Footer;