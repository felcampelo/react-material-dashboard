const ACTIONS = {
    OPEN_CLOSE: 'DIALOG_OPEN_CLOSE',
    SET_MESSAGE: 'DIALOG_MESSAGE'
}

const ESTADO_INICIAL = {
    openDialog: false,
    mensagem: null
}

export const dialogReducer = (state = ESTADO_INICIAL, action) => {
    switch (action.type) {
        case ACTIONS.OPEN_CLOSE:
            return { ...state, openDialog: action.payload }
        case ACTIONS.SET_MESSAGE:
            return { ...state, mensagem: action.payload }
        default:
            return state;
    }
}

export function setOpenDialog(payload) {
    return dispatch => {
        dispatch({
            type: ACTIONS.OPEN_CLOSE,
            payload
        });
    }
}

export function setMessage(payload) {
    return dispatch => {
        dispatch({
            type: ACTIONS.SET_MESSAGE,
            payload
        });
    }
}
