import React from 'react'
import ReactDOM from 'react-dom'
import './carousel.css'
import Carousel from './Carousel'

ReactDOM.render(
  <Carousel>
    <div>Slide 1</div>
    <div>Slide 2</div>
    <div>Slide 3</div>
    <div>Slide 4</div>
    <div>Slide 5</div>
    <div>Slide 6</div>
    <div>Slide 7</div>
    <div>Custom Text</div>
    <div>
      <button>Custom Text in a button</button>
    </div>
    <div>
      <img src="https://via.placeholder.com/300/000000/FFFFFF?text=Custom image Slide" />
    </div>
  </Carousel>,
  document.getElementById('root')
)
