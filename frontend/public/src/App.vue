

<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { brazilianStringToDate, ISOStringToDate, isISOString } from './dateUtils';
    import * as XLSX from 'xlsx';

    interface Residue {
        id: number;
        type: string;
        date: string;
        preparationResidues: number;
        plateRemainsResidues: number;
        counterRemainsResidues: number;
        preparedFood: number;
    }

    interface searchParamsInterface {
        startDate?: string;
        endDate?: string;
    }

    var startDateString: string = ''
    var endDateString: string = ''
    var allResidues: Residue[] = []
    const filteredResidues = ref(allResidues);

    const getResidues = () => {
        const searchParams: searchParamsInterface = {}
        if (startDateString !== '') {
            searchParams['startDate'] = startDateString
        }
        if (endDateString !== '') {
            searchParams['endDate'] = endDateString
        }
        
        fetch(`${import.meta.env.VITE_API_BASE_PATH}/residues?` + new URLSearchParams(searchParams as any))
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert(data.message)
                return
            }
            allResidues = data;
            filteredResidues.value = data;
        })
        .catch(error => {
            alert('Erro ao buscar dados')
            console.error('Error fetching data:', error);
        });
    }

    const filterResidues = () => {
        const startDate = isISOString(startDateString) ? ISOStringToDate(startDateString) : null
        const endDate = isISOString(endDateString) ? ISOStringToDate(endDateString) : null

        filteredResidues.value = allResidues.filter(residue => {
            const residueDate = brazilianStringToDate(residue.date)
            return (!startDate || residueDate >= startDate) && (!endDate || residueDate <= endDate)
        })
    }

    const downloadResiduesJSON = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(
            JSON.stringify(filteredResidues.value.map(residue => {
                return {
                    id: residue.id,
                    'tipo': residue.type,
                    'data': residue.date,
                    'descarte preparação (kg)': residue.preparationResidues,
                    'descarte resto pratos (kg)': residue.plateRemainsResidues,
                    'descarte cuba (kg)': residue.counterRemainsResidues,
                    'comida preparada (kg)': residue.preparedFood
                }
            }))
        );
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "residues.json");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }

    const downloadResiduesCSV = () => {
        var csvText = "data:text/csv;charset=utf-8,";
        csvText += "id,tipo,data,descarte preparação (kg),descarte resto pratos (kg),descarte cuba (kg),comida preparada (kg)\n";
        filteredResidues.value.forEach(residue => {
            csvText += `${residue.id},${residue.type},${residue.date},${residue.preparationResidues},${residue.plateRemainsResidues},${residue.counterRemainsResidues},${residue.preparedFood}\n`
        });
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", csvText);
        downloadAnchorNode.setAttribute("download", "residues.csv");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }

    const downloadResiduesXLSX = () => {
        // https://stackoverflow.com/questions/28892885/javascript-json-to-excel-file-download
        var residues = filteredResidues.value.map(residue => {
            return {
                id: residue.id,
                'tipo': residue.type,
                'data': residue.date,
                'descarte preparação (kg)': residue.preparationResidues,
                'descarte resto pratos (kg)': residue.plateRemainsResidues,
                'descarte cuba (kg)': residue.counterRemainsResidues,
                'comida preparada (kg)': residue.preparedFood
            }
        });

        var ws = XLSX.utils.json_to_sheet(residues);
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Residues");
        XLSX.writeFile(wb, "residues.xlsx");
    }
</script>

<template>
    <div id="app">
        <h1>Dados sobre descarte</h1>
        <p>
            Este é a entrega do trabalho “Projeto de Melhoria DMAIC na UFSCar, com foco na Sustentabilidade” que integra os alunos dos cursos de Ciência da Computação, Engenharia Florestal e Engenharia de Produção. 
        </p>
        <p>
            Este é o trabalho da equipe 2, com os seguintes integrantes:
            <ul>
                <li>Alexandre Ferrati Faitanini</li>
                <li>Daniel Meireles Nogueira</li>
                <li>Guilherme Augusto Lucena Vicentini</li>
                <li>Joao Pedro Gonzales dos Santos</li>
                <li>Maria Eduarda Canaparo Zago Cezar</li>
                <li>Willian Akio Tanaka</li>
                <li>Gregório Fornetti Azevedo</li>
                <li>Maria Anita de Moura</li>
                <li>Matheus de Araujo</li>
                <li>Wilson Antunes Luques Oliver</li>
                <li>Evandro Barbosa de Castro Junior</li>
                <li>Giuliana Graziela Zavatta </li>
                <li>Pedro Augusto Soares Campos</li>
                <li>Sara Rodrigues Minguzzi</li>
                <li>Vinícius Luvizotto Denardi</li>
            </ul>
        </p>
        <p>
            Links importantes:
            <ul>
                <li>
                    <a href='https://github.com/GregorioFornetti/ru-ufscar' target="_blank">Código e documentação da API e das páginas web</a>
                </li>
                <li>
                    <a href='https://github.com/A-nita/app-sustenta-ru' target="_blank">Código do APP</a>
                </li>
                <li>
                    <a href='https://github.com/GregorioFornetti/ru-ufscar/blob/main/backend/readme.md' target="_blank">Documentação da API</a>
                </li>  
            </ul>
        </p>
        <h2>Filtros</h2>
        <div class="mb-3">
            <label for="date" class="form-label">Data inicio</label>
            <input type="date" class="form-control date-input" id="date" placeholder="Data" v-model="startDateString" />
        </div>
        <div class="mb-3">
            <label for="date" class="form-label">Data fim</label>
            <input type="date" class="form-control date-input" id="date" placeholder="Data" v-model="endDateString"/>
        </div>
        <div class="mb-3">
            <button type="button" class="btn btn-primary" @click="getResidues">Buscar</button>
        </div>
        <h2>Dados</h2>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Data</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Comida preparada (kg)</th>
                    <th scope="col">Descarte preparação (kg)</th>
                    <th scope="col">Descarte resto pratos (kg) </th>
                    <th scope="col">Descarte resto cuba (kg)</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="residue in filteredResidues" :key="residue.id">
                    <th scope="row">{{ residue.id }}</th>
                    <td>{{ residue.date }}</td>
                    <td>{{ residue.type }}</td>
                    <td>{{ residue.preparedFood }}</td>
                    <td>{{ residue.preparationResidues }}</td>
                    <td>{{ residue.plateRemainsResidues }}</td>
                    <td>{{ residue.counterRemainsResidues }}</td>
                </tr>
            </tbody>
        </table>
    </div>

    <div v-if="filteredResidues.length > 0">
        <h2>Downloads</h2>
        <div>
            <button type="button" class="btn btn-primary me-3" @click="downloadResiduesJSON">JSON</button>
            <button type="button" class="btn btn-primary me-3" @click="downloadResiduesCSV">CSV</button>
            <button type="button" class="btn btn-primary" @click="downloadResiduesXLSX">XLSX</button>
        </div>
    </div>
</template>

<style scoped>
  #app {
    margin: 10px;
  }

  .date-input {
    max-width: 200px;
  }
</style>