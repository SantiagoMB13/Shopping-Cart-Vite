import React, { useState, useEffect } from 'react';
import styles from './user.module.css';

const User = (props) => {
  const [cantidad, setCantidad] = useState(0);

  useEffect(() => {
    props.actualizarCantidad(cantidad);
  }, [cantidad]);

  return (
    <article>
      <div key={props.user.id} className={styles.usercard}>
        <h1>{props.user.name}</h1>
        <h3>Celular: {props.user.cel}</h3>
        <h3>Correo: {props.user.email}</h3>
        <div className={styles.btncont}>
          <button onClick={() => props.edit_person(props.user.id)} className={styles.btn}>Editar</button>
          <button onClick={() => props.read_person(props.user.id)} className={styles.btn}>Ver</button>
          <button onClick={() => props.delete_person(props.user.id)} className={styles.btn}>Borrar</button>
        </div>
      </div>
    </article>
  );
};

export default User;
