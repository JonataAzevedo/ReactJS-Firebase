import { useEffect, useState } from 'react';
import './admin.css';

import { auth, db } from '../../firebaseConnection';
import { signOut } from 'firebase/auth';

import { addDoc, collection, onSnapshot, query, orderBy, where } from 'firebase/firestore';

export default function Admin() {

    const [tarefaInput, setTarefaInput] = useState('');
    const [user, setUser] = useState({});
    const [tarefas, setTarefas] = useState([]);

    useEffect(() => {
        async function loadTarefas() {
            const userDetail = localStorage.getItem("@detailUser")
            setUser(JSON.parse(userDetail))

            if (userDetail) {
                const data = JSON.parse(userDetail);

                const tarefaRef = collection(db, "tarefas")
                const q = query(tarefaRef, orderBy("created", "desc"), where("userUid", "==", data?.uid))

                const unsub = onSnapshot(q, (snapshot) => {
                    let lista = [];

                    snapshot.forEach((doc) => {
                        lista.push({
                            id: doc.id,
                            tarefa: doc.data().tarefa,
                            userUid: doc.data().userUid
                        })
                    })
                    console.log(lista);
                    setTarefas(lista);
                })
            }
        }
        loadTarefas();
    }, [])

    async function handleRegister(e) {
        e.preventDefault();

        if (tarefaInput === '') {
            alert("Digite sua task")
            return;
        }

        await addDoc(collection(db, "tarefas"), {
            tarefa: tarefaInput,
            created: new Date()
        })
            .then(() => {
                setTarefaInput('');
            })
            .catch((e) => {
                console.log("Erro ao registrar " + e)
            })
    }

    async function handleLogout() {
        await signOut(auth);
    }

    return (
        <div className='admin-container'>
            <h1>Minhas task</h1>

            <form className='form' onSubmit={handleRegister}>
                <textarea
                    placeholder='Digite sua task'
                    value={tarefaInput}
                    onChange={(e) => setTarefaInput(e.target.value)}
                />

                <button className='btn-register' type='submite'>Registrar tarefa</button>
            </form>

            {tarefas.map((item) => (
                <article key={item.id} className='list'>
                    <p>{item.tarefa}</p>

                    <div>
                        <button>Editar</button>
                        <button className='btn-delete'>Concluir</button>
                    </div>
                </article>
            ))}

            <button className='btn-logout' onClick={handleLogout}>Sair</button>
        </div>
    )
}