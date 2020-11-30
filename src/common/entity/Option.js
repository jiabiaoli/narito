export default class Option {
    constructor() {
        this.active = true;
    }

    static create(){
        let option=new Option();
        return option;
    }
}