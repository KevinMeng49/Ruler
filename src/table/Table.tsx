import { Component,createSignal } from "solid-js"
import { TableHead } from "./TableHead"
import { TableBody } from "./TableBody"

export const Table:Component<{
    data:any

}>=(props) => {

    const [fields,setFields] = createSignal<string[]>(["Attr1", "Attr2", "Attr3", "Attr4", "Attr5", "Attr6"])
    


    return (
        <div class="w-full h-800px overflow-scroll">
            <TableHead
            fields={fields()}
            />
            <TableBody
            data={props.data}/>
        </div>
    )
}