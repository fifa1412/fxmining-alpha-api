import { ResponseEntity } from '../response/base-response';

export const isEmpty = (value:any) =>{ 
    if(typeof value == 'undefined' || value == null || value == ""){
        return true;
    }else{
        return false;
    }
}

export const isNumber = (value:any) =>{ 
    if(typeof value == 'undefined' || value == null || value == ""){
        return false;
    }else{
        if(value > 0){
            return true;
        }else{
            return false;
        }
    }
}

export const getValue = function(dict:any) { 
    var name = Object.keys(dict)[0];
    var value = dict[name];
    return [name, value]
}

export const ErrorResponse = async (errorMessage:any) => {
    return ResponseEntity({ success: false, message: "Input Validation Error", data: errorMessage.filter((n: any) => n), code: 400})
}

// validate function for string //
export const String = async (
        validateObj:any = {
            value: Object,
            allowNull: Boolean,
            minLength: Number,
            maxLength: Number
        })=> { 

    const valName = validateObj.value[0]
    const val = validateObj.value[1]
    const allowNull = validateObj.allowNull
    const minLength = validateObj.minLength
    const maxLength = validateObj.maxLength

    if(allowNull == false){
        // not allow null //
        if(typeof val == 'undefined' || val == null || val == ""){
            return `${valName}(string): is required`
        }
    }else{
        // allow null => skip check below code //
        if(typeof val == 'undefined' || val == null || val == ""){
            return null;
        }
    }
    if(minLength > 0){
        if(val.length < minLength){
            return `${valName}(string): invalid string length (input: ${val.length} | min: ${minLength})`
        }
    }
    if(maxLength > 0){
        if(val.length > maxLength){
            return `${valName}(string): invalid string length (input: ${val.length} | max: ${maxLength})`
        }
    }
    return null;
}


// validate function for datetime //
export const DateTime = async (
    validateObj:any = {
        value: Object,
        allowNull: Boolean,
        allowPassedTime: Boolean
    })=> { 

    const valName = validateObj.value[0]
    const val = validateObj.value[1]
    const allowNull = validateObj.allowNull
    const allowPassedTime = validateObj.allowPassedTime

    if(allowNull == false){
        // not allow null //
        if(typeof val == 'undefined' || val == null || val == ""){
            return `${valName}(datetime): is required`
        }
    }else{
        // allow null => skip check below code //
        if(typeof val == 'undefined' || val == null || val == ""){
            return null;
        }
    }
    if(await isValidDateTime(val) == false){
        return `${valName}(datetime): incorrect datetime format (yyyy-mm-dd hh:mm:ss)`
    }

    if(allowPassedTime == false){
        var dateObj = new Date(val);
        let diff = new Date().getTime() - dateObj.getTime();
        if(diff > 0){
            return `${valName}(datetime): cannot be passed time`
        }
    }
    return null;
}

// validate function for datetime //
export const DateNoTime = async (
    validateObj: any = {
        value: Object,
        allowNull: Boolean,
        allowPassedTime: Boolean
    })=> { 

    const valName = validateObj.value[0]
    const val = validateObj.value[1]
    const allowNull = validateObj.allowNull
    const allowPassedTime = validateObj.allowPassedTime

    if(allowNull == false){
        // not allow null //
        if(typeof val == 'undefined' || val == null || val == ""){
            return `${valName}(date): is required`
        }
    }else{
        // allow null => skip check below code //
        if(typeof val == 'undefined' || val == null || val == ""){
            return null;
        }
    }
    if(await isValidDate(val) == false){
        return `${valName}(date): incorrect datetime format (yyyy-mm-dd)`
    }

    if(allowPassedTime == false){
        var dateObj = new Date(val);
        let diff = new Date().getTime() - dateObj.getTime();
        if(diff > 0){
            return `${valName}(date): cannot be passed time`
        }
    }
    return null;
}

