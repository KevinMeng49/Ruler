import { Component,For } from "solid-js"

export const TableRow:Component<{
    rowData:any
}>=(props) => {
    return (
        <div class="flex flex-row">
            <For each={props.rowData}>{
                (cellData,index) => (
                    <div class="flex-1 text-center self-center border-1">
                        {cellData}
                    </div>  
                )
            }
            </For>
        </div>
    )
}