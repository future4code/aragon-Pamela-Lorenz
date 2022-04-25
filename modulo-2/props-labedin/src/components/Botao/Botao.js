// 1. Receba as props na linha abaixo
import React from "react";
function Botao(props) {
    return (
        //2. Acesse a prop recebida e substitua o texto do botão pela prop.
        <button>{props.texto}</button>
    );
}

export default Botao;