import { ListAltSharp } from "@material-ui/icons";
import axios from "axios";
import { setMessage, setOpenDialog } from './dialogReducer'

const http = axios.create({
    baseURL: process.env.REACT_APP_API_BASEURL
});

const ACTIONS = {
    LISTAR: 'TAREFAS_LISTAR',
    ADD: 'TAREFAS_ADD',
    REMOVER: 'TAREFAS_REMOVE',
    UPDATE_STATUS: 'TAREFAS_UPDATE_STATUS'
}

const ESTADO_INICIAL = {
    tarefas: [],
    quantidade: 0
}

export const tarefaReducer = (state = ESTADO_INICIAL, action) => {
    switch (action.type) {
        case ACTIONS.LISTAR:
            return { ...state, tarefas: action.tarefas, quantidade: action.tarefas.length };
        case ACTIONS.ADD:
            const lista = [...state.tarefas, action.tarefa];
            return { ...state, tarefas: lista, quantidade: lista.length }
        case ACTIONS.REMOVER:
            const id = action.id;
            const tarefas = state.tarefas.filter(tarefa => tarefa.id !== id);
            return {
                ...state, tarefas: tarefas,
                quantidade: tarefas.length
            }
        case ACTIONS.UPDATE_STATUS:
            const listaAtualizada = [...state.tarefas];
            listaAtualizada.forEach(tarefa => {
                if (tarefa.id === action.id)
                    tarefa.done = true
            });
            return { ...state, tarefas: listaAtualizada }
        default:
            return state;
    }
}

//Action
export function listar() {
    return dispatch => {
        http.get('/tarefas', {
            headers: { 'x-tenant-id': localStorage.getItem('email_usuario_logado') }
        }).then(response => {
            dispatch({
                type: ACTIONS.LISTAR,
                tarefas: response.data
            })
        });
    }
}

export function salvar(tarefa) {
    return dispatch => {
        http.post('/tarefas', tarefa, {
            headers: { 'x-tenant-id': localStorage.getItem('email_usuario_logado') }
        }).then(response => {
            dispatch([{
                type: ACTIONS.ADD,
                tarefa: response.data
            }, setMessage('Tarefa salva com sucesso')
                , setOpenDialog(true)])
        });
    }
}

export function deletar(id) {
    return dispatch => {
        http.delete(`/tarefas/${id}`, {
            headers: { 'x-tenant-id': localStorage.getItem('email_usuario_logado') }
        }).then(response => {
            dispatch({
                type: ACTIONS.REMOVER,
                id: id
            })
        });
    }
}

export function alterarStatus(id) {
    return dispatch => {
        http.patch(`/tarefas/${id}`, null, {
            headers: { 'x-tenant-id': localStorage.getItem('email_usuario_logado') }
        }).then(response => {
            dispatch({
                type: ACTIONS.UPDATE_STATUS,
                id: id
            })
        });
    }
}