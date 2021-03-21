import React from 'react'
import ReactDOM from 'react-dom'
import './carousel.css'
import Carousel from './Carousel'
import { slides } from './slides'

ReactDOM.render(<Carousel slides={slides} />, document.getElementById('root'))
