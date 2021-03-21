import React, { useState, useEffect, useRef } from 'react'
import propTypes from 'prop-types'
import arrowRight from './assets/arrow_right.png'
import arrowLeft from './assets/arrow_left.png'
Carousel.propTypes = { slides: propTypes.array }
function Carousel ({ slides }) {
  const [currentPos, setCurrentPos] = useState(0)
  const [addToMovement, setAddToMovement] = useState(0)
  const [elementWidth, setElementWidth] = useState(0)
  const [elementMargin, setElementMargin] = useState(0)
  const slideTotalWidth = elementWidth + elementMargin
  const [swipeTouchPos, setSwipeTouchPos] = useState(0)
  const itemRef = useRef(null)
  const itemsToShow = slides.length - 3

  useEffect(() => {
    if (itemRef.current) {
      const getElementWidth = () => {
        const currentPosElementRect = itemRef.current.getBoundingClientRect()
        setElementWidth(currentPosElementRect.width)
      }
      const getMargin = () => {
        const getRefStyle = window.getComputedStyle(itemRef.current)
        const getMargin = getRefStyle.getPropertyValue('margin-right')
        const getMarginInt = parseFloat(getMargin)
        setElementMargin(getMarginInt * 2)
      }
      const item = new ResizeObserver(entries => {
        // make the buttons work when window is resized
        entries.forEach(entry => {
          getElementWidth()
          getMargin()
          setCurrentPos(0) // if this is not done then slides will fly away when window is resized, I haven't found how to fix it yet
        })
      })
      item.observe(itemRef.current)
      return () => {
        item.unobserve(itemRef.current)
      }
    }
  }, [itemRef.current])
  /**
 * handle start of a swipe
 */
  const handleStart = (e) => {
    if (addToMovement !== currentPos) {
      setAddToMovement(currentPos)
    }
    setSwipeTouchPos(e.targetTouches[0].clientX) // get initial position of a finger
  }
  /**
 * handle movement of a swipe
 */
  const handleMove = (e) => {
    const getMovementDiff = swipeTouchPos - e.targetTouches[0].clientX // get difference between the start of a touch and the final movement

    setCurrentPos(getMovementDiff + addToMovement)
  }
  /**
 * handle end of a swipe
 */
  const handleEnd = () => {
    if (currentPos < slideTotalWidth * itemsToShow) {
      // if user has not reached the most right move as normal
      setAddToMovement(currentPos)
    } else {
      setCurrentPos(slideTotalWidth * itemsToShow) // stop at final slide
      setAddToMovement(currentPos)
    }
    if (currentPos < 0) {
      // disable going left
      setCurrentPos(0)
      setAddToMovement(0)
    }
  }
  const moveToNextSlide = () => {
    if (currentPos > elementWidth * itemsToShow) {
      setCurrentPos(0)
    } else {
      setCurrentPos(currentPos + slideTotalWidth)
    }
  }

  const moveToPrevSlide = () => {
    //
    if (currentPos < elementWidth / 2) {
      setCurrentPos(slideTotalWidth * itemsToShow)
    } else {
      setCurrentPos(currentPos - slideTotalWidth)
    }
  }

  const navigationBar = (value) => () => {
    if (value >= itemsToShow) { // disable last 3 buttons
      setCurrentPos(slideTotalWidth * itemsToShow)
      setAddToMovement(slideTotalWidth * value)
    } else {
      setCurrentPos(slideTotalWidth * value)
      setAddToMovement(slideTotalWidth * value)
    }
  }
  return (
    <div>
      <div className="CarouselWrapper">
        <button style={{ backgroundImage: `url(${arrowLeft})` }} onClick={moveToPrevSlide} className="CarouselButtons">
        </button>
        <div className="CarouselContainer">
          <div
            className="CarouselItemWrapper"
            onTouchStart={handleStart}
            onTouchMove={handleMove}
            onTouchEnd={handleEnd}
            style={{
              // here we set how much slides will be seen, it is hardcoded, 3 is the amount of slides to show
              width: `${slideTotalWidth * 3}px`
            }}
          >
            <div
              className="CarouselItems"
              style={{
                transform: `translate3d(${-currentPos}px, 0px, 0px)`, // '-' sign to make logic more obvious
                transition: 'all 0.5s ease'
              }}
            >
              {slides.map((slide, index) => (
                <div
                  key={index}
                  ref={index === 0 ? itemRef : null}
                  className="CarouselItem"
                  id="item"
                >
                  <div className="CarouselText">{slide.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <button style={{ backgroundImage: `url(${arrowRight})` }} onClick={moveToNextSlide} className="CarouselButtons">
        </button>
      </div>
      <div className="NavBarWrapper">
        {slides.map((slide, index) => (
          <button key={index} onClick={navigationBar(index)} className="NavBar">
            {slide.index}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Carousel
