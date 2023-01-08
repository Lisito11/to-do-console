require('colors');

const { 
    inquirerMenu, 
    pause, 
    readInput,
    listTaskDelete, 
    confirm,
    showCheckList
} = require('./helpers/inquirer');
const { saveDB, readDB } = require('./helpers/crudFile');
const Tasks = require('./models/tasks');

console.clear();



const main = async () => {
    
    let opt = '';
    const tasks = new Tasks();

    const tasksDB = readDB();

    if (tasksDB) {
        tasks.loadTaskFromArr(tasksDB);
    }


    do {
       opt = await inquirerMenu();
       
       switch (opt) {
        case '1':
            const desc = await readInput('Description: ');
            tasks.createTask(desc);
            break;

        case '2':
            tasks.listPretty();
            break;

        case '3':
            tasks.listStatusPretty(true);
            break;

        case '4':
            tasks.listStatusPretty(false);
            break;

        case '5':
            const ids = await showCheckList(tasks.listArr);
            tasks.toggleCompleted(ids);
            break;

        case '6':
            const id = await listTaskDelete(tasks.listArr);
            if (id !== '0') {
                const ok = confirm('Are you sure?')
                if (ok) {
                    tasks.deleteTask(id);
                }
            }
            break;
       }

       saveDB(tasks.listArr);

       await pause();
    } while (opt !== '0');

}



main();