import { Component,For } from "solid-js"

export const TableHead:Component<{
    fields:string[]

}>=(props) => {

    
    return (
        <div class="w-full h-30px text-white flex flex-row">
            <For each={props.fields}>{
                (fields,index) => (
                    <div class="h-full flex-1 text-center self-center border-1 border-solid bg-purple-400">{fields}</div>
                )
            }

            </For>

        </div>
    )
}