Preview: https://drakoniwe.github.io/Carousel/dist/
# Carousel component
Simple carousel component that works on mobile and desktop!
## Currently supported features:
1. 3 slides on screen.
2. Navigation bar.
3. Swipes for mobile and desktop devices.
4. Snapping to nearest slide.
5. Adding more slides or deleting unneeded.
## Adding more slides
If needed, you can add more slides or even delete ones you do not need (3 is the minimum). Just edit index.js file adding any HTML content to the slide.
Example before:
```
<Carousel>
    <div>Slide 5</div>
    <div>Slide 6</div>
    <div>Slide 7</div>
  </Carousel>,
```
And after:
```
<Carousel>
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
