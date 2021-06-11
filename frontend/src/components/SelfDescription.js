import React from 'react'
import styled from 'styled-components'

const DescriptMain = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    background-image: linear-gradient(45deg,#ed6336,rgba(206,37,37,0.7));
    align-items: center;
    padding: 1em;
`
const HeadingMain = styled.h2`
    color: ${props => props.theme.bodyColor};
    margin-bottom: 0.3em;
`
const Intro = styled.p`
    padding: 0;
    margin: 0;
    width: 100%;
`
const PortfolioLink = styled.a`
    color: ${props => props.theme.secondary};
    font-size: 1rem;
    margin-top: 2rem;
    text-decoration: none;
`

const SelfDescription = () => {
    return (
        <DescriptMain>
            <HeadingMain>About Me</HeadingMain>
            <Intro>Hi, I am Kushagra Madhukar. A self taught and self motivated web developer. There is a lot I can say about me and my passion. But if you really wanna know, visit my Portfolio from the link given below.</Intro>
            <PortfolioLink href="https://kushagramadhukar.netlify.app/" target="__blank">View My Portfolio Website</PortfolioLink>
        </DescriptMain>
    )
}

export default SelfDescription
