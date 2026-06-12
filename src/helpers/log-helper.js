import 'dotenv/config'
import fs from 'fs';

class LogHelper {

    constructor() {
        this.filePath = process.env.LOG_FILE_PATH;
        this.fileName = process.env.LOG_FILE_NAME;
        this.logToFileEnabled = process.env.LOG_TO_FILE_ENABLED.toLowerCase() === 'true';
        this.logToConsoleEnabled = process.env.LOG_TO_CONSOLE_ENABLED.toLowerCase() === 'true';
    }

    /**
     * Este método almacena en un archivo de texto y/o muestra por consola información del Error.
     * @param {*} errorObject
     */
    logError = (errorObject) => {

        const fechaHora = new Date().toISOString();

        const mensaje =
            `[${fechaHora}] ERROR: ${errorObject.message}\n` +
            `${errorObject.stack}\n\n`;

        if (this.logToConsoleEnabled) {
            console.error(mensaje);
        }

        if (this.logToFileEnabled) {

            const fullPath = this.filePath + this.fileName;

            fs.appendFileSync(
                fullPath,
                mensaje,
                { encoding: 'utf8' }
            );
        }
    }
}

export default new LogHelper();