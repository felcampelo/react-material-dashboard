import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { TarefasToolbar, TarefasTable } from './components';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const TarefaList = () => {
  const classes = useStyles();

  const [tarefas, setTarefas] = useState([]);

  const salvar = (tarefa) => {
    axios.post('https://minhastarefas-api.herokuapp.com/tarefas', tarefa, {
      headers: { 'x-tenant-id': 'fulano@email.com' }
    }).then(response => {
      const novaTarefa = response.data;
      setTarefas([...tarefas, novaTarefa]);
    }).catch(erro => {
      console.log(erro);
    });
  }

  const listarTarefas = () => {
    axios.get('https://minhastarefas-api.herokuapp.com/tarefas', {
      headers: { 'x-tenant-id': 'fulano@email.com' }
    }).then(response => {
      const listaDeTarefas = response.data;
      setTarefas(listaDeTarefas);
    });
  }

  const alterarStatus = (id) => {
    axios.patch(`https://minhastarefas-api.herokuapp.com/tarefas/${id}`, null, {
      headers: { 'x-tenant-id': 'fulano@email.com' }
    }).then(response => {
      const lista = [...tarefas];
      lista.forEach(tarefa => {
        if (tarefa.id === id)
          tarefa.done = true;
      });
      setTarefas(lista);
    });
  }

  const deletar = id => {
    axios.delete(`https://minhastarefas-api.herokuapp.com/tarefas/${id}`, {
      headers: { 'x-tenant-id': 'fulano@email.com' }
    }).then(response => {
      const lista = tarefas.filter(tarefa => tarefa.id !== id);
      setTarefas(lista);
    });
  }

  useEffect(() => {
    listarTarefas();
  }, []);

  return (
    <div className={classes.root}>
      <TarefasToolbar salvar={salvar} />
      <div className={classes.content}>
        <TarefasTable tarefas={tarefas} alterarStatus={alterarStatus} deletar={deletar} />
      </div>
    </div>
  );
};

export default TarefaList;
