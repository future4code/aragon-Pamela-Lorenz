import React from "react.js";

class Users extends React.Component {
  render() {
    return (
      <div>
        <h2>Lista de Usuários</h2>
        <ul>
          {this.props.usersList.length === 0 && <div>Carregando...</div>}
          {this.props.usersList.map((user) => {
            return (
              <li key={user.id}>
                <span onClick={() => this.props.getUserDetail(user.id)}>
                  {user.name}
                </span>
                <button
                  onClick={() => this.props.handleUserDeletion(user.id)}
                >
                  excluir
                </button>
              </li>
            );
          })}
        </ul>        
      </div>
    );
  }
}

export default Users;
