import axios from 'axios'

export const ruInfoUrl = 'https://www.proad.ufscar.br/pt-br/servicos/restaurante-universitario'

export async function getRuInfo() {
    return axios.get(ruInfoUrl)
    .then((response) => {
        return response.data
    })
}
