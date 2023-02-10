import { Component } from "solid-js"

export const Line:Component<{
    lineData:any,
    lineWidthScale:d3.ScaleLinear<number,number>,
    barHeight:number,
    barWidthScale:d3.ScaleLinear<number,number>,
    barSpacing:number,
    binsByCol:any,
    gWidth:number
}> = (props) => {

    const width = props.lineWidthScale(props.lineData.count)
    const leftX = props.barWidthScale(props.binsByCol[props.lineData.leftBinIndex].count)
    const leftY = props.lineData.leftBinIndex * (props.barHeight + props.barSpacing) + 0.5 * props.barHeight
    const rightX = props.gWidth
    const rightY = props.lineData.rightBinIndex * (props.barHeight + props.barSpacing) + 0.5 * props.barHeight
    return (
        <line
            x1={leftX}
            y1={leftY}
            x2={rightX}
            y2={rightY}
            stroke="#9254de"
            stroke-width={width}
            >
        </line>
    )
}