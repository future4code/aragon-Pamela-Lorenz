import React from 'react';


/* Classe PlaylistsExhibition-> responsável pela renderização dos recursos de exibir
    e remover playlists, além de permitir acessar a Tela2 e produzir o efeito de filtro
    em busca em PlaylistsManage.
    É o equivalente à Seção2 da Tela1 descrita na atividade. */
class PlaylistsExhibition extends React.Component {
    render() {
        /* Descrição de funcionamento da lógica de filtro e mapeamento de playlists
            
            PARTE 1)
            variável playlists -> criada para produzir o efeito de filtrar quando um
            faz uma busca e renderizar os resultados (tanto de busca quanto sem busca).
            Implementação segue a ordem: array.filter().map()
            
            PARTE 2)
            Implementação do filter() -> O filter é um método de array que cria um novo
            array toda vez que uma condição criada no seu interior for true.
           
            PARTE 3)
            Lógica do filter -> recebemos a informação de pesquisa inserida pelo usuário no
            campo de busca através da props searchValue. Se o usuário digitar qualquer caractere
            no campo, acessamos a primeira parte da condicional. Caso contrário, retornamos sempre
            um valor verdadeiro e, portanto, o array completo de playlists (playlist.name é verdadeiro pra qualquer
            string não vazia). A primeira parte da condicional if/else retornará verdadeiro se o
            valor inserido em searchValue for compatível ao nome de uma playlist existente.
            
            PARTE 4)
            Método utilizado na verificação -> string.search(testString)
            Se testString existir dentro de string, retornamos um valor numérico referente à posição
            do primeiro caractere de testString encontrado em string. Caso contrário, o resultado será -1

            PARTE 5)
            Exemplo de uso ->
            const string = "girafa"
            string.search("ir") -> resultado será 1 (i está no 2º caractere de girafa)
            string.search("m") -> resultado será -1 (não existe o caractere m em girafa)
        */
        const playlists = this.props.playlists
        .filter((playlist) => {
            if (this.props.searchValue) {  
                return playlist.name.search(this.props.searchValue) !== -1;
            } else {
                return playlist.name;
            }
        })
        .map((playlist) => {
            return (
                <div key={playlist.id}>
                    <p>{playlist.name}</p>
                    <button onClick={() => this.props.changePage("tracksPage", playlist)}>Acessar playlist</button>
                    <button onClick={() => this.props.deletePlaylist(playlist.id)}>Excluir</button>
                    <hr />
                </div>
            );
        });

        return (
            <div>
                <h1>Lista de Playlists</h1>
                <h2>Nomes das Playlists</h2>
                {playlists}
            </div>
        );
    };
};

export default PlaylistsExhibition;