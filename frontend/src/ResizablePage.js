import { Resizable } from "re-resizable";
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import TablePage from "./components/MainTable";
import ProjectDescription from "./components/ProjectDescription";
import SelfDescription from "./components/SelfDescription";
import useWindowSize from "./Hooks/useWindowSize";

const VERTICAL_MARGIN = 20
const HORIZONTAL_MARGIN = 20
const FIRST = 'first'
const SECOND = 'second'
const THIRD = 'third'

const BoxContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
`
const TopBox = styled.div`
    display: flex;
    height: ${props => props.height};
    margin-bottom: ${`${VERTICAL_MARGIN}px`};
    &:nth-child(2){
        margin-left: 1em;
    }
`
const ResizableBox = styled(Resizable)`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #d3d3d3;
    background-color: #fff;
    margin-right: ${props => props.isMarginRight ? `${HORIZONTAL_MARGIN}px` : 0};
`
const ResizablePage = () => {
    const [windowHeight, windowWidth] = useWindowSize()
    const [height, setHeight] = useState({top: 300, bottom: 400})
    const [width, setWidth] = useState({first: windowWidth/2 - 50, second: windowWidth/2 - HORIZONTAL_MARGIN - 50})

    useEffect(() => {
        if(windowWidth < 400)
        setWidth({first: windowWidth/2 - 10, second: windowWidth/2 - HORIZONTAL_MARGIN - 10})
        else
        setWidth({first: windowWidth/2 - 30, second: windowWidth/2 - HORIZONTAL_MARGIN - 30})
        return () => {
            
        }
    }, [windowWidth])

    function resizeHandler(direction, d, type){
        if(type === FIRST){
            switch (direction) {
                case 'left':
                    setWidth(width => ({...width, first: width.first + d.width}))//
                    break;
                case 'top':
                    setHeight(height => ({...height, top: height.top + d.height}))//
                    break;
                case 'right':
                    setWidth(width => ({...width, first: width.first + d.width})) //
                    break;
                case 'bottom':
                    setHeight(height => ({...height, top: height.top + d.height}))//
                    break;
                default:
                    break;
            }
        }
        else if(type === SECOND){
            switch (direction) {
                case 'left': 
                    setWidth(width => ({first: width.first - d.width, second: width.second + d.width}))//
                    break;
                case 'top':
                    setHeight(height => ({...height, top: height.top + d.height}))//
                    break;
                case 'right':
                    setWidth(width => ({...width, second: width.second + d.width}))//
                    break;
                case 'bottom':
                    setHeight(height => ({...height, top: height.top + d.height}))//
                    break;
                default:
                    break;
            }
        }
        else if(type === THIRD){
            switch (direction) {
                case 'left':
                    setWidth(width => {
                        if(width.first + d.width > 0)
                        return {...width, first: width.first + d.width}
                        else return {...width}
                    }) //
                    break;
                case 'top': 
                    setHeight(height => {
                        if(height.top - d.height > 0)
                        return {top: height.top - d.height, bottom: height.bottom + d.height}
                        else return {top: 0, bottom: height.bottom}
                    }) //
                    break;
                case 'right':
                    setWidth(width => {
                        if(width.second + d.width > 0)
                        return {...width, second: width.second + d.width}
                        else return {...width, second: 0}
                    }) //
                    break;
                case 'bottom':
                    setHeight(height => ({...height, bottom: height.bottom + d.height})) //
                    break;
                default:
                    break;
            }
        }
    }

    return(
        <BoxContainer>
            <TopBox height={height.top}>
                <ResizableBox
                    isMarginRight={true}
                    size={{width: width.first, height: height.top}}
                    onResizeStop={(e, direction, ref, d) => resizeHandler(direction, d, FIRST)}
                >
                    <div style={{overflow: 'scroll', height: '100%', width: '100%'}}>
                    <ProjectDescription/>
                    </div>
                </ResizableBox>
                <ResizableBox
                    size={{width: width.second, height: height.top}}
                    onResizeStop={(e, direction, ref, d) => {
                        resizeHandler(direction, d, SECOND)
                    }}
                >                   
                     <div style={{overflow: 'scroll', height: '100%', width: '100%'}}>
                    <SelfDescription/>
                    </div>
                </ResizableBox>
            </TopBox>
            <ResizableBox
                size={{width: width.second + width.first + HORIZONTAL_MARGIN, height: height.bottom}}
                    onResizeStop={(e, direction, ref, d) => {
                    resizeHandler(direction, d, THIRD)
                }}
            > 
            <div style={{overflow: 'scroll', height: '100%', width: '100%'}}>
            <TablePage/>
            </div>
            </ResizableBox>
        </BoxContainer>
    )
};

export default ResizablePage