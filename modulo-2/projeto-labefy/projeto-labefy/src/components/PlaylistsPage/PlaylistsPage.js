import React from 'react';
import axios from 'axios';
import PlaylistsManage from './PlaylistsManage';
import PlaylistsExhibition from './PlaylistsExhibition';

// variável baseUrl -> parte que se repete nas requisições
export const baseUrl = "https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists";

// variáve axiosConfig -> objeto com configurações de Headers (authorization)
export const axiosConfig = {
    headers: {
        Authorization: "pedro-severo"
    }
};

/* Classe PlaylistsPage -> responsável pela renderização dos recursos referentes às
    playlists (cadastro, exibição e remoção de playlists).
    É o equivalente à Tela1 descrita na atividade. */
class PlaylistsPage extends React.Component {
    // Estado que armazena as seguintes propriedades:
    // name - nome digitado para a nova playlist
    // searchValue - nome de playlist digitada no campo de busca
    // playlists - lista de todas as playlists
    state = {
        name: "",
        searchValue: "",
        playlists: []
    };

    // Função que determina a renderização inicial de playlists na tela
    componentDidMount = () => {
        this.getPlaylists();
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

    // Função que retorna a lista de playlists
    getPlaylists = () => {
        axios.get(baseUrl, axiosConfig)
        .then((response) => {
            this.setState({playlists: response.data.result.list});
        }).catch((error) => {
            alert("Ops, um erro ocorreu!");
            console.log(error);
        });
    };

    /* Função que cria uma nova playlist
    Observação: Na utilização do elemento <form onSubmit={funcao}> é necessário 
    receber event e na primeira linha definir o método event.preventDefault()
    Isto evita problemas na utilização de forms
    */
    createPlaylist = (event) => {
        event.preventDefault();

        const body = {
            name: this.state.name
        };

        axios.post(baseUrl, body, axiosConfig)
        .then(() => {
            alert('Playlist cadastrada com sucesso');
            this.getPlaylists();
        })
        .catch((error) => {
            alert("Ops, um erro ocorreu! Tente novamente");
            console.log(error);
        });

        this.setState({ name: "" });
    };

    // Função que remove uma playlist da lista 
    deletePlaylist = (playlistId) => {
        if(window.confirm("Tem certeza que deseja excluir playlist?")) {
            axios.delete(`${baseUrl}/${playlistId}`, axiosConfig)
            .then(() => {
                alert('Playlist removida com sucesso');
                this.getPlaylists();
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
                <PlaylistsManage 
                    name={this.state.name}
                    changeInputValues={this.changeInputValues}
                    createPlaylist={this.createPlaylist}
                />
                <hr />
                <PlaylistsExhibition 
                    playlists={this.state.playlists}
                    searchValue={this.state.searchValue}
                    deletePlaylist={this.deletePlaylist}
                    changePage={this.props.changePage}
                />
            </div>
        );
    };
};

export default PlaylistsPage;