// coluna de botoes de editar, excluir e detalhes para ser usada em qualquer tabela, com o objetivo de adiantar o desenvolvimento de telas com CRUD simples
// além de ser possível adicionar novos componentes para cada tela, como o botão de empréstimo na tela de livros, ou o botão de cadastro de usuário na tela de usuários
import React from 'react';
import GlobalConstants from '../utils/GlobalContants';

const ButtonsColumn = ({ onEdit, onDelete, onDetails, extraButton }) => {
    return (
        <div className="buttons-column" style={{display: 'flex', justifyContent: 'center'}}>
            <button onClick={onEdit} className='btn-clm-al' title={GlobalConstants.EDIT_GENERIC_DESCRIPTION}>
                <i className="material-icons">edit</i>
            </button>
            <button onClick={onDelete} className='btn-clm-al' title={GlobalConstants.DELETE_GENERIC_DESCRIPTION}>
                <i className="material-icons">delete</i>
            </button>
            <button onClick={onDetails} className='btn-clm-al' title={GlobalConstants.DETAILS_GENERIC_DESCRIPTION}>
                <i className="material-icons">info</i>
            </button>
            {extraButton}
        </div>
    );
}

export default ButtonsColumn;