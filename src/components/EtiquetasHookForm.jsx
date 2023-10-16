import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from 'yup'
import './Etiquetas.scss'


const schema = yup.object({
    nome: yup.string()
            .required('O nome é obrigatório!'),
    email: yup.string()
            .email("Digite um e-mail válido!")
            .required('O e-mail é obrigatório!'),
    cpf: yup.string()
            .min(11,"O CPF deve ter pelo menos 11 digitos!")
            .required('O CPF é obrigatório!')
}).required();

export default function EtiquetasHookForm(){

    const {register, handleSubmit, formState: {errors}, setValue, setFocus} = useForm({
        resolver: yupResolver(schema)
    })

    const buscarCep = (e)=>{
        //se nao for digito o regex transforma em string vazia (apaga)
        const cep = e.target.value.replace(/\D/g, '');
        console.log(cep);
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(result => result.json())
        .then(data => {
            setValue('rua', data.logradouro)
            setValue('bairro', data.bairro)
            setValue('cidade', data.localidade)
            setValue('estado', data.uf)
            setFocus('numero')
        })
    }

    const[listaClientes, setListaClientes] = useState([])

    const inserirCliente = (cliente)=>{
        setListaClientes([...listaClientes, cliente])
    }

    return(
        <div className="divEtiqueta">
            <form onSubmit={handleSubmit(inserirCliente)}>
                <fieldset>
                    <legend>Dados Pessoais</legend>
                    <label>Nome:
                        <input type="text" {...register('nome')}/>
                        <span>{errors.nome?.message}</span>
                    </label>
                    <label>Email:
                        <input type="text" {...register('email')}/>
                        <span>{errors.email?.message}</span>
                    </label>
                    <label>CPF:
                        <input type="text" {...register('cpf')}/>
                        <span>{errors.cpf?.message}</span>
                    </label>
                    <button type="submit">Criar</button>
                </fieldset>
                <fieldset>
                    <legend>Endereço</legend>
                    <label>Cep:
                        <input type="text"  {...register('cep')} onBlur={buscarCep}/>
                         {/* onBlur= dispara evento quando sai do foco */}
                    </label>
                    <label>Rua:
                        <input type="text" {...register('rua')} />
                    </label>
                    <label>Número:
                        <input type="text" {...register('numero')} />
                    </label>
                    <label>Bairro:
                        <input type="text" {...register('bairro')}/>
                    </label>
                    <label>Cidade:
                        <input type="text" {...register('cidade')}/>
                    </label>
                    <label>Estado:
                        <input type="text" {...register('estado')}/>
                    </label>
                    {/* <button type="submit">Criar</button> */}
                </fieldset>
            </form>
            <div className="painel">
                {
                    listaClientes.map((cli, i)=>
                        <div className="etiqueta">
                            <p>Nome: {cli.nome}</p>
                            <p>Email: {cli.email}</p>
                            <p>CPF: {cli.cpf}</p>
                            <p>Rua: {cli.rua}, {cli.numero}</p>
                            <p>Bairro: {cli.bairro}</p>
                            <p>Cidade: {cli.cidade} - {cli.estado}</p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}