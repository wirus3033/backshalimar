const app = require('./src/app');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
