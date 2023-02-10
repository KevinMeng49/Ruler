import { Component,For } from "solid-js"
import { MatrixDimension } from "./MatrixDimension"

export const MatrixArea:Component<{


}>=(props) => {

    const dimensions = [1,2,3]
    const numByDimension = [4,2,6]
    return (
        <div class="flex flex-row h-800px">
            <For each={dimensions}>{
                (dimension,index) => (
                    <MatrixDimension
                    num={numByDimension[index()]}
                    dimension={dimension}
                    />  
                )
            }
            </For>

        </div>
    )
}