import React, { Component } from "react"
import { Link } from 'react-router-dom'

export class FetchEmpresa extends Component {
    static displayName = "Empresas";

    constructor() {
        super();
        this.state = { empresas: [], loading: true }
    }

    componentDidMount() {
        this.populaData();
    }

    static handleEdit(id) {
        window.location.href = "/empresa/edit/" + id;
    }

    static handleDelete(id) {
        if (!window.confirm("Deseja mesmo deletar?")) {
            return;
        }
        else {
            fetch('api/empresas/' + id, { method: 'delete' })
                .then(json => {
                    window.location.href = "fetch-empresa";
                    alert('Deletado com sucesso!');
                })
        }
    }

    static renderTabela(empresas) {
        return (
            <table className="table table-striped" aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Endereço</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {empresas.map(emp =>
                        <tr key={emp.id}>
                            <td>{emp.nome}</td>
                            <td>{emp.descricao}</td>
                            <td>{emp.endereco}</td>
                            <td>
                                <button className='btn-btn-success' onClick={(id) => this.handleEdit(emp.id)}>Editar</button>
                                <button className='btn-btn-danger' onClick={(id) => this.handleDelete(emp.id)}>Excluir</button>
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
            : FetchEmpresa.renderTabela(this.state.empresas);

        return (
            <div>
                <h1 id="tableLabel">Empresas</h1>
                <p>Tela de Listagem dos Dados</p>
                <p>
                    <Link to="/add-empresa">Cadastrar Empresa</Link>
                </p>
                {contents}
            </div>
        );
    }

    async populaData() {
        const response = await fetch('api/Empresas');
        const data = await response.json();
        this.setState({ empresas: data, loading: false });
    }
}