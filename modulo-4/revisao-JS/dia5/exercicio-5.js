function inputValidat(input) {
    const answer = {

        isError: false, errors: []

    }

    const chaves = Object.keys(input)

    for (let element of chaves) {

        if (input[element] === undefined) {

            answer.isError = true

            answer.errors.push(element)
        }
    }
    return answer
}

console.log(inputValidat({ id: 1, nome: undefined }))

console.log(inputValidat({ id: 1, nome: "Pâmela Lorenz" }))

console.log(inputValidat({ id: 1, nome: undefined, email: undefined }))
