import { createConnection } from "typeorm";
import { config } from '../config';

import { PairsSettingEntity } from "../entity/pairs-settting-entity";
import { PairsDataEntity } from "../entity/pairs-data-entity";


export async function initDatabaseConnection(environment:String) {

    let entitiesPathList = [];
    if(environment == "dev"){
        entitiesPathList = ["src/entity/*.ts"]
    }else{
        entitiesPathList = ["build/entity/*.js"]
    }

    const dbConfig:any = {
        type: "mysql",
        host: config.database.host,
        port: config.database.port,
        username: config.database.username,
        password: config.database.password,
        database: config.database.name,
        synchronize: false,
        logging: true,
        entities: entitiesPathList

    }

    const connection = await createConnection(dbConfig);
    PairsSettingEntity.useConnection(connection);
    PairsDataEntity.useConnection(connection);

}