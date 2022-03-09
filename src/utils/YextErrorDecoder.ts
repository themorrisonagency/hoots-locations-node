type YextErrorType = {
    data: {
        meta: {
            errors: string[]
        }
    }
}
export default function YextErrorDecoder(yextError: YextErrorType){
    const errArr = yextError.meta.errors
    const result = ""
    if (errArr.length > 0){
        errArr.map(err => result += `${errArr.message}<br>`)
    } else {
        result = errArr[0].message
    }
    return result

}