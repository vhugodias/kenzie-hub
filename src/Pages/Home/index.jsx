import { useEffect, useState } from "react";
import Api from "../../Services";
import { Redirect, useHistory } from "react-router-dom";
import AddModal from "../../Components/Modal";
import EditModal from "../../Components/EditModal";
import Card from "../../Components/Card";
import "./style.css";

function Home({ authenticated, setAuthenticated }) {
  const history = useHistory();
  const [token] = useState(
    JSON.parse(localStorage.getItem("@KenzieHub:token"))
  );

  const [user] = useState(JSON.parse(localStorage.getItem("@KenzieHub:user")));

  const [techs, setTechs] = useState([]);
  const [modal, setModal] = useState(false);
  const [editTech, setEditTech] = useState(false);
  const [techUpdate, setTechUpdate] = useState({});

  const logout = () => {
    localStorage.clear();
    setAuthenticated(false);
    history.push("/");
  };

  const addTech = () => {
    setModal(true);
  };
  const loadList = () => {
    Api.get(`users/${user.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => setTechs(response.data.techs))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadList();
  }, []);

  if (!authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <>
      {modal ? (
        <AddModal setModal={setModal} token={token} loadList={loadList} />
      ) : null}
      {editTech ? (
        <EditModal
          setEditTech={setEditTech}
          techUpdate={techUpdate}
          token={token}
          loadList={loadList}
        />
      ) : null}
      <div className="homeContainer">
        <header>
          <h1 className="logo">Kenzie Hub</h1>
          <button onClick={logout}>Voltar</button>
        </header>
        <div className="userContainer">
          <h1>Olá, {user.name}</h1>
          <p>{user.course_module}</p>
        </div>
        <main>
          <div className="techHeader">
            <h2>Tecnologias</h2>
            <button onClick={addTech}>+</button>
          </div>
          <div className="listContainer">
            <ul>
              {techs?.map((tech) => {
                return (
                  <>
                    <Card
                      tech={tech}
                      setEditTech={setEditTech}
                      setTechUpdate={setTechUpdate}
                    />
                  </>
                );
              })}
            </ul>
          </div>
        </main>
      </div>
    </>
  );
}

export default Home;
