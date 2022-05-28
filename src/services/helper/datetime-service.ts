import moment from "moment"
moment.locale('th')

export const toBuddhistYear = (date:Date) => {
    if(date instanceof Date){
        const momentObject = moment(date)
        const format = "DD/MM/YY";
        var christianYear = momentObject.format('YYYY')
        var buddhishYear = (parseInt(christianYear) + 543).toString()
        return momentObject
        .format(format.replace('YYYY', buddhishYear).replace('YY', buddhishYear.substring(2, 4)))
        .replace(christianYear, buddhishYear)
    }else{
        return null
    }
    
}

export const isDateTimeAlreadyPast = (inputDateTime: any) => {
    if(inputDateTime == null){
        return false;
    }
    let diff = new Date().getTime() - inputDateTime.getTime();
    if (diff > 0) {
        return true;
    }else{
        return false;
    }
}

export const getDateTimeDiffInMinutes = (start: any, end: any) => {
    let startDateTime = new Date(start);
    let stopDateTime = new Date(end);
    let timeDiff = (stopDateTime.getTime() - startDateTime.getTime()) / 1000;
    timeDiff /= 60;
    return Math.abs(Math.round(timeDiff));
}

export const getDateTimeDiffInSeconds = (start: any, end: any) => {
    let startDateTime = new Date(start);
    let stopDateTime = new Date(end);
    let timeDiff = (stopDateTime.getTime() - startDateTime.getTime()) / 1000;
    return Math.abs(Math.round(timeDiff));
}


export const isDateTimeOverlap = async (startA: any, endA: any, startB: any, endB: any) => {
    if((new Date(startA) <= new Date(endB)) && (new Date(endA) >= new Date(startB))){
        return true;
    }else{
        return false;
    } 
}

export const formatTimeStampToDateTime = async (timestamp: any) => {
    // let d = new Date(timestamp),
    //     dformat = [d.getMonth()+1,
    //        d.getDate(),
    //        d.getFullYear()].join('/')+' '+
    //       [d.getHours(),
    //        d.getMinutes(),
    //        d.getSeconds()].join(':');
    // return dformat;
    let d = new Date(timestamp);
    return  d.toLocaleString('en-US',{
                hour12: false
            });
}


export const dayOfWeekInThai = async (dayOfWeekEnum: any): Promise<String> => {
    if(dayOfWeekEnum == 'MONDAY'){
        return "จันทร์";
    }else if(dayOfWeekEnum == 'TUESDAY'){
        return "อังคาร";
    }else if(dayOfWeekEnum == 'WEDNESDAY'){
        return "พุธ";
    }else if(dayOfWeekEnum == 'THURSDAY'){
        return "พฤหัสบดี";
    }else if(dayOfWeekEnum == 'FRIDAY'){
        return "ศุกร์";
    }else if(dayOfWeekEnum == 'SATURDAY'){
        return "เสาร์";
    }else if(dayOfWeekEnum == 'SUNDAY'){
        return "อาทิตย์";
    }else{
        return "";
    }
}

export const getDateTimeWithTZ = async (datetime: any) => {
    let date = new Date(datetime)
    let userTimezoneOffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - userTimezoneOffset)
}


export const getLoggerTimestamp = async (seconds = 0) => {
    let tzOffset = (new Date()).getTimezoneOffset() * 60000;
    let currentTime = (new Date(Date.now() - tzOffset))
    currentTime.setSeconds(currentTime.getSeconds() + seconds);
    let date = currentTime.toISOString().split('T')[0]
    let time = currentTime.toISOString().split('T')[1]
    return `${date} ${time}`;
}

export const getCurrentDateTimeIncrementSeconds = async (seconds = 0) => {
    let tzOffset = (new Date()).getTimezoneOffset() * 60000;
    let currentTime = (new Date(Date.now() - tzOffset))
    currentTime.setSeconds(currentTime.getSeconds() + seconds);
    let date = currentTime.toISOString().split('T')[0]
    let time = currentTime.toISOString().split('T')[1].split('.')[0]
    return `${date} ${time}`;
}

export const getUploadFileTimestamp = async () => {
    let tzOffset = (new Date()).getTimezoneOffset() * 60000;
    let currentTime = (new Date(Date.now() - tzOffset))
    currentTime.setSeconds(currentTime.getSeconds());
    let date = currentTime.toISOString().split('T')[0].replace(/-/g,"")
    let time = currentTime.toISOString().split('T')[1].split('.')[0].replace(/:/g,"")
    return `${date}_${time}`;
}

export const getDateTimeIncrementSeconds = async (datetime: any, seconds = 0) => {
    let tzOffset = (new Date()).getTimezoneOffset() * 60000;
    let currentTime = (new Date(datetime - tzOffset))
    currentTime.setSeconds(currentTime.getSeconds() + seconds);
    let date = currentTime.toISOString().split('T')[0]
    let time = currentTime.toISOString().split('T')[1].split('.')[0]
    return `${date} ${time}`;
}

export const getCurrentDateTimeIncrementMinutes = async (minutes = 0) => {
    let tzOffset = (new Date()).getTimezoneOffset() * 60000;
    let currentTime = (new Date(Date.now() - tzOffset))
    currentTime.setMinutes(currentTime.getMinutes() + minutes);
    let date = currentTime.toISOString().split('T')[0]
    let time = currentTime.toISOString().split('T')[1].split('.')[0]
    return `${date} ${time}`;
}

export const getCurrentDateTimeIncrementHours = async (hours = 0) => {
    let tzOffset = (new Date()).getTimezoneOffset() * 60000;
    let currentTime = (new Date(Date.now() - tzOffset))
    currentTime.setHours(currentTime.getHours() + hours);
    let date = currentTime.toISOString().split('T')[0]
    let time = currentTime.toISOString().split('T')[1].split('.')[0]
    return `${date} ${time}`;
}