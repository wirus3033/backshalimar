const pool = require('./src/config/db');

async function checkSchema() {
    try {
        console.log('--- Checking Table: utilisateur ---');
        const [utilColumns] = await pool.execute('SHOW COLUMNS FROM utilisateur');
        console.log(JSON.stringify(utilColumns, null, 2));

        console.log('\n--- Checking Table: profil ---');
        const [profilColumns] = await pool.execute('SHOW COLUMNS FROM profil');
        console.log(JSON.stringify(profilColumns, null, 2));

        process.exit(0);
    } catch (error) {
        console.error('Schema Check Error:', error.message);
        process.exit(1);
    }
}

checkSchema();
