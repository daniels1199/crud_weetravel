import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { FetchViajante } from './components/FetchViajante';
import { AddViajante } from './components/AddViajante';
import { FetchEmpresa } from './components/FetchEmpresa';
import { AddEmpresa } from './components/AddEmpresa';
import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        {/*  <Route path='/counter' component={Counter} /> */}
        {/* <Route path='/fetch-data' component={FetchData} /> */}
            <Route path='/fetch-viajante' component={FetchViajante} />
            <Route path='/add-viajante' component={AddViajante} />
            <Route path='/viajante/edit/:id' component={AddViajante} />
            <Route path='/fetch-empresa' component={FetchEmpresa} />
            <Route path='/add-empresa' component={AddEmpresa} />
            <Route path='/empresa/edit/:id' component={AddEmpresa} />
      </Layout>
    );
  }
}
