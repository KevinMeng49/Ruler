import { Component,For,Show } from "solid-js"
import { Line } from "./Line"
import { Bar } from "./Bar"
import * as d3 from "d3"
import _ from "lodash"

export const Flow:Component<{
    binsByCol:any[],
    aggregatedLines:any,
    colNum:number,
    index:number,
    gWidth:number


}> = (props) => {
    

    const barHeight = 20
    const maxBarWidth = 100
    const barSpacing = 2

    const minBinValue = 0

    const minLineWidth = 0
    const maxLineWidth = 4
    
    const maxBinValue = () => {
        let maxBinValue = 0
        for(let i=0;i<props.binsByCol?.length??0;i++){
            if(props.binsByCol[i].count > maxBinValue){
                maxBinValue = props.binsByCol[i].count
            }
        }
        return maxBinValue
    }
    const barWidthScale = d3.scaleLinear().domain([minBinValue, maxBinValue()]).range([0, maxBarWidth])

    const linesByCol = props.aggregatedLines.filter((l:any) => l.leftColIndex == props.index)
    const minLineCount = 0
    const maxLineCount = ()=>{
        let maxLineCount = 0
        for(let i=0;i<linesByCol?.length??0;i++){
            if(linesByCol[i].count > maxLineCount){
                maxLineCount = linesByCol[i].count
            }
        }
        console.log("maxLineCount")
        console.log(maxLineCount)
        return maxLineCount

    }
    const lineWidthScale = d3.scaleLinear().domain([minLineCount,maxLineCount()]).range([minLineWidth, maxLineWidth])

    return (
        <>
            <g style={{transform:`translate(${props.index * props.gWidth}px, 0px)`}}>
                <For each={props.binsByCol}>{
                    (barData,index) => (
                        <Bar
                        barData={barData}
                        barHeight={barHeight}
                        barWidthScale={barWidthScale}
                        barSpacing={barSpacing}
                        />
                    )
                }
                </For>
            </g>
            <Show when={props.index!=props.colNum-1}>
                <g style={{transform:`translate(${props.index * props.gWidth}px, 0px)`}}>
                    <For each={linesByCol}>{
                        (lineData,index) => (
                            <Line
                            lineData={lineData}
                            lineWidthScale={lineWidthScale}
                            barHeight={barHeight}
                            barWidthScale={barWidthScale}
                            barSpacing={barSpacing}
                            binsByCol={props.binsByCol}
                            gWidth={props.gWidth}
                            />
                        )
                    }
                    </For>


                </g>
            </Show>
        </>

    )
}