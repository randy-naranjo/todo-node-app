const inquirer = require("inquirer");
require("colors");

const questions = [
  {
    type: "list",
    name: "option",
    message: "¿Que desea hacer?",
    choices: [
      {
        value: "1",
        name: `${'1.'.green} Crear Tarea`,
      },
      {
        value: "2",
        name: `${'2.'.green} Listar Tareas`,
      },
      {
        value: "3",
        name: `${'3.'.green} Listar Tareas Completadas`,
      },
      {
        value: "4",
        name: `${'4.'.green} Listar Tareas Pendientes`,
      },
      {
        value: "5",
        name: `${'5.'.green} Completar tarea(s)`,
      },
      {
        value: "6",
        name: `${'6.'.green} Borrar Tarea`,
      },
      {
        value: "0",
        name: `${'0.'.green} Salir`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("=========================".green);
  console.log("  Seleccione una opcion".white);
  console.log("=========================\n".green);

  const { option } = await inquirer.prompt(questions);
  return option;
};

const pause = async () => {
  const question = [
    {
      type: "input",
      name: "enter",
      message: `Presione ${"ENTER".green} para continuar`,
    },
  ];

  console.log("\n");
  await inquirer.prompt(question);
};

const readInput = async(message) => {
  const question = [
    {
      type: 'input',
      name: 'input',
      message,
      validate(value) {
        if(value.length === 0) {
          return 'Por favor ingrese un valor';
        }
        return true
      }
    }
  ]

  const { input } = await inquirer.prompt(question)
  return input
}

const deleteTasksSelection = async( tareas = [] ) => {

  if(tareas.length === 0) {
    console.log('No hay tareas creadas')
    return
  }

  const choices = tareas.map(({id, desc}, index) => {
    return {
      value: id,
      name: `${ `${ index + 1 }.`.green } ${desc}`
    }
  })

  choices.unshift({
    value: '0',
    name: '0. Regresar al menu'
  })

  const deleteList = [
    {
      type: 'list',
      name: 'tareaId',
      message: 'Seleccione la tarea que desea borrar',
      choices
    }
  ]

  const {tareaId} = await inquirer.prompt(deleteList)

  return tareaId

}

const completeTasksSelection = async( tareas = [] ) => {

  if(tareas.length === 0) {
    console.log('No hay tareas creadas')
    return
  }

  const choices = tareas.map(({id, desc, completadoEn}, index) => {
    return {
      value: id,
      name: `${ `${ index + 1 }.`.green } ${desc}`,
      checked: !!completadoEn
    }
  })

  const completeList = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Marque las tareas completadas',
      choices
    }
  ]

  const {ids} = await inquirer.prompt(completeList)

  return ids

}

const confirm = async(message) => {
  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message
    },
  ]

  const { ok } = await inquirer.prompt(question)
  return ok
}

module.exports = {
  inquirerMenu,
  pause,
  readInput,
  deleteTasksSelection,
  confirm,
  completeTasksSelection
};
