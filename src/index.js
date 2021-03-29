import React from 'react'
import ReactDOM from 'react-dom'
import './carousel.css'
import Carousel from './Carousel'

// Put slides here
const slides = [
  <div key="1">Slide 1</div>,
  <div key="2">Slide 2</div>,
  <div key="3">Slide 3 </div>,
  <div key="4">Slide 4 </div>,
  <div key="5">Slide 5 </div>,
  <div key="6">Slide 6 </div>,
  <div key="7">Slide 7 </div>,
  <div key="8">Custom Text</div>,
  <div key="9">
    <button>Custom Text in a button</button>
  </div>,
  <div key="10">
    <img src="https://via.placeholder.com/300/000000/FFFFFF?text=Custom image Slide" />
  </div>
]

ReactDOM.render(<Carousel slides={slides} />, document.getElementById('root'))
