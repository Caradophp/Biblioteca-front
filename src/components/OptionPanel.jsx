// painel com opções básicas de adicionar e pesquisar para ser usado em qualquer tela, com o objetivo de adiantar o desenvolvimento de telas com CRUD simples
// além de ser possível adicionar novos componentes para cada tela, como o botão de empréstimo na tela de livros, ou o botão de cadastro de usuário na tela de usuários
import React from 'react';
import GlobalConstants from '../utils/GlobalContants';

const OptionPanel = ({ onAdd, onSearch, onSearchChange, onRefresh, children }) => {
    return (
        <div className="option-panel">
            <div className='flex'>
                <button className="btn waves-effect waves-light btn-al" title={GlobalConstants.ADD_GENERIC_DESCRIPTION} onClick={onAdd}>
                    <i className="material-icons">add</i>Adicionar
                </button>
            {children}
            </div>
            <form className="search-form" style={{display: 'flex'}} onSubmit={onSearch}>
                <input type="search" name="busca" id="busca" placeholder="Buscar..." onChange={onSearchChange}/>
                <button type="submit" className="btn waves-effect waves-light"><i className="material-icons">search</i></button>
                <button type="button" className='btn waver-effect waves-light' onClick={onRefresh}><i className='material-icons'>refresh</i></button>
            </form>
        </div>
    );
};

export default OptionPanel;