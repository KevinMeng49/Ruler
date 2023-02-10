import { Component,For } from "solid-js"
import { TableRow } from "./TableRow"

export const TableBody:Component<{
    data:any
}>=(props) => {
    return (
        <div class="w-full h-770px">
            <For each={props.data}>{
                (rowData,index) => (
                    <TableRow
                    rowData={rowData}
                    />
                )
            }
            </For>
        </div>
    )
}