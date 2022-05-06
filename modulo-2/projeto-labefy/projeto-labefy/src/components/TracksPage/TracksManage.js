import React from 'react';

/* Classe TracksManage -> responsável pela renderização dos recursos de cadastrar
    e pesquisar músicas de uma playlist selecionada, além de permitir retornar a
    Tela1.
    É o equivalente à Seção1 da Tela2 descrita na atividade. */
class TracksManage extends React.Component {
    render() {
        return (
            <div>
                <button onClick={() => this.props.changePage("playlistsPage", "")}>Voltar para Playlists</button>
                <h1>Cadastro e Busca</h1>
                <div>
                    <h2>Cadastrar Nova Música</h2>
                    <form onSubmit={this.props.addTrackToPlaylist} >
                        <label htmlFor={"trackName"}>Nome da música: </label>
                        <input
                            id={"trackName"}
                            name={"trackName"}
                            value={this.props.trackName}
                            onChange={this.props.changeInputValues}
                        />
                        <label htmlFor={"artist"}>Artista ou Banda: </label>
                        <input
                            id={"artist"}
                            name={"artist"}
                            value={this.props.artist}
                            onChange={this.props.changeInputValues}
                        />
                        <label htmlFor={"url"}>URL da música: </label>
                        <input
                            id={"url"}
                            name={"url"}
                            value={this.props.url}
                            onChange={this.props.changeInputValues}
                        />
                        <button type={"submit"}>Adicionar música</button>
                    </form>
                    <p>Observação: Utilize arquivos .mp3 ou url´s compatíveis .mp3 para teste.</p>
                </div>
                <div>
                    <h2>Busca de Música</h2>
                    <label htmlFor={"searchValue"}>Digite sua busca</label>
                    <input
                        id={"searchValue"}
                        name={"searchValue"}
                        value={this.props.searchValue}
                        onChange={this.props.changeInputValues}
                    />
                    <p>Observação: Para remover o filtro da pesquisa é necessário apagar os dados digitados no input de busca.</p>
                </div>
            </div>
        );
    };
};

export default TracksManage;