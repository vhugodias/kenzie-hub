import "./style.css";

function Card({ tech, setEditTech, setTechUpdate }) {
  const openModal = () => {
    setEditTech(true);
    setTechUpdate(tech);
  };
  return (
    <li className="cardContainer" onClick={openModal}>
      <p className="title">{tech.title}</p>
      <p>{tech.status}</p>
    </li>
  );
}

export default Card;
