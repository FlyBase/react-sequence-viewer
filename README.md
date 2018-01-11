# react-sequence-viewer

## Description

A [React](https://facebook.github.io/react/) wrapper around the [BioJS](https://biojs.net/) [sequence-viewer](https://github.com/calipho-sib/sequence-viewer)
component.

## Installation

```
npm install --save react-sequence-viewer
```

## Dependencies

The following are dependencies required by the `sequence-viewer` module that is wrapped
by this React component.

* jQuery 
* Bootstrap CSS

You can either include these into your HTML page or add them to your 
own application build (see usage below).

```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"></link>
```

## Usage

The following code renders a sequence-viewer component in the HTML
element with an ID of 'sequence-viewer1'.

**ES6**

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

// Either uncomment these lines or pull
// in jQuery and Bootstrap into the HTML page of your application.
// The below requires that jQuery/Bootstrap be installed as a dependency
// in your package.json file.
//import jquery from 'jquery';
//window.jQuery = jquery;

//import 'bootstrap/dist/css/bootstrap.min.css';

import ReactSequenceViewer from 'react-sequence-viewer';

const mySeq = 'CAGTCGATCGTAGCTAGCTAGCTGATCGATGC';

ReactDOM.render(
  <ReactSequenceViewer sequence={mySeq} />,
  document.getElementById('#sequence-viewer1')
);
```

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

// Either uncomment these lines or pull
// in jQuery and Bootstrap into the HTML page of your application.
// The below requires that jQuery/Bootstrap be installed as a dependency
// in your package.json file.
//import jquery from 'jquery';
//window.jQuery = jquery;

//import 'bootstrap/dist/css/bootstrap.min.css';

import ReactSequenceViewer from 'react-sequence-viewer';

const mySeq = 'CAGTCGATCGTAGCTAGCTAGCTGATCGATGC';
const options = {
  badge: true,
  search: false,
  showLineNumbers: true,
  title: "my sequence",
  toolbar: false,
};

ReactDOM.render(
  <ReactSequenceViewer sequence={mySeq} {...options} />,
  document.getElementById('#sequence-viewer1')
);
```

## Properties / Options

Please see the [Sequence Viewer documentation](https://cdn.rawgit.com/calipho-sib/sequence-viewer/master/examples/index.html)
for more details on the options below.


| Name | Description | Type | Required | Comment |
|:-----|:------------|------|----------|:--------|
| className | HTML class name to apply to the Sequence Viewer div container | String | No |  |
| coverage | Advanced sequence hightlighting | Array[Objects] | No | Not compatible with `selection` |
| id | The ID to use for the Sequence Viewer container element | String | No |  |
| legend | Adds a legend to the sequence  |  Array[Objects] | No |  |
| onMouseSelection | Event handler for sequence selection with the mouse | function | No |  |
| onSubpartSelected | Event handler for sequence selected via the search box | function | No |  |
| selection | A region to highlight | Array | No | Not compatible with `coverage` |
| sequence | The sequence to render. | String | Yes |  |

[build-badge]: https://img.shields.io/travis/FlyBase/react-sequence-viewer/master.png?style=flat-square
[build]: https://travis-ci.org/FlyBase/react-sequence-viewer

[npm-badge]: https://img.shields.io/npm/v/react-sequence-viewer.png?style=flat-square
[npm]: https://www.npmjs.org/package/react-sequence-viewer

[coveralls-badge]: https://img.shields.io/coveralls/FlyBase/react-sequence-viewer/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/FlyBase/react-sequence-viewer
