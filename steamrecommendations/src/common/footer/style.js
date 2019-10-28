import styled from 'styled-components';
export const FooterWrapper = styled.div`
    text-align: center;
    color: #8f98a0 !important;
    background-color: #101821 !important;
    a {
    color: #c6d4df !important;
    &:hover {
        color: white !important;
    }
    }
`;
export const Button = styled.a.attrs({
    href:"/login"
})`
    href="http://www.dribbble.com/chrisota";
    display: inline-block;
    position: relative;
    padding: 7px 46px;
    top: 0;
    font-size: 20px;
    font-family: "Open Sans", Helvetica;
    border-radius: 4px;
    border-bottom: 1px solid rgba( 28, 227, 125, 0.5 );
    background: rgba( 22, 230, 137, 1 );
    color: #fff;
    box-shadow: 0px 0px 0px rgba( 15, 165, 60, 0.1 );
    -webkit-transform: translateZ(0);
     -moz-transform: translateZ(0);
      -ms-transform: translateZ(0);
          transform: translateZ(0);
  
    -webkit-transition: all 0.2s ease;
        -moz-transition: all 0.2s ease;
        -ms-transition: all 0.2s ease;
            transition: all 0.2s ease;
    :hover {
        top: -10px;
        box-shadow: 0px 10px 10px rgba( 15, 165, 60, 0.2 );
        
        -webkit-transform: rotateX(20deg);
            -moz-transform: rotateX(20deg);
            -ms-transform: rotateX(20deg);
                transform: rotateX(20deg);
    }
    :active {
        top: 0px;
        box-shadow: 0px 0px 0px rgba( 15, 165, 60, 0.0 );
        background: rgba( 20, 224, 133, 1 );
        
    }
`;

