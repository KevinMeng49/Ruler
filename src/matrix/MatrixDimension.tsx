import { Component,For } from "solid-js"
import { Matrix } from "./Matrix"
import * as lodash from "lodash"

export const MatrixDimension:Component<{
    num:number,
    dimension:number
}> = (props) => {

    


    return (
        <div class="w-200px flex flex-col pl-30px pr-30px overflow-scroll">
            <div class="font-bold">{props.dimension}d matrices</div>
            <For each={lodash.range(1,props.num+1)}>{
                (index)=>(
                    <Matrix/>
                )
            }
            </For>

        </div>
    )
}