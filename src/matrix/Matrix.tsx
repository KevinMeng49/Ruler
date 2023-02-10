import { Component,For } from "solid-js"
import * as lodash from "lodash"
export const Matrix:Component<{

}> = (props) => {
    const rowNum = Math.round(Math.random() * 3) + 3
    const colNum = rowNum
    return (
        <div class="flex flex-col mt-20px mb-20px">
            <For each={lodash.range(1,rowNum+1)}>{
                (index)=>(
                    <div class="flex flex-row h-20px">
                        <For each={lodash.range(1,colNum+1)}>{
                            (index) =>(
                                <div class={"w-20px h-20px bg-purple-400 border-1"} style={{opacity:`${Math.random()}`}}></div>
                            )
                        }
                        </For>
                    </div>

                )
            }
            </For>
        </div>

    )
}