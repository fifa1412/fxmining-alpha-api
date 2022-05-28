import { ExceptionList } from "../response/exception-code";

export const ResponseEntity = async (respObj:any) => {
    let errorMessage = "";
    if(typeof respObj.message == 'undefined' || respObj.message == null){
        errorMessage = "Unknown Error"
    }else{
        errorMessage = respObj.message;
    }

    let paginationObject = null;
    if(typeof respObj.pagination != 'undefined'){
        paginationObject = respObj.pagination
    }

    let errorObject = await translateErrorMessageToCode(respObj.success, errorMessage);
    let returnCode = errorObject.code;
    if(respObj.code != null){ // use defined code if available
        returnCode = respObj.code;
    }
    let responseObject = {
        responseData:{
            success: respObj.success,
            code: returnCode,
            message: errorObject.translateMessage,
            pagination: paginationObject,
            data: respObj.data
        }
         
    }
    return responseObject;
}

export const GetPaginationParams = async (req:any) => {
    let limit = Number(req.query.limit) > 0 ? Number(req.query.limit) : 100;
    let offset = Number(req.query.offset) > 0 ? Number(req.query.offset) : 0;
    let page = Number(req.query.page) > 0 ? Number(req.query.page) : 0;
    if(page > 0){ // ถ้าใส่ page เข้ามา จะเอา page เป็นหลัก
        offset = limit * (page-1)
    }
    return [limit, offset, page]
}

export const Pagination = async (limit:any, offset:any, totalItems:any) => {    
    const adjustOffset = parseInt(offset) + 1
    const totalPage = Math.ceil(totalItems / limit)
    const currentPage = Math.ceil(adjustOffset  / limit)
    //const isLastPage = totalPage == currentPage

    return {
        totalItem: totalItems,
        itemPerPage: limit,
        totalPage: totalPage,
        currentPageNo: currentPage,
        //isLastPage: isLastPage
    }
}

const translateErrorMessageToCode = async (isSuccess:any, sourceMessage:any) => {
    let error = {
        code: 0,
        translateMessage: sourceMessage
    }

    if(isSuccess == true){
        error.code = 200;
    }else{
        error.code = 500;
    }

    for await (const exception of ExceptionList){
        if(sourceMessage.includes(exception.likeMessage)){
            error.code = exception.code;
            error.translateMessage = exception.translateMessage
            break;
        }
    }

    return error; 
}
