import * as express from "express";
import * as MqlController from './../../controller/mql-controller';

const router = express.Router();

// App: MQL Group //
router.post('/mql/update-pair-data', MqlController.updatePairData)

export default router;