import React from "react.js";

class SignUp extends React.Component {
  render() {
    return (
      <div>
        <h2>Criar Usuários</h2>
        <label htmlFor='Nome'>Nome</label>
        <input
          id="Nome"
          placeholder="Nome"
          type="text"
          value={this.props.name}
          onChange={this.props.handleNameChange}
        />
        <label htmlFor="Email">Email</label>
        <input
          id="Email"
          placeholder="E-mail"
          type="email"
          value={this.props.email}
          onChange={this.props.handleEmailChange}
        />
        <button onClick={this.props.handleCreateUser}>Criar Usuário</button>
      </div>
    );
  }
}

export default SignUp;
