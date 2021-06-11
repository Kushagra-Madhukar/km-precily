import styled, { createGlobalStyle } from 'styled-components'

export const lightTheme = {
    bodyColor: '#fff',
    fontColor: '#000',
    primary: '#000',
    secondary: '#012789',
    stroke: '#DEE4EB',
    placeholder: '#B4B4B4',
    sidePadding: '40px',
    sidePaddingMobile: '8px',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    cardBgColor: '#fff',
    filterTabColor: '#4C4C4C'
}

export const darkTheme = {
    bodyColor: '#000',
    fontColor: '#fff',
    primary: '#fff',
    secondary: '#012789',
    stroke: '#DEE4EB',
    placeholder: '#B4B4B4',
    sidePadding: '40px',
    sidePaddingMobile: '8px',
    shadowColor: 'rgba(255,255,255,0.2)',
    cardBgColor: '#000',
    filterTabColor: '#4C4C4C'
}

export const PaddingContainer = styled.div`
    width: 100%;
    margin: 0 auto;
    @media screen and (min-width: 1023px){
        max-width: 974px;
    }
    @media screen and (min-width: 1300px){
        max-width: 1250px;
    }
    @media screen and (max-width: 1023px){
        padding: 0 1rem;
    }
`

export const GlobalStyles = createGlobalStyle`
    body {
        background-color: ${props => props.theme.bodyColor};
        color: ${props => props.theme.fontColor};
    }
    *{
        margin: 0;
        padding: 0;
        /* font-family: 'Nunito Sans', sans-serif; */
        font-family: 'Ubuntu', sans-serif;
        box-sizing: border-box;
    }
`