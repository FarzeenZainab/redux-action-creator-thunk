# Action Creator Thunk & How it is used in Redux

Reducers must be side-effects free, pure and synchrous always returing a new state object.
To run side-effects when redux is involved we have to main options

1. Using the useEffect hook
2. Creating action creator thunks
