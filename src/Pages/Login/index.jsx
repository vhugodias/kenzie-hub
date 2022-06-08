import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory, Redirect } from "react-router-dom";
import Api from "../../Services";
import "./style.css";

function Login({ authenticated, setAuthenticated }) {
  const history = useHistory();

  const schema = yup.object().shape({
    email: yup.string().required("Insira seu E-mail").email("E-mail inválido"),
    password: yup.string().required("Insira sua senha"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitLogin = (data) => {
    Api.post("/sessions", data)
      .then((response) => {
        localStorage.setItem(
          "@KenzieHub:token",
          JSON.stringify(response.data.token)
        );
        localStorage.setItem(
          "@KenzieHub:user",
          JSON.stringify(response.data.user)
        );
        setAuthenticated(true);
      })
      .catch(console.log("aqui vai um toast de erro"));
  };

  if (authenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="loginContainer">
      <h1 className="logo">Kenzie Hub</h1>
      <div className="loginForm">
        <h2>Login</h2>
        <form onSubmit={handleSubmit(submitLogin)}>
          <label>E-mail</label>
          <input
            name="email"
            placeholder="Digite seu E-mail"
            {...register("email")}
          />
          <p>{errors.email && errors.email.message}</p>
          <label>Senha</label>
          <input
            name="password"
            type="password"
            placeholder="Digite sua Senha"
            {...register("password")}
          />
          <p>{errors.password && errors.password.message}</p>
          <button>Entrar</button>
        </form>
        <div className="registerButton">
          <span>Ainda não possui uma conta?</span>
          <button onClick={() => history.push("/Register")}>Cadastre-se</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
