import { TableName } from "../config/table-name";
import { PairsDataEntity } from "../entity/pairs-data-entity";


export const updatePairData = async(symbol:string, priceAsk:number, priceBid:number) => {
    await PairsDataEntity.getRepository()
        .query(`INSERT INTO ${TableName.PAIRS_DATA} (symbol, priceBid, priceAsk) VALUES (?, ?, ?) 
            ON DUPLICATE KEY UPDATE priceAsk = ?, priceBid = ?`
        ,[symbol, priceAsk, priceBid, priceAsk, priceBid]);
}
