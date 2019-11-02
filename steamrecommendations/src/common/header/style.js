import styled from 'styled-components';
import logoPic from '../../statics/logo.png';
import loginIcon from '../../statics/password.svg';

export const HeaderWrapper = styled.div`
    position: relative;
    height:60px;
    border-bottom:1px solid #f0f0f0;
    background: #333300;
`;

export const Logo = styled.a.attrs({
    href: '/'
})`
    position: absolute;
    top: 10px;
    left: 0;
    display:inline-block;
    width:144px;
    height:34px;
    background: url(${logoPic});
    background-size:contain;
    alt:"STEAM";
`;


export const Login = styled.div`
    position: absolute;
    right:0;
    top:0;
    height:34px;
`;

export const Button = styled.div`
    float: right;
    margin-top:3px;
    margin-right:15px;
    width:34px;
    height:34px;
    background: url(${loginIcon});
    background-size:contain;
`;

