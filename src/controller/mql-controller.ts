import * as MqlService from '../services/mql-service';


export const updatePairData = async (req:any, res: any) => { 
    const { symbol, priceAsk, priceBid } = req.body;

    await MqlService.updatePairData( symbol, priceAsk, priceBid);

    return res.status(200).send(null);
}