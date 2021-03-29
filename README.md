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
