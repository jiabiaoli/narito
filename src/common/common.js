Date.prototype.addDays = (count) => {
    let time = this.setDate(this.getDate()+count);
    return new Date(time);
}