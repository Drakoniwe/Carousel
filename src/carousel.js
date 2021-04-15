import React, { useState, useEffect, useRef } from 'react'
import propTypes from 'prop-types'
import arrowLeft from './assets/arrow_left.png'
function Carousel ({ children }) {
  const [currentPos, setCurrentPos] = useState(0)
  const [addToMovement, setAddToMovement] = useState(0)
  const [elementWidth, setElementWidth] = useState(0)
  const [elementMargin, setElementMargin] = useState(0)
  const slideTotalWidth = elementWidth + elementMargin
  const [mousePos, setMousePos] = useState(0)
  const [mouseDiff, setMouseDiff] = useState(0)
  const [isDown, setIsDown] = useState(false)
  const itemRef = useRef(null)
  const itemsToShow = children.length - 3
  const keyPoint = Math.ceil(mouseDiff / slideTotalWidth)
  const diffNextSlide = slideTotalWidth * keyPoint - mouseDiff

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
   * handle start of a swipe
   */
  const onPointerDown = (e) => {
    if (addToMovement !== currentPos) {
      setAddToMovement(currentPos)
    }
    setIsDown(true)
    setMousePos(e.clientX)
  }

  /**
   * handle movement of a swipe
   */
  const onPointerMove = (e) => {
    if (!isDown) return
    e.preventDefault()
    const getMovementDiff = mousePos - e.clientX
    setCurrentPos(getMovementDiff + addToMovement)
    setMouseDiff(getMovementDiff) // cache movement difference so snapping to nearest slide can be calculated
  }

  /**
   * handle end of a swipe
   */
  const onPointerUp = () => {
    setIsDown(false)
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
    setMouseDiff(0)
  }

  const onPointerLeave = () => {
    setIsDown(false)
    setMouseDiff(0)
    // add snapping if user moves the mouse out of the component
    if (diffNextSlide < slideTotalWidth / 2) {
      setCurrentPos(currentPos + diffNextSlide)
    } else {
      setCurrentPos(currentPos - (slideTotalWidth - diffNextSlide))
    }
    if (currentPos < 0) {
      setCurrentPos(0)
      setAddToMovement(0)
    } else if (currentPos > slideTotalWidth * itemsToShow) {
      setCurrentPos(slideTotalWidth * itemsToShow) // stop at final slide
      setAddToMovement(currentPos)
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
        <div className="CarouselContainer" onPointerLeave={onPointerLeave}>
          <div
            className="CarouselItemWrapper"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            // Pointer events support both mouse and touches
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
              {children.map((slide, index) => (
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
        {children.map((slide, index) => (
          <button key={index} onClick={navigationBar(index)} className="NavBar">
            {slide.index}
          </button>
        ))}
      </div>
    </div>
  )
}
Carousel.propTypes = { children: propTypes.array }
export default Carousel
