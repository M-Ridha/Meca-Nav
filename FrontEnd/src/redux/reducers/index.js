import { combineReducers } from "redux";
import authReducer from './authReducer'
import commentReducer from "./commentReducer";
import postReducer from "./postReducer";
import solutionReducer from "./solutionReducer";


export default combineReducers({
    auth: authReducer ,
    posts : postReducer,
    solutions : solutionReducer ,
    comments : commentReducer
})