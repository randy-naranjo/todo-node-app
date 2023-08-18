require("colors");

const {
  inquirerMenu,
  pause,
  readInput,
  deleteTasksSelection,
  confirm,
  completeTasksSelection,
} = require("./helpers/inquirer");
const { saveDB, leerDB } = require("./helpers/db");

const Tareas = require("./models/tareas");

console.clear();

const main = async () => {
  let opt = "";
  const tareas = new Tareas();

  const tareasDB = leerDB();

  if (tareasDB) {
    tareas.cargarTareasFromArray(tareasDB);
  }

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        const desc = await readInput("Descripción de la tarea: ");
        tareas.crearTarea(desc);
        break;
      case "2":
        tareas.listadoCompleto();
        break;
      case "3":
        tareas.filtrarTareas(true);
        break;
      case "4":
        tareas.filtrarTareas(false);
        break;
      case '5':
        const ids = await completeTasksSelection(tareas.listadoArr)

        if(ids.length > 0) {
          tareas.toggleTaskStatus(ids)
        }

      break;
      case "6":
        const tareaId = await deleteTasksSelection(tareas.listadoArr);
        if (tareaId === "0" || !tareaId) {
          break;
        }
        const ok = await confirm("¿Esta seguro de borrar esta tarea?");
        if (tareaId && ok) {
          tareas.borrarTarea(tareaId);
          console.log("Tarea borrada");
        }
      break;
    }

    saveDB(tareas.listadoArr);

    if (opt !== "0") await pause();
  } while (opt !== "0");
};

main();
