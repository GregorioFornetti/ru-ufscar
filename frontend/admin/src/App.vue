

<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { brazilianStringToDate, ISOStringToDate, isISOString } from './dateUtils';
    import BootstrapModal from './components/BootstrapModal.vue';
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

    var typeInputValue: string = 'almoço'
    var dateInputValue: string = ''
    var preparationResiduesInputValue: string = ''
    var plateRemainsResiduesInputValue: string = ''
    var counterRemainsResiduesInputValue: string = ''
    var preparedFoodInputValue: string = ''
    
    const createEditModalStatus = ref<'closed'|'editing'|'waiting'|'finished'>('closed')
    var currentEditResidue: Residue|null = null
    const errorMessage= ref<string|null>(null)
    const createEditModalTitle = ref('')

    const deleteModalStatus = ref<'closed'|'confirming'|'waiting'|'finished'>('closed')
    var currentDeleteResidue: Residue|null = null

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

    const openCreateModal = () => {
        createEditModalStatus.value = 'editing'
        createEditModalTitle.value = 'Criar novo registro de resíduos'

        currentEditResidue = null
        typeInputValue = 'almoço'
        dateInputValue = ''
        preparationResiduesInputValue = ''
        plateRemainsResiduesInputValue = ''
        counterRemainsResiduesInputValue = ''
        preparedFoodInputValue = ''
    }

    const openEditModal = (residue: Residue) => {
        createEditModalStatus.value = 'editing'
        createEditModalTitle.value = 'Editar registro de resíduos'

        currentEditResidue = residue
        typeInputValue = residue.type
        dateInputValue = brazilianStringToDate(residue.date).toISOString().slice(0, 10)
        preparationResiduesInputValue = residue.preparationResidues.toString()
        plateRemainsResiduesInputValue = residue.plateRemainsResidues.toString()
        counterRemainsResiduesInputValue = residue.counterRemainsResidues.toString()
        preparedFoodInputValue = residue.preparedFood.toString()
    }

    const submitCreateEdit = () => {
        createEditModalStatus.value = 'waiting'
        const reqBody = {
            type: typeInputValue,
            date: dateInputValue,
            preparationResidues: parseFloat(preparationResiduesInputValue),
            plateRemainsResidues: parseFloat(plateRemainsResiduesInputValue),
            counterRemainsResidues: parseFloat(counterRemainsResiduesInputValue),
            preparedFood: parseFloat(preparedFoodInputValue)
        }

        const method = currentEditResidue ? 'PUT' : 'POST'
        const url = currentEditResidue ? `${import.meta.env.VITE_API_BASE_PATH}/residues/${currentEditResidue.id}` : `${import.meta.env.VITE_API_BASE_PATH}/residues`

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqBody)
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                errorMessage.value = data.message
                createEditModalStatus.value = 'finished'
            } else {
                errorMessage.value = null
                createEditModalStatus.value = 'finished'

                if (currentEditResidue) {
                    const index = allResidues.findIndex(residue => residue.id === currentEditResidue!.id)
                    allResidues[index] = data
                } else {
                    allResidues.push(data)
                }

                filterResidues()
            }
        })
    }

    const closeCreateEditModal = () => {
        createEditModalStatus.value = 'closed'
        currentEditResidue = null
    }

    const returnCreateEditModal = () => {
        createEditModalStatus.value = 'editing'
    }

    const openDeleteModal = (residue: Residue) => {
        deleteModalStatus.value = 'confirming'
        currentDeleteResidue = residue
    }

    const submitDelete = () => {
        deleteModalStatus.value = 'waiting'

        fetch(`${import.meta.env.VITE_API_BASE_PATH}/residues/${currentDeleteResidue!.id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                errorMessage.value = data.message
                deleteModalStatus.value = 'finished'
            } else {
                errorMessage.value = null
                deleteModalStatus.value = 'finished'

                const index = allResidues.findIndex(residue => residue.id === currentDeleteResidue!.id)
                allResidues.splice(index, 1)

                filterResidues()
            }
        })
    }

    const returnDeleteModal = () => {
        deleteModalStatus.value = 'confirming'
    }

    const closeDeleteModal = () => {
        deleteModalStatus.value = 'closed'
    }
</script>

<template>
    <div id="app">
        <h1>Painel de controle: dados sobre descarte</h1>
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
        <div class="mb-3">
            <button type="button" class="btn btn-primary" @click="openCreateModal">Criar novo registro</button>
        </div>
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
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="filteredResidues.length > 0" v-for="residue in filteredResidues" :key="residue.id">
                    <th scope="row">{{ residue.id }}</th>
                    <td>{{ residue.date }}</td>
                    <td>{{ residue.type }}</td>
                    <td>{{ residue.preparedFood }}</td>
                    <td>{{ residue.preparationResidues }}</td>
                    <td>{{ residue.plateRemainsResidues }}</td>
                    <td>{{ residue.counterRemainsResidues }}</td>
                    <td>
                        <button type="button" class="btn btn-primary btn-sm me-3" @click="openEditModal(residue)">Editar</button>
                        <button type="button" class="btn btn-danger btn-sm" @click="openDeleteModal(residue)">Excluir</button>
                    </td>
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

    <!-- Create edit modal -->
    <BootstrapModal :show="createEditModalStatus !== 'closed'">
        <template v-slot:header>
            <h5 data-testid="title" class="modal-title">{{ createEditModalTitle }}</h5>
            <button 
                type="button" 
                class="btn-close" 
                aria-label="Close"
                data-testid="btn-close"
                @click="closeCreateEditModal"
            ></button>
        </template>
        <template v-slot:body>
            <!-- Formulario -->
            <div v-if="createEditModalStatus === 'editing'">
                <div class="mb-3">
                    <label for="type" class="form-label">Tipo</label>
                    <select class="form-select" v-model="typeInputValue">
                        <option value="almoço" selected>Almoço</option>
                        <option value="jantar">Jantar</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="date" class="form-label">Data</label>
                    <input type="date" class="form-control date-input" id="date" placeholder="Data" v-model="dateInputValue" />
                </div>
                <div class="mb-3">
                    <label for="preparationResidues" class="form-label">Descarte preparação (kg)</label>
                    <input type="number" class="form-control" id="preparationResidues" placeholder="Descarte preparação (kg)" v-model="preparationResiduesInputValue" />
                </div>
                <div class="mb-3">
                    <label for="plateRemainsResidues" class="form-label">Descarte resto pratos (kg)</label>
                    <input type="number" class="form-control" id="plateRemainsResidues" placeholder="Descarte resto pratos (kg)" v-model="plateRemainsResiduesInputValue" />
                </div>
                <div class="mb-3">
                    <label for="counterRemainsResidues" class="form-label">Descarte resto cuba (kg)</label>
                    <input type="number" class="form-control" id="counterRemainsResidues" placeholder="Descarte resto cuba (kg)" v-model="counterRemainsResiduesInputValue" />
                </div>
                <div class="mb-3">
                    <label for="preparedFood" class="form-label">Comida preparada (kg)</label>
                    <input type="number" class="form-control" id="preparedFood" placeholder="Comida preparada (kg)" v-model="preparedFoodInputValue" />
                </div>
            </div>
            <!-- Loading spinner -->
            <div v-if="createEditModalStatus === 'waiting'">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
            <!-- Error message -->
            <div v-if="createEditModalStatus === 'finished' && errorMessage">
                <div class="alert alert-danger" role="alert">
                    {{ errorMessage }}
                </div>
            </div>
            <!-- Success message -->
            <div v-if="createEditModalStatus === 'finished' && !errorMessage">
                <div class="alert alert-success" role="alert">
                    Registro salvo com sucesso!
                </div>
            </div>
        </template>
        <template v-slot:footer>
            <button class="btn btn-primary" v-if="createEditModalStatus === 'editing'" @click="submitCreateEdit">
                Salvar
            </button>
            <buton class="btn btn-secondary" v-if="createEditModalStatus === 'finished' && !errorMessage" @click="closeCreateEditModal">
                Fechar
            </buton>
            <buton class="btn btn-secondary" v-if="createEditModalStatus === 'finished' && errorMessage" @click="returnCreateEditModal">
                Voltar
            </buton>
        </template>
    </BootstrapModal>

    <!-- Delete modal -->
    <BootstrapModal :show="deleteModalStatus !== 'closed'">
        <template v-slot:header>
            <h5 data-testid="title" class="modal-title">Excluir registro de resíduos</h5>
            <button 
                type="button" 
                class="btn-close" 
                aria-label="Close"
                data-testid="btn-close"
                @click="closeDeleteModal"
            ></button>
        </template>
        <template v-slot:body>
            <div v-if="deleteModalStatus === 'confirming'">
                <p>Tem certeza que deseja excluir o registro de resíduos?</p>
                <p>Essa ação não pode ser desfeita.</p>
            </div>
            <!-- Loading spinner -->
            <div v-if="deleteModalStatus === 'waiting'">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
            <!-- Error message -->
            <div v-if="deleteModalStatus === 'finished' && errorMessage">
                <div class="alert alert-danger" role="alert">
                    {{ errorMessage }}
                </div>
            </div>
            <!-- Success message -->
            <div v-if="deleteModalStatus === 'finished' && !errorMessage">
                <div class="alert alert-success" role="alert">
                    Registro excluído com sucesso!
                </div>
            </div>
        </template>
        <template v-slot:footer>
            <button class="btn btn-danger" v-if="deleteModalStatus === 'confirming'" @click="submitDelete">
                Excluir
            </button>
            <buton class="btn btn-secondary" v-if="deleteModalStatus === 'finished' && !errorMessage" @click="closeDeleteModal">
                Fechar
            </buton>
            <buton class="btn btn-secondary" v-if="deleteModalStatus === 'finished' && errorMessage" @click="returnDeleteModal">
                Voltar
            </buton>
        </template>
    </BootstrapModal>
</template>

<style scoped>
  #app {
    margin: 10px;
  }

  .date-input {
    max-width: 200px;
  }
</style>