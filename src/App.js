import './App.css';
import {Component} from 'react';
import {Cabecalho} from './Components/Cabecalho'
import {Categoria} from './Components/Categoria'
import {Pesquisa} from './Components/Pesquisa'
import {Topico} from './Components/Topico'
import {Rodape} from './Components/Rodape'

class App extends Component{
    
    state = {
        busca: '',
        odas: []
    }

    componentDidMount(){
        this.carregaODAS();
    }

    carregaODAS(){
        const {busca} = this.state;
        fetch('https://www.bocaweb.com.br/apibocaweb?nome='+busca)
        .then(response => response.json())
        .then(odas => this.setState({odas}))
        console.log({busca})
    }

    buscaODA = (evento) => {
        this.setState({busca: evento.target.value});
        this.carregaODAS()
    }

    render(){
        const {busca, odas} = this.state;
        return(
            <section className='container'>
                <Cabecalho/>
                <Categoria/>
                <Pesquisa/>
                <Topico/>
                <div className='busca'>
                    
                    <input
                    name='busca'
                    type='text'
                    value={this.state.busca}
                    placeholder='O que deseja buscar?'
                    onChange={this.buscaODA}
                    />
                </div>

                <div className='lista'>
                    <p className='contador'> Existem {odas.length} odas </p>
                    {odas.map(oda => (
                        <div key={oda._id}>
                            <h1> nome: {oda.nome} </h1>
                            <p> usuario: {oda.usuario} </p>
                            <p> descricao: {oda.descricao} </p>
                            <p> data inclusao: {oda.data_inclusao}</p>
                            <p>palavras chave: {oda.palavras_chave}</p>
                        </div>    
                    ))}
                </div>
                <Rodape/>
            </section>
        );
    }
}

export default App;