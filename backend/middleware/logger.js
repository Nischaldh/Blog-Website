import {LogWriter} from "../lib/logWriter.js"


const logger = async (ctx,next)=>{
    const {method, url , header} = ctx.request;
    const host = header.host;
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    const content = {
        method, 
        url,
        host,
        ms
    }
    LogWriter(content);
}

export default logger;