import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Api from "../../Services";
import "./style.css";
import { toast } from "react-toastify";

function AddModal({ setModal, token, loadList }) {
  const schema = yup.object().shape({
    title: yup.string().required("Campo obrigatório"),
    status: yup.string().required("Campo obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const submitTech = (data, event) => {
    Api.post("/users/techs", data, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        setModal(false);
        loadList();
        toast.success("Tecnologia adicionada com sucesso!");
      })
      .catch((err) => {
        toast.error("Ops!Algo deu errado");
      });
    event.target.reset();
  };

  const closeModal = () => {
    setModal(false);
  };

  return (
    <div className="modalContainer">
      <div className="modalHeader">
        <p>Cadastrar Tecnologia</p>
        <button onClick={closeModal}>x</button>
      </div>
      <div className="modalForm">
        <form onSubmit={handleSubmit(submitTech)}>
          <label>Nome</label>
          <input
            type="text"
            placeholder="Typescript"
            name="title"
            {...register("title")}
          />
          <p>{errors.title && errors.title.message}</p>
          <label>Selecionar status</label>
          <select name="status" {...register("status")}>
            <option value="Iniciante">Iniciante</option>
            <option value="Intermediário">Intermediário</option>
            <option value="Avançado">Avançado</option>
          </select>
          <button className="addButton">Cadastrar tecnologia</button>
        </form>
      </div>
    </div>
  );
}

export default AddModal;
