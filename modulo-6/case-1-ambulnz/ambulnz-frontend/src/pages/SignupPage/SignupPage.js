import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { BASE_URL } from "../../constants/urls"

export default function SignupPage() {
  const navigate = useNavigate();
  const [signUp, setSignUp] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [checker, setChecker] = useState({ email: "", password: "" });

  const postSignUp = () => {
    axios.post(`${BASE_URL}/signup`, signUp)
      .then((res) => {
        alert("Cadastro realizado com sucesso!");
        localStorage.setItem("token", res.data.token);
      })
      .catch((err) => {
        alert("Dados inválidos");
        console.log(err.response.data.message);
      });
  };

  const onChangeSignUp = (e) => {
    setSignUp({ ...signUp, [e.target.name]: e.target.value });
  };

  const onChangeChecker = (e) => {
    setChecker({ ...checker, [e.target.name]: e.target.value });
  };

  const register = (e) => {
    e.preventDefault();
    postSignUp();
  };

  return (
    <main>
      <h1>
        <b>Cadastrar</b>
      </h1>
      <form onSubmit={signUp} >
        <label htmlFor={"name"}> Nome: </label>
        <input
          required
          id="name"
          label="nome"
          name="name"
          autoComplete="name"
          placeholder="Nome e sobrenome"
          value={signUp.name}
          onChange={onChangeSignUp}
          pattern={"^.{3,}$"}
          title={"O nome deve ter no mínimo 3 caracteres"}
        />

        <br />

        <label htmlFor={"email"}> E-mail: </label>
        <input
          required
          id="email"
          label="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="email@email.com"
          value={checker.email}
          onChange={onChangeChecker}
        />

        <br />

        <label htmlFor={"email"}> Senha: </label>
        <input
          required
          id="email"
          label="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Confirme o email anterior"
          value={signUp.email}
          onChange={onChangeSignUp}
        />
        {checker.email !== signUp.email && (
          <p>
            <b>Repita o mesmo email</b>
          </p>
        )}

        <br />

        <label htmlFor={"password"}> Senha: </label>
        <input
          required
          id="password"
          label="password"
          name="password"
          type="password"
          placeholder="Mínimo seis caracteres"
          value={checker.password}
          onChange={onChangeChecker}
          pattern={"^.{8,30}$"}
          password={"O nome deve ter no mínimo 8 e no máximo 30 caracteres"}
        />

        <br />

        <label htmlFor={"password"}> Senha: </label>
        <input
          required
          id="password"
          label="password"
          name="password"
          type="password"
          placeholder="Confirme a senha anterior"
          value={signUp.password}
          onChange={onChangeSignUp}
          pattern={"^.{8,30}$"}
          password={"O nome deve ter no mínimo 8 e no máximo 30 caracteres"}
        />
        {checker.password !== signUp.password && (
          <p>repita a mesma senha</p>
        )}

        {checker.password === signUp.password &&
          checker.email === signUp.email ? (
          <button type="submit">Cadastrar</button>
        ) : (
          <button disabled type="submit">Cadastrar</button>
        )}
      </form>
    </main >
  )
}
