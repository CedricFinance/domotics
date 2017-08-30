import * as Influx from 'influx';

const database = 'sensors_db';

async function main() {
    try {
        const influx = new Influx.InfluxDB({
        host: 'localhost',
        database: database,
        schema: [
                {
                    measurement: 'temperatures',
                    fields: {
                        temperature: Influx.FieldType.FLOAT
                    },
                    tags: [
                        'room',
                        'sensor_id'
                    ]
                }
            ]
        });

        const databases = await influx.getDatabaseNames();

        console.log(`Found ${databases.length} databases: ${databases.join(", ")}`);

        if (!databases.includes(database)) {
            console.log(`Creating ${database} database`);

            await influx.createDatabase("sensors_db");
        }
    } catch(error) {
        console.log(error);
    }
}

main();
