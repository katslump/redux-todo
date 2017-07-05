# Todo react with redux

 Last week we built our first end to end React Todo App. This week we will build a similar Todo app but this time we use Redux! In this repo exists a functioning vanilla React Todo app like the one you built before. Our goal is to take this working app and migrate the code base so that all our state is managed by Redux. Along the way we will learn how to structure a simple Redux app and some more about the cast of characters in a typical application. Remember Redux is not something that can be mastered in a day or even a week! It is not inherently difficult so you don't need to worry that you will never get it.  Be patient and enjoy the journey.

## Step 0 Checking our starting point

 Clone this repo and get the app to run as is. Notice that the `package.json` has a `npm start` script that runs the `webpack-dev-server`. Don't forget to `npm install`! Once you are done you should be able to play around with it. Be sure to look at the code and familiarize yourself with its inner workings.

 ![](https://cl.ly/3b3V1e2l3629/Screen%20Recording%202017-07-04%20at%2010.02%20PM.gif)

## Step 1 Preparing for Redux

 Now that our app is up and running lets take a look at what needs to be done for our migration to redux. The first thing we will need to do is setup our folders to house actions, reducers, and components. Since the components folder already exists lets start by creating the reducers folder and the actions folder in the same directory that the current components folder sits in. Once you are done creating the folders create two blank `index.js` files. One in the reducers directory and one in actions directory. The file in reducers folder will be where we define our root reducer. The root reducer is where you would normally combine all your reducers so that when you call `createStore` you only need to pass in the combined reducer. Since the Todo App we are building will only have one reducer we will just write it directly in the `index.js` file. Meanwhile, the `index.js` file in the actions folder will house our "action creators". Action creators are convenience functions that return actions. More on action creators below. 
 
 ![](https://cl.ly/3A2i253d2B2k/Screen%20Shot%202017-07-04%20at%2010.30.15%20PM.png) 
 
## Step 2 Action Creators

 Action creators seem strange at first. Why do I want a function that returns the action instead of just creating the action directly? It turns out to be quite useful in many programming situations to make everything into functions. See the note below if you are interested. Today we will just be using action creators as a convenient starting point to implementing any feature in redux.
 
 Lets get our feet wet by opening the `index.js` file inside the actions folder and adding an action creator for the `ADD_TODO` action that will be responsible for new todos. Since an action object must contain everything needed by the reducer to take the current state to the next state we must remember to include the text of the new todo, the id of the new todo, and the completed status of the new todo. Thats everything right? Oops! We must always have a type field in every action. The type is just a string that makes it easy for use to identify the purpose of the action. In this case `'ADD_TODO'` seems like a clear enough type string. The todos will look the `typicalTodo` object (see below) so our action creator for `'ADD_TODO'` needs only to be given the `text` and `id` values to form and return this kind of action object. Now add the `addTodo()` action creator defined below to the `index.js` file in the actions folder. 
 
 ```javascript
  // typical action shape for ADD_TODO
  const typicalTodo = {
    type: 'ADD_TODO'
    id: 5,
    text: 'Build A Todo App',
    completed: false
  }
  addTodo(5,'Build A Todo App') // returns the todo above
 ```
  
  
 ```javascript
 // Inside /app/actions/index.js
 export function addTodo(id,text) {
  return {
   type: 'ADD_TODO',
   id,
   text,
   completed: false
  };
 }
 ```
 Reminder: `{ something }` in ES2015 is just shorthand for `{ something : something }`.
 
 So far we have not needed anything from the Redux npm package since we are just writing functions that return objects. Redux will intrepret these functions as actions but that doesnt mean that they are anything more than functions. Now that we have our action creator for `ADD_TODO` we are ready to begin writing the reducer logic for that action. 
 
 Side note: In the case of action creators they also allow other parts of redux (see [redux middleware](http://redux.js.org/docs/advanced/Middleware.html)) to be less complex
 
 
