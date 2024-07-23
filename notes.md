# Action Creator Thunk & How it is used in Redux

Reducers must be side-effects free, pure and synchrous always returing a new state object.
To run side-effects when redux is involved we have to main options

1. Using the useEffect hook
2. Creating action creator thunks

## Understanding action creators and thunks

A Thunk is a function that delays the action until later. It is an action creator function
that does not return the action itself but instead another function which eventually returns
that action so that, we can run some other code before the action is returned that we did want
to create.

It is a very common pattern and is easy to implement. They allow you to write action creator that
returns a function, enabling you to writ asynchoronous code and side effects in your application

### Basics of redux

In redux, an action is a plain js object that have a type property and may include additional data.
Action creators are functions that returns these action objects. A reducer is a function that takes the current
state and an action as argument and return the new state

### What is a thunk

A thunks is a function that wraps an expression to delay its evaluation. In the context of redux,
a thunk is a function that returns another function. This is useful for handling async tasks

In redux, an action creator typically returns an object

```js
const actionCreator = () => {
  return {
    type: "ACTION_TYPE",
    payload: data,
  };
};
```
