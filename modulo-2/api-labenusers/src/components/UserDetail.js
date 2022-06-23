import React from "react.js";

class UserDetail extends React.Component {
  render() {
    return (
        <div>
          <h2>Detalhes do Usuário</h2>
          {this.props.userDetail.id ? <div>
            <label>Nome do Usuário:</label>
            <p>{this.props.userDetail.name}</p>
            <label>Email do usuário:</label>
            <p>{this.props.userDetail.email}</p>
            <button onClick={this.props.changeToEdit}>Editar Usuário</button>
          </div> : <p>Não há usuários buscados</p>} 
        </div>
    );
  }
}

export default UserDetail;
