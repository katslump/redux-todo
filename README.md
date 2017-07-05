# Todo react with redux

 Last week we built our first end to end React Todo App. This week we will build a similar Todo app but this time we use Redux! In this repo exists a functioning vanilla React Todo app like the one you built before. Our goal is to take this working app and migrate the code base so that all our state is managed by Redux. Along the way we will learn how to structure a simple Redux app and some more about the cast of characters in a typical application. Remember Redux is not something that can be mastered in a day or even a week! It is not inherently difficult so you don't need to worry that you will never get it.  Be patient and enjoy the journey.

## Step 0 Checking our starting point

 Clone this repo and get the app to run as is. Notice that the `package.json` has a `npm start` script that runs the `webpack-dev-server`. Don't forget to `npm install`! Once you are done you should be able to play around with it. Be sure to look at the code and familiarize yourself with its inner workings.

 ![](https://cl.ly/3b3V1e2l3629/Screen%20Recording%202017-07-04%20at%2010.02%20PM.gif)

## Step 1 Preparing for Redux

 Now that our app is up and running lets take a look at what needs to be done for our migration to redux. The first thing we will need to do is setup our folders to house actions, reducers, and components. Since the components folder already exists lets start by creating the reducers folder and the actions folder in the same directory that the current components folder sits in. Once you are done creating the folders create two blank `index.js` files. One in the reducers directory and one in actions directory. The file in reducers folder will be where we define our root reducer. The root reducer is where you would normally combine all your reducers so that when you call `createStore` you only need to pass in the combined reducer. Since the Todo App we are building will only have one reducer we will just write it directly in the `index.js` file. Meanwhile, the `index.js` file in the actions folder will house our "action creators". Action creators are convenience functions that return actions. More on action creators below. 
 
 ![](https://cl.ly/3A2i253d2B2k/Screen%20Shot%202017-07-04%20at%2010.30.15%20PM.png) 
 
## Step 2 Action Creators

 Action creators seem strange at first. Why do I want a function that returns the action instead of just creating the action directly? It turns out to be quite useful in many programming situations to make everything into functions. See technical note 1. Today we will be focussed on using action creators as the convenient starting point to implement a feature in redux.
 
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
 
 So far we have not needed anything from the Redux npm package since we are just writing functions that return objects. Redux will intrepret these functions as actions but that doesnt mean that they are anything more than functions. Now that we have our action creator for `ADD_TODO` we are ready to begin writing the reducer logic for that specific action or action creator. 
 
 - Side note: It is normal to conflate actions and action creators since the latter are merely a means of creating very specific actions. So in later portions of the exercise I will use the terms interchangably.
 - Technical note 1: In the case of action creators they also allow other parts of redux (see [redux middleware](http://redux.js.org/docs/advanced/Middleware.html)) to be less complex
 
 ## Step 3 writing the reducer

 The next step after writing an action creator for a given action is to write the part of the reducer logic that handles that kind of action. Since this is the first action we are writing we also have to setup the basic reducer structure as well. Recall that a reducer only needs to worry about how to take the current state and a given action object and then return the next or new state. So lets start with the skeleton below.

 ```javascript
 // Inside app/reducers/index.js
const reducer = (state, action) => {
    switch (action.type) {
        // Missing cases
        default:
            return state;
    }
};

export reducer;
 ```
Since the redux `store` actually runs the root reducer to figure out the starting state we need to decide what the default state of our app should be. In this case our application state really only depends on which todos are in the todo list and todos are fairly easy to store in an array. So go ahead and update the `reducer` above so that the default state is an empty array by using the ES2015 default parameters feature. Now that the basic skeleton for the root reducer is out of the way we can get back to implementing the reducer logic for the `'ADD_TODO'` action type case.

What should the reducer do in the case of an `'ADD_TODO'` action? Since it automatically gets passed the current state and the action object all we need to do is create and return a new state. The new state should have one more todo and since the action object contains all the pieces we need to create the todo we simply create the todo from the action object and add it to the todos in the current state.

 ```javascript
 // Inside app/reducers/index.js
const reducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            // copy new state so no mutations to old state
            const newState = [ ...state ];
            // create the todo from the action object
            const newTodo = {
                id: action.id,
                text: action.text,
                completed: action.completed
            };
            // okay to mutate our own copy
            newState.push(newTodo);
            return newState
        default:
            return state;
    }
};

export reducer;
 ```
Now our reducer is ready to handle `dispatch(addTodo(id, text))` calls made by the UI! The only problem is that we still have react managing all our state in our components right now. Lets fix this.

Side note: Its normal to start with a given idea for what your application state looks like and then later discover you need to add/change the shape of the state to accomodate more features. This is a fairly easy process so we don't need to think for hours to capture every little possible piece of state before we begin to code. This is one of the super powers of the Redux approach. 

## Step 4 Take state control of todos out of React's hands

We have four components in our application `InputLine.js`, `Todo.js`, `TodoApp.js`, and `TodoList.js`. Lets vastly simply the latter three components by moving all the state and logic out of as many components as possible. We can start top down with `TodoApp.js` or bottom up `Todo.js` both are valid approaches once you get the hang of redux-ification. For this app its slightly easier to go bottom up so lets take a look at `Todo.js` first.

```javascript
var React = require('react');

class Todo extends React.Component {
  render() {
    return (
      <li>
        <span onClick={() => this.props.toggleTodo()}>
          {this.props.completed ? <strike> {this.props.task}</strike> : this.props.task}
        </span>
      </li>
    );
  }
}

module.exports = Todo;
```

This component only has a render method so it is actually just a presentational component lets make it official by using a function to represent it.

```javascript
var React = require('react');

const Todo = ({task, completed, handleOnClick}) =>
    return (
      <li>
        <span onClick={handleOnClick}>
          {completed ? <strike> {task} </strike> : task}
        </span>
      </li>
    );
  }
}

module.exports = Todo;
```
Much better! Now this component is more reusable in our future projects. We don't do any logic inside the component instead `<Todo />` relies on being passed everything it needs. Next up we go to the component using `<Todo />` which is/in `TodoList.js`.

```javascript
var React = require('react');
var Todo = require('./Todo');

class TodoList extends React.Component {
  render() {
    return (
      <ul>
        {
          this.props.todos.map((todo, index) => (
            <Todo
              key={todo.id}
              task={todo.task}
              completed={todo.completed}
              toggleTodo={() => this.props.toggleTodo(index)}
            >
            </Todo>
          ))
        }
      </ul>
    )
  }
}

module.exports = TodoList;
```
In this component we again have just a render method
