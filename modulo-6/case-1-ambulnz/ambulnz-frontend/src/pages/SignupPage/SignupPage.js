import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const navigate = useNavigate();

  const { signUp, checker } = context.states;

  const { setSignUp, setChecker } = context.setters;

  const { postSignUp } = context.posts;

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

      <form onSubmit={signUp}>
        required
        id="name"
        label="nome"
        name="name"
        autoComplete="name"
        placeholder="Nome e sobrenome"
        value={signUp.name}
        onChange={onChangeSignUp}

        required
        id="email"
        label="email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="email@email.com"
        value={checker.email}
        onChange={onChangeChecker}

        required
        id="email"
        label="email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="Confirme o email anterior"
        value={signUp.email}
        onChange={onChangeSignUp}
        {checker.email !== signUp.email && (
          <p>
            <b>Repita o mesmo email</b>
          </p>
        )}

        <br />

        required
        id="password"
        label="password"
        name="password"
        type="password"
        placeholder="Mínimo seis caracteres"
        value={checker.password}
        onChange={onChangeChecker}

        required
        id="password"
        label="password"
        name="password"
        type="password"
        placeholder="Confirme a senha anterior"
        value={signUp.password}
        onChange={onChangeSignUp}
        {checker.password !== signUp.password && (
          <p>repita a mesma senha</p>
        )}

        <br />
        {checker.password === signUp.password &&
          checker.email === signUp.email ? (
          <Button type="submit">Cadastrar</Button>
        ) : (
          <Button disabled type="submit">Cadastrar</Button>
        )}
      </form>
    </main>
  )
}
