import React, { Component } from 'react';

export class Empresa {
    constructor() {
        this.id = 0;
        this.nome = "";
        this.descricao = "";
        this.endereco = "";
    }
}

export class AddEmpresa extends Component {
    constructor(props) {
        super(props);
        this.state = { title: "", empresa: new Empresa(), loading: true };
        this.initialize();
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSalvar = this.handleSalvar.bind(this);
    }
    async initialize() {
        var id = this.props.match.params["id"];
        if (id > 0) {
            const response = await fetch('api/Empresas/' + id);
            const data = await response.json();
            this.setState({ title: "Edit", empresa: data, loading: false });
        }
        else {
            this.state = { title: "Create", empresa: new Empresa(), loading: false };
        }
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Carregando...</em></p>
            : this.renderCreateForm();
        return (
            <div>
                <h1>Cadastro</h1>
                <h3>Empresa</h3>
                {contents}
            </div>
        );
    }

    handleCancel(event) {
        event.preventDefault();
        this.props.history.push("/fetch-empresa");
    }

    handleSalvar(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        if (this.state.empresa.id) {
            // eslint-disable-next-line
            const response1 = fetch('api/Empresas/' + this.state.empresa.id, { method: "PUT", body: data });
            this.props.history.push("/fetch-empresa");
        }
        else {
            // eslint-disable-next-line
            const response2 = fetch('api/Empresas/', { method: "POST", body: data });
            this.props.history.push("/fetch-empresa");
        }

    }

    renderCreateForm() {
        return (
            <form onSubmit={this.handleSalvar}>
                <div className="form-group row">
                    <input type="hidden" name="id" value={this.state.empresa.id} />
                </div>
                <div className="form-group row">
                    <div className="col-md-6">
                        <label>Nome</label>
                        <input className="form-control" type="text" name="nome" placeholder="insira o nome da empresa" defaultValue={this.state.empresa.nome} required />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-md-6">
                        <label>Descrição</label>
                        <input className="form-control" type="text" name="descricao" placeholder="uma breve descrição" defaultValue={this.state.empresa.descricao} required />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-md-6">
                        <label>Endereço</label>
                        <input className="form-control" type="text" name="endereco" placeholder="insira o endereço" defaultValue={this.state.empresa.endereco} required />
                    </div>
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-success" value={this.state.empresa.id}>Salvar</button>
                    <button className="btn btn-danger" onClick={this.handleCancel}>Cancelar</button>
                </div>
            </form>

        );
    }
}
