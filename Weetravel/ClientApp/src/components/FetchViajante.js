import React, { Component } from "react"
import { Link } from 'react-router-dom'

export class FetchViajante extends Component {
    static displayName = "Viajantes";

    constructor() {
        super();
        this.state = { viajantes: [], loading: true }
    }

    componentDidMount() {
        this.populaData();
    }

    static handleEdit(id) {
        window.location.href = "/viajante/edit/" + id;
    }

    static handleDelete(id) {
        if (!window.confirm("Deseja mesmo deletar?")) {
            return;
        }
        else {
            fetch('api/viajantes/' + id, { method:'delete' })
                .then(json => {
                    window.location.href = "fetch-viajante";
                    alert('Deletado com sucesso!');
                })
        }     
    }

    static renderTabela(viajantes) {
        return (
            <table className="table table-striped" aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Data de Nascimento</th>
                        <th>Ativo</th>
                        <th>Empresa</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {viajantes.map(viaj =>
                        <tr key ={viaj.id}>
                            <td>{viaj.nome}</td>
                            <td>{new Date(viaj.dataNasc).toLocaleDateString()}</td>
                            <td>{viaj.ativo}</td>
                            <td>{viaj.empresa}</td>
                            <td>
                                <button className='btn-btn-success' onClick={(id) => this.handleEdit(viaj.id)}>Editar</button>&nbsp;
                                <button className='btn-btn-danger' onClick={(id) => this.handleDelete(viaj.id)}>Excluir</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Carregando...</em></p>
            : FetchViajante.renderTabela(this.state.viajantes);

        return (
            <div>
                <h1 id="tableLabel">Viajantes</h1>
                <p>Tela de Listagem dos Dados</p>
                <p>
                    <Link to="/add-viajante">Cadastrar Viajante</Link>
                </p>
                {contents}
            </div>
        );
    }

    async populaData() {
        const response = await fetch('api/Viajantes');
        const data = await response.json();
        this.setState({ viajantes: data, loading:false});
    }
}