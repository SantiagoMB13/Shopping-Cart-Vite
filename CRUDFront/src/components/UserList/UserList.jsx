import React, { useState, useEffect } from 'react';
import styles from './userlist.module.css';
import User from '../User';
import { useNavigate } from "react-router-dom";

const UserList = () => {
    const [personas, setPersonas] = useState([]);
    const [cantidades, setCantidades] = useState(Array(personas.length).fill(0));
    const [totalCantidades, setTotalCantidades] = useState(cantidades.reduce((total, cantidad) => total + cantidad, 0));
    const navigate = useNavigate();

    const get_all_personas = async () => {
    const peticion = await fetch('http://localhost:3000/all');
    const data = await peticion.json();
    setPersonas(data.personas);
    };

    useEffect(() => {
    get_all_personas();
    }, []);

    const delete_person = async (id) => {
    const peticion = await fetch(`http://localhost:3000/delete/${id}`, {
        method: 'DELETE',
    });
    await peticion.json();
    const userIndex = personas.findIndex(user => user.id === id);
    actualizarCantidad(userIndex, 0);
    await get_all_personas();

    };

    const EditSetup = async (id) => {
        navigate(`/edit/${id}`);
    };

    const ReadSetup = async (id) => {
        navigate(`/read/${id}`);
    };

    const actualizarCantidad = (index, nuevaCantidad) => {
        console.log(nuevaCantidad);
        console.log(index);
        const nuevasCantidades = cantidades.slice();
        nuevasCantidades[index] = nuevaCantidad;
        setCantidades(nuevasCantidades);
        setTotalCantidades(nuevasCantidades.reduce((total, cantidad) => total + cantidad, 0));
    };

    useEffect(() => {
        setCantidades(Array(personas.length).fill(0));
        console.log("Cantidades: ", cantidades);
        setTotalCantidades(cantidades.reduce((total, cantidad) => total + cantidad, 0));
    }, [personas]);

    return (
<>
        <div className={styles.contmain}>
        <h1>Lista de usuarios registrados</h1>
        <div className={styles.btncont}>
        <button className={styles.createbtn} onClick={() => navigate("/create")}>Crear nuevo usuario</button>
        </div>
         <div className={styles.cont}>
         <div className={styles.userlist}>
            {personas.map((user, index) => (
                <User
                    key={user.id}
                    user={user}
                    delete_person={delete_person}
                    edit_person={EditSetup}
                    read_person={ReadSetup}
                    actualizarCantidad={(nuevaCantidad) => actualizarCantidad(index, nuevaCantidad)}
                />
            ))}
        </div>
        </div>
        <div className={styles.total}>
            Total de elementos: {totalCantidades}
        </div>

         </div>
</>
    );
};

export default UserList;
