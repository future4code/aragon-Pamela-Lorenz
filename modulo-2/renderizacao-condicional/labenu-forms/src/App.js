import React from 'react';

class App extends React.Component {
  //Abaixo, nosso estado irá comandar o número do componente a ser renderizado na tela. O componente inicial é o número 1.
  state = {
    componente: 1
  };

  renderizaComponente = () => {

    switch (this.stat.componente) {

      case 1: return <Componente1 />

      case 2: return <Componente2 />

      case 3: return <Componente3 />

      case 4: return <Componente4 />

      default: return <Componente1 />

    }
  }

  //Abaixo, a função responsável para alterar o número do componente. Ela será chamada no botão da linha 24 e o próximo componente será renderizado.
  proximoComponente = () => {
    this.setState({ componente: this.state.componente + 1 });
  };

  render() {
    return (
      <div className="App">
        {/* Abaixo, chamamos a função responsável por renderizar o componente */}
        {this.renderizaComponente()}
        {/* Abaixo, ao clicar no botão, alteramos o estado e a função acima será chamada novamente para renderizar o novo componente */}
        <button onClick={this.proximoComponente}>Próximo componente</button>
      </div>
    );
  }
}

export default App;
