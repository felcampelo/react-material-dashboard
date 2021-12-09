import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { listar, salvar, deletar, alterarStatus } from '../../store/tarefasReducer';
import { setOpenDialog, setMessage } from '../../store/dialogReducer';
import { TarefasToolbar, TarefasTable } from './components';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const TarefaList = (props) => {
  const classes = useStyles();  

  useEffect(() => {
    props.listar();
  }, []);

  return (
    <div className={classes.root}>
      <TarefasToolbar salvar={props.salvar} />
      <div className={classes.content}>
        <TarefasTable tarefas={props.tarefas} alterarStatus={props.alterarStatus} deletar={props.deletar} />
      </div>
      <Dialog open={props.openDialog} onClose={e => props.setOpenDialog(false)}>
        <DialogTitle></DialogTitle>
        <DialogContent>
          {props.mensagem}
        </DialogContent>
        <DialogActions>
          <Button onClick={e => props.setOpenDialog(false)}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = state => ({
  tarefas: state.tarefas.tarefas,
  mensagem: state.dialog.mensagem,
  openDialog: state.dialog.openDialog
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ listar, salvar, deletar, alterarStatus, setOpenDialog, setMessage }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TarefaList);
