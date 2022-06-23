import React from "react.js";

class UserEdit extends React.Component {
    render() {
        return (
            <div>
                <h2>Editar Usuários</h2>
                <label htmlFor='Nome'>Nome</label>
                <input
                    id="Nome"
                    placeholder="name"
                    type="text"
                    value={this.props.name}
                    onChange={this.props.handleNameChange}
                    
                />
                <label htmlFor="Email">Email</label>
                <input
                    id="Email"
                    placeholder="email"
                    type="email"
                    value={this.props.email}
                    onChange={this.props.handleEmailChange}
                />
                <button onClick={() => this.props.handleEditUser(this.props.userDetail.id)}>Confirmar</button>
                <button onClick={this.props.changeToEdit}>Voltar</button>
            </div>
        );
    };
};

export default UserEdit;