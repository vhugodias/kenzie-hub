import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useHistory, Redirect } from "react-router-dom";
import Api from "../../Services";
import "./style.css";
import { toast } from "react-toastify";

function Register({ authenticated }) {
  const history = useHistory();

  const schema = yup.object().shape({
    name: yup.string().required("Nome obrigatório"),
    email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
    password: yup.string().required("Senha obrigatória"),
    confirmPassword: yup
      .string()
      .required("Confirmação obrigatória")
      .oneOf([yup.ref("password"), null], "Senhas diferentes"),
    course_module: yup.string().required("Escolha um módulo"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const submitRegister = ({ name, email, password, course_module }) => {
    Api.post("/users/", {
      name,
      password,
      email,
      course_module,
      bio: " ",
      contact: " ",
    })
      .then((response) => {
        toast.success("Conta criada com sucesso!");
        history.push("/");
      })
      .catch((err) => {
        toast.error("Ops!Algo deu errado");
      });
  };

  if (authenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div>
      <div className="header">
        <h2 className="logo">Kenzie Hub</h2>
        <button onClick={() => history.push("/")}>Voltar</button>
      </div>
      <div className="registerContainer">
        <div className="registerContainerHeader">
          <h1>Crie sua conta</h1>
          <p>Rápido e grátis, vamos lá</p>
        </div>
        <div className="registerForm">
          <form onSubmit={handleSubmit(submitRegister)}>
            <label>Nome</label>
            <input
              name="name"
              type="text"
              placeholder="Digite aqui seu nome"
              {...register("name")}
            />
            <p>{errors.name && errors.name.message}</p>
            <label>E-mail</label>
            <input
              name="email"
              type="email"
              placeholder="Digite aqui seu e-mail"
              label="E-mail"
              {...register("email")}
            />
            <p>{errors.email && errors.email.message}</p>
            <label>Senha</label>
            <input
              name="password"
              type="password"
              placeholder="Digite aqui sua senha"
              label="Senha"
              {...register("password")}
            />
            <p>{errors.password && errors.password.message}</p>
            <label>Confirme sua senha</label>
            <input
              name="confirmPassword"
              type="password"
              placeholder="Digite novamente sua senha"
              label="Confirmar senha"
              {...register("confirmPassword")}
            />
            <p>{errors.confirmPassword && errors.confirmPassword.message}</p>
            <label>Selecionar módulo</label>
            <select {...register("course_module")}>
              <option>Primeiro Módulo</option>
              <option>Segundo Módulo</option>
              <option>Terceiro Módulo</option>
              <option>Quarto Módulo</option>
            </select>
            <p>{errors.course_module && errors.course_module.message}</p>
            <button>Cadastrar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
