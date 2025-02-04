const tables = config.tables
const dataset_dest_name = config.dataset_dest_name

tables.forEach(table => {
    publish(`silver_${table.name}`, {
            type: table.update_mode,
            tags: ["bronze_to_silver", "main_pipeline"],
            schema: dataset_dest_name,
            uniqueKey: table.keys,
            bigquery: {
                partitionBy: 'DATE(LOAD_TS)'
            }
        })
        .query(ctx => `
      SELECT 
        *
      FROM ${ctx.ref(dataset_dest_name,"bronze_" + table.name)}
        WHERE DATE(LOAD_TS)>CURRENT_DATE()-1
    `)
});
