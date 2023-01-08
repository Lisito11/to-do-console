const { v4:uudiv4 } = require('uuid')
class Task{
    id='';
    desc='';
    completeDate = null;

    constructor( desc ){
        this.id = uudiv4();
        this.desc = desc;
        this.completeDate = null;
    }
}

module.exports = Task;