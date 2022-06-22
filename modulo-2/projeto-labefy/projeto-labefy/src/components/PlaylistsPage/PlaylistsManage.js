import React from 'react';

/* Classe PlaylistsManage -> responsável pela renderização dos recursos de cadastrar
    e pesquisar playlists.
    É o equivalente à Seção1 da Tela1 descrita na atividade. */
class PlaylistsManage extends React.Component {
    render() {
        return (
            <div>
                <h1>Cadastro e Busca</h1>
                <div>
                    <h2>Cadastrar Nova Playlist</h2>
                    <form onSubmit={this.props.createPlaylist} >
                        <label htmlFor={'name'}>Nome da playlist: </label>
                        <input
                            id={"name"}
                            name={"name"}
                            value={this.props.name}
                            onChange={this.props.changeInputValues}
                        />
                        <button type={"submit"}>Cadastrar Playlist</button>
                    </form>
                </div>
                <div>
                    <h2>Busca de Playlist</h2>
                    <label htmlFor='searchValue'>Digite sua busca: </label>
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

export default PlaylistsManage;