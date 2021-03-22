Preview: https://drakoniwe.github.io/Carousel/dist/
# Carousel component
Simple carousel component that works on mobile and desktop!
## Currently supported features:
1. 3 slides on screen.
2. Navigation bar.
3. Swipes for mobile devices.
4. Adding more slides or deleting unneeded.
## Adding more slides
If needed, you can add more slides or even delete ones you do not need (3 is the minimum). Just edit Slides.js file adding a title to the slide.
Example before:
```
export const slides = [
  {
    title: 'Slide 1'
  }
```
And after:
```
export const slides = [
  {
    title: 'Hello'
  },                    // <- don't forget the comma!
  {
    title: 'World'
  }
]
```
## Setting up the application
