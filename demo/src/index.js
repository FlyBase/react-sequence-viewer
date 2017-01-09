import React, { Component } from 'react'
import {render} from 'react-dom'

import MyComponent from '../../src'
import jquery from 'jquery';
window.jQuery = jquery;

import 'bootstrap/dist/css/bootstrap.min.css';

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

const selection = [0,30,'red']

//Coverage list
const exampleSequenceCoverage = [
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

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seq: this.props.seq,
    };
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(e) {
    console.debug('onclick fired');
    this.setState({seq:'CAGTCGTAGTAC'});
  }

  render() {
    return <div>
      <h1>react-sequence-viewer Demo</h1>
      <button onClick={this.handleOnClick}>Click me</button>
      <MyComponent onSubpartSelected={subPart} onMouseSelection={mouseClick} legend={exampleLegend} coverage={exampleSequenceCoverage} sequence={this.state.seq} showLineNumbers={true} toolbar={true} search={true} badge={true} title="My Protein" />
    </div>
  }
}

render(<Demo seq={seq}/>, document.querySelector('#demo'))
