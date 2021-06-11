import React from 'react'
import styled from 'styled-components'

const ContainerMain = styled.div`
    display: flex;
    background-color: rgb(19, 170, 82);
    height: 100%;
    width: 100%;
    flex-direction: column;
    text-align: center;
    padding: 1em;
`
const HeadingMain = styled.h2`
    color: ${props => props.theme.bodyColor};
    margin-bottom: 0.3em;
`
const TextMain = styled.ol`
    margin: 0 auto;
    background-color: rgb(19, 170, 82);
`

const Points = styled.li`
    color: ${props => props.theme.bodyColor};
    font-size: 0.9rem;
    text-align: left;
`

const ProjectDescription = () => {
    return (
        <ContainerMain>
            <HeadingMain>Highlights</HeadingMain>
            <TextMain>
                <Points>Resizable components</Points>
                <Points>Custom made table</Points>
                <Points>REST API for CRUD operations</Points>
                <Points>Responsive and adaptive layout</Points>
                <Points>MongoDB used as Database</Points>
                <Points>Express on top of Node as Backend</Points>
                <Points>ReactJS for frontend</Points>
                <Points>Styled Components for Styling</Points>
            </TextMain>
        </ContainerMain>
    )
}

export default ProjectDescription
