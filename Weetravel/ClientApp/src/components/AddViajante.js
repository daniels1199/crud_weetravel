import React, { Component } from 'react';

export class Viajante {
    constructor() {
        this.id = 0;
        this.nome = "";
        this.datanasc = null;
        this.ativo  = null;
        this.empresa = "";
    }
}

export class AddViajante extends Component {
    constructor(props) {
        super(props);
        this.state = { title: "", viajante: new Viajante(), loading: true };
        this.initialize();
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSalvar = this.handleSalvar.bind(this);
    }
    async initialize() {
        var id = this.props.match.params["id"];
        if (id > 0) {
            const response = await fetch('api/Viajantes/'+id);
            const data = await response.json();
            this.setState({ title: "Edit", viajante: data, loading: false });
        }
        else {
            this.state = { title: "Create", viajante: new Viajante(), loading: false };
        }
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Carregando...</em></p>
            : this.renderCreateForm();
        return (
            <div>
                <h1>Cadastro</h1>
                <h3>Viajante</h3>
                {contents}
            </div>
        );
    }

    handleCancel(event) {
        event.preventDefault();
        this.props.history.push("/fetch-viajante");
    }

    handleSalvar(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        if (this.state.viajante.id) {
            const response1 = fetch('api/Viajantes/' + this.state.viajante.id, { method: "PUT", body: data });
            this.props.history.push("/fetch-viajante");
        }
        else {
            const response2 = fetch('api/Viajantes/', { method: "POST", body: data });
            this.props.history.push("/fetch-viajante");
        }

    }

    renderCreateForm() {
        return (
            <form onSubmit={this.handleSalvar}>
                <div className="form-group row">
                    <input type="hidden" name="id" value={this.state.viajante.id} />
                </div>
                <div className="form-group row">
                    <div className="col-md-6">
                        <label>Nome</label>
                        <input className="form-control" type="text" name="nome" placeholder="insira o nome" defaultValue={this.state.viajante.nome} required />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-md-6">
                        <label>Data de Nascimento</label>
                        <input className="form-control" type="text" name="dataNasc" placeholder="ex. 01/01/2021" defaultValue={this.state.viajante.dataNasc} required />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-md-6">
                        <label>Ativo</label>
                        <input className="form-control" type="text" name="ativo" placeholder="sim ou não" defaultValue={this.state.viajante.ativo} required />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-md-6">
                        <label>Empresa</label>
                        <input className="form-control" type="text" name="empresa" placeholder="empresa" defaultValue={this.state.viajante.empresa} required />
                    </div>
                </div>


                <div className="form-group">
                    <button type="submit" className="btn btn-success" value={this.state.viajante.id}>Salvar</button>
                    <button className="btn btn-danger" onClick={this.handleCancel}>Cancelar</button>
                </div>
            </form>

        );
    }
}
