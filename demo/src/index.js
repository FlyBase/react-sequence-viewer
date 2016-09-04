import React from 'react'
import {render} from 'react-dom'

import Component from '../../src'

//const seq = 'MALWMRLLPLLALLALWGPGPGAGSLQPLALEGSLQKRGIVEQCCTSICSLYQLENYCN';
const seq = 'MALWMRLLPLLALLALWGPDPAAAFVNQHLCGSHLVEALYLVCGERGFFYTPKTRREAEDLQVGQVELGGGPGAGSLQPLALEGSLQKRGIVEQCCTSICSLYQLENYCN';

const onClick = (e) => {
    console.log("Region clicked");
}

const mouseClick = (e) => {
    console.log("Mouse Region clicked");
    console.log(e.detail);
}
const subPart = (e) => {
    console.log("Subpart");
    console.log(e.detail);
}
//Coverage list
const exampleSequenceCoverage = [
    {start: 0, end: 25, color: "black", underscore: false, bgcolor: "#ffd891"},
    {start: 25, end: 47, color: "#ff0000", underscore: false, tooltip: "this is a tooltip"},
    {start: 47, end: 54, color: "#ff0000", underscore: true},
    {start: 54, end: 55, color: "#ff0000", underscore: false},
    {start: 55, end: 56, color: "black", underscore: false},
    {start: 56, end: 89, color: "#69CC33", underscore: false, onclick:onClick},
    {start: 89, end: 90, color: "black", underscore: false},
    {start: 90, end: 110, color: "#ff0000", underscore: false}
];

//Define Legend and color codes
const exampleLegend = [
    {name: "Mature Protein", color: "#ff0000", underscore: false},
    {name: "Proteotypic peptide", color: "#69CC33", underscore: false},
    {name: "Synthetic peptide",color: "#fff",underscore: true}
];

let Demo = React.createClass({
    render() {
        return <div>
            <h1>react-sequence-viewer Demo</h1>
            <Component onSubpartSelected={subPart} onMouseSelection={mouseClick} legend={exampleLegend} coverage={exampleSequenceCoverage} id="blah" sequence={seq} showLineNumbers={true} toolbar={true} search={true} badge={false} title="" />
        </div>
  }
})

render(<Demo/>, document.querySelector('#demo'))
