require('dotenv').config();

export const getEnv = (keyName: any) =>{
    return process.env[keyName]
}

export const configUatList = {
    database:{
        host: getEnv('DB_HOST'),
        port: getEnv('DB_PORT'),
        username: getEnv('DB_USERNAME'),
        password: getEnv('DB_PASSWORD'),
        name: getEnv('DB_NAME'),
    }
    
}

