import React, { useState, useEffect, useRef } from 'react'
import propTypes from 'prop-types'
import arrowLeft from './assets/arrow_left.png'
Carousel.propTypes = { slides: propTypes.array }

function Carousel ({ slides }) {
  const [currentPos, setCurrentPos] = useState(0)
  const [addToMovement, setAddToMovement] = useState(0)
  const [elementWidth, setElementWidth] = useState(0)
  const [elementMargin, setElementMargin] = useState(0)
  const slideTotalWidth = elementWidth + elementMargin
  const [swipeTouchPos, setSwipeTouchPos] = useState(0)
  const [movementDiff, setMovementDiff] = useState(0)
  const [mousePos, setMousePos] = useState(0)
  const [mouseDiff, setMouseDiff] = useState(0)
  const [isDown, setIsDown] = useState(false)
  const itemRef = useRef(null)
  const itemsToShow = slides.length - 3
  const keyPoint = Math.ceil(movementDiff / slideTotalWidth)
  const keyPointMouseScroll = Math.ceil(mouseDiff / slideTotalWidth) // definition of a new formula is needed because touch events..
  const diffNextSlide = slideTotalWidth * keyPoint - movementDiff // ..use targetTouches[0].clientX instead of clientX
  const diffNextSlideMouse = slideTotalWidth * keyPointMouseScroll - mouseDiff

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
      // eslint-disable-next-line no-undef
      const item = new ResizeObserver((entries) => {
        // make the buttons work when window is resized
        entries.forEach((entry) => {
          getElementWidth()
          getMargin()
          setCurrentPos(0) // start from beginning when window is resized so component works correctly
        })
      })
      item.observe(itemRef.current)
      return () => {
        item.unobserve(itemRef.current)
      }
    }
  }, [itemRef.current])

  /**
   * handle mouse drag, using Pointer events caused swipes on mobile to be wacky so I stuck to separate logic
   */
  const onMouseDown = (e) => {
    if (addToMovement !== currentPos) {
      setAddToMovement(currentPos)
    }
    setIsDown(true)
    setMousePos(e.clientX)
  }

  const onMouseMove = (e) => {
    if (!isDown) return
    e.preventDefault()
    const getMouseDiff = mousePos - e.clientX
    setCurrentPos(getMouseDiff + addToMovement)
    setMouseDiff(getMouseDiff) // cache movement difference so snapping to nearest slide can be calculated
  }

  const onMouseUp = () => {
    setIsDown(false)
    if (currentPos < slideTotalWidth * itemsToShow) {
      // if user has not reached the most right move as normal
      setAddToMovement(currentPos)
      // snap to nearest slide
      if (diffNextSlideMouse < slideTotalWidth / 2) {
        setCurrentPos(currentPos + diffNextSlideMouse)
      } else {
        setCurrentPos(currentPos - (slideTotalWidth - diffNextSlideMouse))
      }
    } else {
      setCurrentPos(slideTotalWidth * itemsToShow) // stop at final slide
      setAddToMovement(currentPos)
    }
    if (currentPos < 0) {
      // disable going left
      setCurrentPos(0)
      setAddToMovement(0)
    }
    setMouseDiff(0)
  }

  const onPointerLeave = () => {
    setIsDown(false)
    setMouseDiff(0)
    // add snapping if user moves the mouse out of the component
    if (diffNextSlideMouse < slideTotalWidth / 2) {
      setCurrentPos(currentPos + diffNextSlideMouse)
    } else {
      setCurrentPos(currentPos - (slideTotalWidth - diffNextSlideMouse))
    }
    if (currentPos < 0) {
      setCurrentPos(0)
      setAddToMovement(0)
    } else if (currentPos > slideTotalWidth * itemsToShow) {
      setCurrentPos(slideTotalWidth * itemsToShow) // stop at final slide
      setAddToMovement(currentPos)
    }
  }
  /**
   * handle start of a swipe
   */
  const handleStart = (e) => {
    if (addToMovement !== currentPos) {
      setAddToMovement(currentPos)
    }
    e.preventDefault()
    setSwipeTouchPos(e.targetTouches[0].clientX) // get initial position of a finger
  }
  /**
   * handle movement of a swipe
   */
  const handleMove = (e) => {
    const getMovementDiff = swipeTouchPos - e.targetTouches[0].clientX // get difference between the start of a touch and the final movement
    setCurrentPos(getMovementDiff + addToMovement)
    setMovementDiff(getMovementDiff) // cache movement difference so snapping to nearest slide can be calculated
  }
  /**
   * handle end of a swipe
   */
  const handleEnd = (e) => {
    e.preventDefault()
    if (currentPos < slideTotalWidth * itemsToShow) {
      // if user has not reached the most right move as normal
      setAddToMovement(currentPos)
      // snap to nearest slide
      if (diffNextSlide < slideTotalWidth / 2) {
        setCurrentPos(currentPos + diffNextSlide)
      } else {
        setCurrentPos(currentPos - (slideTotalWidth - diffNextSlide))
      }
    } else {
      setCurrentPos(slideTotalWidth * itemsToShow) // stop at final slide
      setAddToMovement(currentPos)
    }
    if (currentPos < 0) {
      // disable going left
      setCurrentPos(0)
      setAddToMovement(0)
    }

    setMovementDiff(0)
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
    if (value >= itemsToShow) {
      // disable last 3 buttons
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
        <button
          style={{ backgroundImage: `url(${arrowLeft})` }}
          onClick={moveToPrevSlide}
          className="CarouselButtons"
        />
        <div className="CarouselContainer" onMouseLeave={onPointerLeave}>
          <div
            className="CarouselItemWrapper"
            onTouchStart={handleStart}
            onTouchMove={handleMove}
            onTouchEnd={handleEnd}
            //
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
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
                  {slide}
                </div>
              ))}
            </div>
          </div>
        </div>
        <button
          style={{
            transform: 'scaleX(-1)',
            backgroundImage: `url(${arrowLeft})`
          }}
          onClick={moveToNextSlide}
          className="CarouselButtons"
        />
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
