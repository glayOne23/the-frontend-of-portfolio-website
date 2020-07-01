export default class Error {

    constructor() {
        this.salah = {}
    }
    
    get(field) {
        if (this.salah[field]) {
            return this.salah[field][0];
        }
    }
    
    record(salah) {
        this.salah = salah;
    }
    
    clear(field) {
        delete this.salah[field];
    }
    
    has(field) {
        if (field in this.salah) {
          return true
        }
    }
    
    anyError() {
        return Object.keys(this.salah).length > 0
    }
}