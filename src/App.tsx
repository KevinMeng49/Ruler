import { Component, createSignal } from 'solid-js'
import { Histogram } from "./histograms/Histogram" 
import { Table } from "./table/Table"
import { MatrixArea } from "./matrix/MatrixArea"
import { dataGenerator } from "./data/generator"




const App: Component<{

}> = (props) => {

  const rowNum = 100
  const colNum = 6
  const nominalColNum = 3
  const quantitativeColNum = 3
  const data = dataGenerator(rowNum,nominalColNum,quantitativeColNum)
  

  return (
    
    <div class="flex flex-row m-20px">
      <div class="w-900px flex flex-col">
        <Histogram 
        data={data}
        colNum={colNum}
        nominalColNum={nominalColNum}
        />
        <Table 
        data = {data}/>
      </div>
      <div class="pt-150px flex-1">
        <MatrixArea/>
      </div>
    </div>
  );
};

export default App;
