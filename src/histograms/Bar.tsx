import { Component,For } from "solid-js"
import * as d3 from "d3"

export const Bar:Component<{
    barData:any,                    
    barHeight:number,
    barWidthScale:d3.ScaleLinear<number, number>,
    barSpacing:number
}> = (props) => {
    return (
        <>
            <rect
            width = {Number(props.barWidthScale(props.barData.count))}
            height = {Number(props.barHeight)}
            style = {{transform:`translate(0px, ${props.barData.binIndex * (props.barHeight + props.barSpacing)}px)`,fill:"#b37feb"}}
            >
            </rect>
            <text
            dominant-baseline="middle"
            x="5"
            y={props.barData.binIndex * (props.barHeight + props.barSpacing) + 0.5 * props.barHeight}
            style={{fill:"#fff"}}>
            {props.barData.key}

            </text>
        </>
    )
}