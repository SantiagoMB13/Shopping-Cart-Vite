import React from 'react';
import styles from './dataform.module.css';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const DataForm = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  var mode;
  if (location.pathname.includes("read")) {
    mode = "read";
  }
  else if (location.pathname.includes("create")) {
    mode = "create";
  } else {
    mode = "edit";
  }
  const [person, setPerson] = useState({
    name: "",
    cel: "",
    email: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const editedPerson = {
      name: formData.get('nombre'),
      cel: formData.get('celular'),
      email: formData.get('email'),
      age: formData.get('edad'),
      gender: formData.get('genero')
    };

    if (mode === 'create') {
      create_person(editedPerson);
    } else if (mode === 'edit') {
      update_person(person.id, editedPerson);
    }
  };

  const create_person = async (person) => {
    const peticion = await fetch(`http://localhost:3000/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(person),
    });
    const { ok } = await peticion.json();

    if (ok) return navigate("/");

    alert("Error en el servidor");
  };

  const update_person = async (id, updatedPersona) => {
      const peticion = await fetch(`http://localhost:3000/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPersona),
      });

      const { ok } = await peticion.json();

      if (ok) return navigate("/");
  
      alert("Error en el servidor");

  };

  const buscar_person = async (id) => {
    const peticion = await fetch(`http://localhost:3000/getbyid/${id}`);
    const { ok, personas } = await peticion.json();

    if (ok) {
      const person = personas[0];

      return setPerson(person);
    }

    alert("Error buscando buscando a la persona");
  };

  useEffect(() => {
    const id = params.id;
    if (id) {
      buscar_person(id);
    }
  }, [params, location]);

  return (
    <div className={styles.formcont}>
      <h1>
        {mode === 'create' ? 'Ingresa los datos del nuevo usuario' : 
         mode === 'edit' ? 'Edita los datos del usuario' : 
         'Detalles del usuario'}
      </h1>
      <form onSubmit={mode !== 'read' ? handleSubmit : undefined}>
        <div>
          <label htmlFor="nombre">Nombre:</label>
          {mode === 'read' ? (
            <span>{person.name}</span>
          ) : (
            <input
              type="text"
              id="nombre"
              name="nombre"
              defaultValue={mode === 'edit' ? person.name : ''}
              required
            />
          )}
        </div>
        <div>
          <label htmlFor="celular">Celular:</label>
          {mode === 'read' ? (
            <span>{person.cel}</span>
          ) : (
            <input
              type="text"
              id="celular"
              name="celular"
              defaultValue={mode === 'edit' ? person.cel : ''}
              required
            />
          )}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          {mode === 'read' ? (
            <span>{person.email}</span>
          ) : (
            <input
              type="email"
              id="email"
              name="email"
              defaultValue={mode === 'edit' ? person.email : ''}
              required
            />
          )}
        </div>
        <div>
          <label htmlFor="edad">Edad:</label>
          {mode === 'read' ? (
            <span>{person.age}</span>
          ) : (
            <input
              type="number"
              id="edad"
              name="edad"
              defaultValue={mode === 'edit' ? person.age : ''}
            />
          )}
        </div>
        <div>
          <label htmlFor="genero">Género:</label>
          {mode === 'read' ? (
            <span>{person.gender}</span>
          ) : (
            <select
              id="genero"
              name="genero"
              defaultValue={mode === 'edit' ? person.gender : ''}
            >
              <option value="">Seleccione</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="otro">Otro</option>
            </select>
          )}
        </div>
        {mode !== 'read' && (
          <button type="submit">{mode === 'create' ? 'Crear' : 'Editar'}</button>
        )}
      </form>
      <button className={styles.backbtn} onClick={() => navigate("/")}>Volver al menú principal</button>
    </div>
  );
};

export default DataForm;
