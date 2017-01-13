export const flatten = (a,b) => a.concat(b || []);
export const pushIf = (arr, condition, value) => { if(condition) arr.push(value); return arr }
export class ExtendedArray extends Array
{
    constructor(arrayLength) {
        super(arrayLength);
        this.test = () => alert('inner test');
        this.flattened = () => this.reduce(flatten);
        this.pushIf = (condition, value) => pushIf(this, condition, value);
    }
    //test() { alert('test'); }
    //flattened() { return this.reduce(flatten) }
    //pushIf(condition, value) { return pushIf(this, condition, value); }
}
module.exports = {
    flatten,
    pushIf,
    ExtendedArray
};
