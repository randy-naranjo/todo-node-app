const Tarea = require("./tarea");

/**
 *  _listado: {
 *    'uuid' : Tarea
 * }
 */

class Tareas {
  _listado = {};

  get listadoArr() {
    const listado = [];

    Object.keys(this._listado).forEach((key) => {
      listado.push(this._listado[key]);
    });

    return listado;
  }

  constructor() {
    this._listado = {};
  }

  cargarTareasFromArray(tareasDB = []) {
    tareasDB.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  crearTarea(desc) {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  listadoCompleto() {
    console.log();

    if(this.listadoArr.length === 0) {
      console.log('No hay tareas creadas')
      return
    }

    this.listadoArr.forEach(({ desc, completadoEn }, i) => {
      const idx = `${i + 1}.`.green;
      const status = completadoEn ? "Completada".green : "Pendiente".red;

      console.log(`${idx} ${desc} :: ${status}`);
    });
  }

  filtrarTareas(completadas = true) {
    console.log();


    this.listadoArr.filter(({completadoEn}) =>
      completadas 
          ? !!completadoEn 
          : !completadoEn
    ).forEach(({desc, completadoEn}, index) => {

      
      const status = completadoEn ? `${completadoEn}`.green : 'Pendiente'.red
      
      console.log(`${`${(index + 1)}.`.green} ${desc} :: ${status}`)
    });
  }

  borrarTarea(id) {
    delete this._listado[id]
  }

  toggleTaskStatus(ids = []) {
    
    ids.forEach(id => {

      const tarea = this._listado[id]
      if(!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString()
      }

    })

    this.listadoArr.forEach( ({id}) => {
      if(!ids.includes(id)) {
        this._listado[id].completadoEn = null
      }
    })

  }
}

module.exports = Tareas;
