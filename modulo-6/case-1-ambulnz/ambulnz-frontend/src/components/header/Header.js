import { goToBack } from "../../routes/cordinator";
import { useNavigate } from "react-router-dom"

function Header(props) {

  const navigate = useNavigate()

  const showHeader = () => {
    switch (props.currentPage) {
      case "home":
        return <h3>Ambulnz</h3>;
      case "cart":
        return (
          <>
            <h3>Meu carrinho</h3>
            <button onClick={()=> goToBack(navigate)}> Voltar </button>
          </>
        );

      case "details":
        return(
          <>
            <h3>Ambulnz</h3>
            <button onClick={()=> goToBack(navigate)}> Voltar </button>
          </>
          );
      case "address":
        return <h3>Meu endereço</h3>;
      case "edit-address":
        return (
          <>
            <h3>Editar endereço</h3>
            <button onClick={()=> goToBack(navigate)}> Voltar </button>
          </>
        );
      case "profile":
        return (
          <>
            <h3>Meu perfil</h3>
            <button onClick={()=> goToBack(navigate)}> Voltar </button>
          </>
        );
      case "edit-profile":
        return (
          <>
            <h3>Editar perfil</h3>
            <button onClick={()=> goToBack(navigate)}> Voltar </button>
          </>
        );
      default:
        return <h3>Ambulnz</h3>;
    }
  };

  return <>{showHeader()}</>;
}

export default Header;
