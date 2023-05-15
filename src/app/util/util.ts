export class Util {
    static arrayIsNullOrEmpty(array: Array<any>): boolean{
        if (array == null) {
            return true
        }
        if (array.length <= 0) {
            return true
        }
        return false
    }
}