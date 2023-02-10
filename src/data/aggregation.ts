import _ from "lodash"

export const computeBins = (data:any,colNum:number,nominalColNum:number) => {
    const bins:any = []
    for (let i = 0; i < colNum; i++) {    
        const dValues = data.map((d: any[]) => d[i])
        // determine attribute type
        if (i < nominalColNum) {
        const counts = _.countBy(dValues)
        let binIndex = 0;
        for (let key in counts) {
            bins.push({ key: key, count: counts[key], type: "nominal", colIndex: i, binIndex })
            binIndex++
        }
        } 
        else {
            const binNum = 6
            const minDValue = Math.min(...dValues)
            const maxDValue = Math.max(...dValues)
            const interval = (maxDValue - minDValue) / binNum
            for (let j = 0; j < binNum; j++) {
                const min = minDValue + j * interval
                const max = minDValue + (j + 1) * interval
                const maxInBin = (j == binNum - 1)
                const dValuesInBin = !maxInBin ? dValues.filter((d: number) => d >= min && d < max) : dValues.filter((d: number) => d >= min && d <= max)
                bins.push({ 
                key: `${Math.round(min)}-${Math.round(max)}`, 
                count: dValuesInBin.length, 
                min, max, maxInBin, 
                type: "quantitative",
                colIndex: i,
                binIndex: j
                })
            }
        }
    }
    console.log("bins")
    console.log(bins)
    return bins
}


export const isValueInBin = (bin:any, value:any) => {
    if (bin.type == "nominal") {
      if (bin.key == value) return true
    }
    if (bin.type == "quantitative") {
      if (value >= bin.min && value < bin.max) return true
      if (value == bin.max && bin.maxInBin) return true
    }
    return false
}

export const computeLines = (data:any,binGroupsByCol:any,colNum:number) => {
    const lines:any = []
    data.forEach((d: any[]) => {
        for (let i = 0; i < colNum - 1; i++) {
        const value1 = d[i]
        const value2 = d[i + 1]
        const bins1 = binGroupsByCol[i]
        const bins2 = binGroupsByCol[i + 1]

        const line = { leftColIndex: i, rightColIndex: i + 1, leftBinIndex: 0, rightBinIndex: 0 }
        for (let j = 0; j < bins1.length; j++) {
            const bin = bins1[j]
            if (isValueInBin(bin, value1)) line.leftBinIndex = j
        }
        for (let j = 0; j < bins2.length; j++) {
            const bin = bins2[j]
            if (isValueInBin(bin, value2)) line.rightBinIndex = j
        }
        lines.push(line)
        }
    })
    console.log(binGroupsByCol)
    console.log("lines")
    console.log(lines)
    return lines
}

function findAggregatedLineByIndexes(lines:any, leftCol:number, rightCol:number, leftBin:any, rightBin:any) {
    for (const l of lines) {
      if (l.leftColIndex == leftCol && l.rightColIndex == rightCol && l.leftBinIndex == leftBin && l.rightBinIndex == rightBin)
        return l
    }
  }

export const computeAggregatedLines = (data:any,binGroupsByCol:any,colNum:number) => {
    const lines = computeLines(data,binGroupsByCol,colNum)
    // aggregate lines between bars
    const aggregatedLines:any = []
    for (let i = 0; i < colNum - 1; i++) {
        const bins1 = binGroupsByCol[i]
        const bins2 = binGroupsByCol[i + 1]
        for (let j = 0; j < bins1.length; j++) {
        for (let k = 0; k < bins2.length; k++) {
            aggregatedLines.push({ leftColIndex: i, rightColIndex: i + 1, leftBinIndex: j, rightBinIndex: k, count: 0 })
        }
        }
    }
    lines.forEach((l:any) => {
        const aggregatedLine = findAggregatedLineByIndexes(aggregatedLines, l.leftColIndex, l.rightColIndex, l.leftBinIndex, l.rightBinIndex)
        aggregatedLine.count++
    })
    
    console.log("aggregateLines")
    console.log(aggregatedLines)
    return aggregatedLines
}

