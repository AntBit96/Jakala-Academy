const dataset_dest_name = dataform.projectConfig.vars.destination_dataset

const tables = [{
        name: "anagrafica",
        update_mode: "table",
        keys: []
    },
    {
        name: "calendario",
        update_mode: "incremental",
        keys: ["data_calendario", "id_corso"]
    },
    {
        name: "corsi",
        update_mode: "table",
        keys: []
    },
    {
        name: "voti",
        update_mode: "incremental",
        keys: ["data_calendario", "id_corso","id_studente"]
    },
]


module.exports = {
    dataset_dest_name,
    tables
};