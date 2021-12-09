import { combineReducers } from 'redux';
import { tarefaReducer } from './tarefasReducer';
import { dialogReducer } from './dialogReducer';

const mainReducer = combineReducers({
    tarefas: tarefaReducer,
    dialog: dialogReducer
})

export default mainReducer;