const Task = require('./task');


class Tasks{
    _list = {};


    get listArr(){
        const list = [];


        Object.keys(this._list).forEach( key => {
                const task = this._list[key];
                list.push(task);
        } );

        return list;
    }



    constructor( ){
        this._list={};
    }

    createTask( desc = ''){
        const task = new Task(desc);
        this._list[task.id] = task;
    }

    loadTaskFromArr(tasks = []){
        tasks.forEach( task => this._list[tasks.id] = task);
    }

    listPretty(){
        
        this.listArr.forEach(({desc, completeDate}, index) => {
            const completeNumber = `${index + 1}`.green;
            const pendingNumber = `${index + 1}`.red;
            const task = completeDate ? `${completeNumber}. ${desc} :: ${'Complete'.green}` : `${pendingNumber}. ${desc} :: ${'Pending'.red}`

            console.log(task);
            
        });
    }

    listStatusPretty(completed){
        
        this.listArr.forEach(({desc, completeDate}, index) => {
            const completeNumber = `${index + 1}`.green;
            const pendingNumber = `${index + 1}`.red;

            if (completeDate && completed) {
                console.log(`${completeNumber}. ${desc} :: ${'Complete'.green}`)
            }
             if (!completeDate && !completed) {
                console.log(`${pendingNumber}. ${desc} :: ${'Pending'.red}`);
            }
            
        });
    }

    deleteTask(id=''){
        console.log(id);
        console.log(this._list[id]);
        if (this._list[id]) {
            delete this._list[id];
        }
    }

    toggleCompleted (ids = []) {
        ids.forEach(id => {
            const task = this._list[id];
            if (!task.completeDate) {
                task.completeDate = new Date().toISOString()
            }
        });
    
        this.listArr.forEach(task => {
            if (!ids.includes(task.id)) {
                this.listArr[task.id].completeDate = null;
                
            }
        });
    
    
    }
}

module.exports = Tasks;