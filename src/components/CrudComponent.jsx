// Estrutura completa de um crud, com listagem, busca, paginação, botões de ação e modais para adicionar/editar e confirmar exclusão
// Porém cabe ao desenvolvedor implementar as funções de adicionar, editar, excluir e buscar, além de criar os modais de adicionar/editar e confirmar exclusão
// O objetivo é adiantar o desenvolvimento de telas com CRUD simples, além de ser possível adicionar novos componentes para cada tela, como o botão de empréstimo na tela de livros, ou o botão de cadastro de usuário na tela de usuários
import React, { useState, useEffect } from 'react';
import GlobalConstants from '../utils/GlobalContants';
import OptionPanel from '../components/OptionPanel';
import ButtonsColumn from '../components/ButtonsColumn';
import ModalConfirme from '../components/ModalConfirme';

const CrudComponent = ({ data, onAdd, onEdit, onDelete, onDetails, onSearch, fields, heads, openModal, extOptions, extButtons,  handleSearchChange, onRefresh}) => {

    const [searchTerm, setSearchTerm] = useState("");

    // const handleSearchChange = (e) => {
    //     setSearchTerm(e.target.value);
    // };

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
    };

    return (
        <div className='my-container'>

            <ModalConfirme
                id="modalConfirme"
                title="Confirmação"
                message="Tem certeza que deseja excluir este item?"
                onConfirm={() => onDelete()}
            />

            <OptionPanel
                onAdd={onAdd}
                onSearch={handleSearch}
                onSearchChange={handleSearchChange}
                onRefresh={onRefresh}
                children={extOptions}
            />

            <table className="my-table highlight centered">
                <thead>
                    <tr>
                        {heads.map(head => (
                            <th key={head}>{head}</th>
                        ))}
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map(item => (
                        <tr key={item.id}>
                            {fields.map(field => (
                                <td key={field}>{item[field]}</td>
                            ))}
                            <td>
                                <ButtonsColumn 
                                    onEdit={() => onEdit(item)} 
                                    onDelete={() => openModal(item)} 
                                    onDetails={() => onDetails(item)} 
                                    extraButton={extButtons}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


export default CrudComponent;