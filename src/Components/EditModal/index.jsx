import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Api from "../../Services";
import "./style.css";
import { toast } from "react-toastify";

function EditModal({ setEditTech, token, techUpdate, loadList }) {
  const id = techUpdate.id;

  const schema = yup.object().shape({
    status: yup.string().required("Campo obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const submitEdit = (data) => {
    Api.put(`users/techs/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        setEditTech(false);
        loadList();
        toast.success("Tecnologia atualizada com sucesso!");
      })
      .catch((err) => {
        toast.error("Ops!Algo deu errado");
      });
  };

  const deleteTech = () => {
    Api.delete(`users/techs/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        loadList();
        setEditTech(false);
        toast.success("Tecnologia deletada com sucesso!");
      })
      .catch((err) => {
        toast.error("Ops!Algo deu errado");
      });
  };
  return (
    <div className="modalContainer">
      <div className="modalHeader">
        <p>Tecnologia Detalhes</p>
        <button onClick={() => setEditTech(false)}>x</button>
      </div>
      <div className="modalForm">
        <form onSubmit={handleSubmit(submitEdit)}>
          <label>Nome</label>
          <input
            type="text"
            placeholder={techUpdate.title}
            name="title"
            disabled
          />
          <p>{errors.title && errors.title.message}</p>
          <label>Selecionar status</label>
          <select name="status" {...register("status")}>
            <option value="Iniciante">Iniciante</option>
            <option value="Intermediário">Intermediário</option>
            <option value="Avançado">Avançado</option>
          </select>
          <div className="containerButtons">
            <button className="submitButton" type="submit">
              Salvar Alterações
            </button>
            <button className="deleteButton" onClick={deleteTech}>
              Excluir
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditModal;
