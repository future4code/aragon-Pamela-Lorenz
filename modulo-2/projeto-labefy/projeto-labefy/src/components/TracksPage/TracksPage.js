import React from 'react';
import axios from 'axios';
import TracksExhibition from './TracksExhibition';
import TracksManage from './TracksManage';

// variável baseUrl -> parte que se repete nas requisições
export const baseUrl = "https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists";

// variáve axiosConfig -> objeto com configurações de Headers (authorization)
export const axiosConfig = {
    headers: {
        Authorization: "pedro-severo"
    }
};

/* Classe TracksPage-> responsável pela renderização dos recursos referentes a
    músicas (cadastro, exibição e remoção de músicas de uma playlist).
    É o equivalente à Tela2 descrita na atividade. */
class TracksPage extends React.Component {
    // Estado que armazena as seguintes propriedades:
    // trackName - nome digitado para a nova música
    // artist - nome do artista da nova música
    // url - endereço de acesso a nova música
    // searchValue - nome de track digitada no campo de busca
    // tracks - lista de músicas da playlist selecionada
    state = {
        trackName: "",
        artist: "",
        url: "",
        searchValue: "",
        tracks: []
    };

    // Função que determina a renderização inicial de músicas da playlist atual na tela
    componentDidMount = () => {
        this.getTracks();
    };

    // Função que captura as informações de campos inputs de forma genérica
    // Funcionamento:
    // No momento que um campo é preenchido, utilizamos o this.setState para preencher a propriedade do estado escolhido
    // Sintaxe utilizada -> this.setState({ [nomeDaPropriedade]: valorDaPropriedade})
    // event.target.name -> é necessário que os elementos input tenham o atributo name para funcionar
    // event.target.value -> é necessário que os elementos input tenham o atributo value para funcionar
    // Exemplo de uso prático: <input name={"nomeDaPropriedadeDoState"} value={this.nomeDaPropriedadeDoState}>
    changeInputValues = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    // Função que retorna a lista de músicas da playlist atual
    getTracks = () => {
        axios.get(`${baseUrl}/${this.props.playlist.id}/tracks`, axiosConfig)
        .then((response) => {
            this.setState({tracks: response.data.result.tracks});
        })
        .catch((error) => {
            alert("Ops, um erro ocorreu!");
            console.log(error);
        });
    };

    /* Função que cria uma nova música na playlist atual
    Observação: Na utilização do elemento <form onSubmit={funcao}> é necessário 
    receber event e na primeira linha definir o método event.preventDefault()
    Isto evita problemas na utilização de forms
    */
    addTrackToPlaylist = (event) => {
        event.preventDefault();

        const body = {
            name: this.state.trackName,
            artist: this.state.artist,
            url: this.state.url
        };

        axios.post(`${baseUrl}/${this.props.playlist.id}/tracks`,
            body,
            axiosConfig
        )
        .then(() => {
            alert("Música criada com sucesso!");
            this.getTracks();
        })
        .catch((error) => {
            alert("Ops, um erro ocorreu! Tente novamente");
            console.log(error);
        });

        this.setState({ trackName: "", artist: "", url: "" });
    };

    // Função que remove uma música da playlist atual
    removeTrackFromPlaylist = (trackId) => {
        if (window.confirm("Tem certeza que deseja remover esta música?")) {
            axios.delete(`${baseUrl}/${this.props.playlist.id}/tracks/${trackId}`, axiosConfig)
            .then(() => {
                alert("Música removida com sucesso!");
                this.getTracks();
            })
            .catch((error) => {
                alert("Ops, um erro ocorreu! Tente novamente");
                console.log(error);
            });
        };
    }; 

    render() {
        return(
            <div>
                <TracksManage 
                    trackName={this.state.trackName}
                    artist={this.state.artist}
                    url={this.state.url}
                    changeInputValues={this.changeInputValues}
                    addTrackToPlaylist={this.addTrackToPlaylist}
                    changePage={this.props.changePage}
                />
                <hr />
                <TracksExhibition 
                    tracks={this.state.tracks}
                    searchValue={this.state.searchValue}
                    removeTrackFromPlaylist={this.removeTrackFromPlaylist}
                    playlist={this.props.playlist}
                />
            </div>
        );
    };
};

export default TracksPage;