// validate function for datetime //
export const Time = async (
    validateObj: any = {
        value: Object,
        allowNull: Boolean,
    })=> { 

    const valName = validateObj.value[0]
    const val = validateObj.value[1]
    const allowNull = validateObj.allowNull

    if(allowNull == false){
        // not allow null //
        if(typeof val == 'undefined' || val == null || val == ""){
            return `${valName}(time): is required`
        }
    }else{
        // allow null => skip check below code //
        if(typeof val == 'undefined' || val == null || val == ""){
            return null;
        }
    }
    if(await isValidTime(val) == false){
        return `${valName}(time): incorrect time format (hh:mm:ss)`
    }

    return null;
}


// validate function for integer //
export const Integer = async (
    validateObj:any = {
        value: Object,
        allowNull: Boolean,
        min: Number,
        max: Number
    })=> { 

    const valName = validateObj.value[0]
    const val = validateObj.value[1]
    const allowNull = validateObj.allowNull
    const min = validateObj.min
    const max = validateObj.max

    if(allowNull == false){
        // not allow null //
        if(typeof val == 'undefined' || val == null || val == ""){
            return `${valName}(int): is required`
        }
    }else{
        // allow null => skip check below code //
        if(typeof val == 'undefined' || val == null || val == ""){
            return null;
        }
    }

    if(isNaN(val) == true){
        return `${valName}(int): invalid value type`
    }else{
        if(val % 1 != 0){
            return `${valName}(int): cannot be float`
        }
    }
    if(isNaN(min) == false && min > 0){
        if(val < min){
            return `${valName}(int): invalid value range (input: ${val} | min: ${min})`
        }
    }
    if(isNaN(max) == false && max > 0){
        if(val > max){
            return `${valName}(int): invalid value range (input: ${val} | max: ${max})`
        }
    }
   
    return null;
}


// validate function for double //
export const Double = async (
    validateObj:any = {
        value: Object,
        allowNull: Boolean,
        min: Number,
        max: Number
    })=> { 

    const valName = validateObj.value[0]
    const val = validateObj.value[1]
    const allowNull = validateObj.allowNull
    const min = validateObj.min
    const max = validateObj.max

    if(allowNull == false){
        // not allow null //
        if(typeof val == 'undefined' || val == null || val == ""){
            return `${valName}(double): is required`
        }
    }else{
        // allow null => skip check below code //
        if(typeof val == 'undefined' || val == null || val == ""){
            return null;
        }
    }

    if(isNaN(val) == true){
        return `${valName}(double): invalid value type`
    }else{
        // if(val % 1 == 0){
        //     return `${valName}(double): cannot be int`
        // }
    }
    if(isNaN(min) == false && min > 0){
        if(val < min){
            return `${valName}(double): invalid value range (input: ${val} | min: ${min})`
        }
    }
    if(isNaN(max) == false && max > 0){
        if(val > max){
            return `${valName}(double): invalid value range (input: ${val} | max: ${max})`
        }
    }
   
    return null;
}


// validate function for enum //
export const Enum = async ( validateObj:any = {
    value: Object,
    allowNull: Boolean,
    enumObject: Object
})=> { 

    const valName = validateObj.value[0]
    const val = validateObj.value[1]
    const allowNull = validateObj.allowNull
    const enumObjectList = validateObj.enumObject

    if(allowNull == false){
        // not allow null //
        if(typeof val == 'undefined' || val == null || val == ""){
            return `${valName}(enum): is required`
        }
    }else{
        // allow null => skip check below code //
        if(typeof val == 'undefined' || val == null || val == ""){
            return null;
        }
    }

    if(enumObjectList.hasOwnProperty(val)){
        return null;
    }else{
        return `${valName}(enum): invalid enum value (available: ${Object.keys(enumObjectList)})`
    }

    return null;
}


const isValidDateTime = async(dateString:any) => {
    const regex = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]/;
    if(!dateString.match(regex)){
        return false
    }else{
        return true
    }
}

const isValidDate = async(dateString:any) => {
    const regex = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/;
    if(!dateString.match(regex)){
        return false
    }else{
        return true
    }
}

const isValidTime = async(timeString:any) => {
    const regex = /(2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]/;
    if(!timeString.match(regex)){
        return false
    }else{
        return true
    }
}