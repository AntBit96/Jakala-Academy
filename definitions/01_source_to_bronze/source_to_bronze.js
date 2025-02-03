const tables = config.tables
const dataset_dest_name = config.dataset_dest_name

tables.forEach(table => {
    publish(`bronze_${table.name}`, {
            type: "incremental",
            tags: ["src_to_bronze", "main_pipeline"],
            schema: dataset_dest_name,
            bigquery: {
                partitionBy: 'DATE(LOAD_TS)'
            }
        })
        .query(ctx => `
      SELECT 
        *,
        CURRENT_TIMESTAMP() AS LOAD_TS
      FROM ${dataset_dest_name + "." + table.name + "_source"}
    `)
});
