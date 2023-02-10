import { Component,For } from "solid-js"
import { Flow } from "./Flow"
import  _ from "lodash"
import * as lodash from "lodash"
import { computeBins } from '../data/aggregation'
import { computeAggregatedLines } from "../data/aggregation" 

export const Histogram:Component<{
    data:any,
    colNum:number,
    nominalColNum:number

}>=(props) => {

    const bins = computeBins(props.data,props.colNum,props.nominalColNum)
    const binGroupsByCol = _.groupBy(bins, "colIndex")
    const aggregatedLines = computeAggregatedLines(props.data,binGroupsByCol,props.colNum)
    const gWidth = 150


    return (
        <div class="w-full h-150px">
            <svg width="900">
                <For each={lodash.range(0,props.colNum)}>{
                    (num,index) => (
                        <Flow
                        binsByCol = {binGroupsByCol[num]}
                        aggregatedLines = {aggregatedLines}
                        colNum = {props.colNum}
                        index = {num}
                        gWidth = {gWidth}
                        />
                )
                }
                </For>
            </svg>
        </div>
    )
}