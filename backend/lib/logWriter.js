import fs from 'fs/promises';

export const LogWriter = async (content)=>{
    const {method , url , host, ms} = content;
    try {
        const logEntry = `Request in ${url} from ${host} with method ${method} in ${ms}\n`;
        await fs.appendFile(new URL('../constants/logger.txt', import.meta.url), logEntry, "utf8");
        console.log("Log entry added");
    } catch (error) {
        console.log("Error while logging.", error.message);
        
    }
}