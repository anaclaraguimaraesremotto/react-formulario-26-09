import { useState } from 'react'
import './Etiquetas.scss'

export default function Etiquetas(){

    const[cliente, setCliente] = useState(
        { 
            nome:'',
            email: '',
            cpf: ''
        }
    )

    const[listaClientes, setListaClientes] = useState([])

    // e = captura evento
    const cadCliente = (e)=>{
        // ... para alterar apenas o que recebe e nao o que ja esta
        // atualiza o nome e mantem email e cpf e assim por diante
        setCliente({...cliente, [e.target.name]:e.target.value})
        // sem ele nao permite digitar
    }

    const inserirCliente = (e)=>{
        // garantir que nao vai mandar para outra pag
        e.preventDefault()
        setListaClientes([...listaClientes, cliente])
        // limpa form para receber prox info
        setCliente( { 
            nome:'',
            email: '',
            cpf: ''
        })
    }

    return(
        <div className="divEtiqueta">
            <form onSubmit={inserirCliente}>
                <fieldset>
                    <legend>Dados Pessoais</legend>
                    <label>Nome:
                        <input type="text" name="nome" onChange={cadCliente} value={cliente.nome}/>
                    </label>
                    <label>Email:
                        <input type="text" name="email" onChange={cadCliente} value={cliente.email}/>
                    </label>
                    <label>CPF:
                        <input type="text" name="cpf" onChange={cadCliente} value={cliente.cpf}/>
                    </label>
                    <button type="submit">Criar</button>
                </fieldset>
            </form>
            <div className="painel">
                {
                    listaClientes.map((cli, i)=>
                        <div className="etiqueta">
                            <p>Nome: {cli.nome}</p>
                            <p>Email: {cli.email}</p>
                            <p>CPF: {cli.cpf}</p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}