Preview: https://drakoniwe.github.io/Carousel/dist/
# Carousel component
Simple carousel component that works on mobile and desktop!
## Currently supported features:
1. 3 slides on screen.
2. Navigation bar.
3. Swipes for mobile devices.
4. Adding more slides or deleting unneeded.
## Adding more slides
If needed, you can add more slides or even delete ones you do not need (3 is the minimum). Just edit index.js file adding any HTML content to the slide.
Example before:
```
const slides = [
  <div key="5">Slide 5 </div>,
  <div key="6">Slide 6 </div>,
  <div key="7">Slide 7 </div>
  ]
```
And after:
```
const slides = [
  <div key="5">Slide 5 </div>,  // do not forget to add a unique key to each slide!
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
```
## Setting up the application
### 1. Setting up a working environment
To setup an environment, you need to have installed LTS version of Node.js & npm.

Open the folder with the project and install all the dependencies using this command:
```
npm install
```
### 2. Starting project in development mode
The app is written in ReactJS and built using the bundler Webpack. To start development mode, run this command:
```
npm run start
``` 
### 3. Starting project in production mode
To start the app for the end user, run this command:
```
npm run build
```
All files for hosting will be stored in dist folder.
