const getMenuFrontEnd = (rol = "USER_ROLE") => {
  const menu = [
    {
      title: 'Dashboard',
      icono: 'mdi mdi-gauge',
      submenu: [
        { title: 'main', url: '/' },
        { title: 'Grafica Inicial', url: 'grafica1' },
        { title: 'Rxjs', url: 'rxjs' },
        { title: 'Progress Bar', url: 'progress' },
        { title: 'Promesas', url: 'promesas' },
      ]
    },
    {
      title: 'Mantenimientos',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        // { title: 'Usuarios', url: 'usuarios' }, // Opcion para los administradores
        { title: 'Hospitales', url: 'hospitales' },
        { title: 'Medicos', url: 'medicos' },
      ]
    }
  ]

  if(rol === 'ADMIN_ROLE'){
    menu[1].submenu.unshift({ title: 'Usuarios', url: 'usuarios' })
  }

  return menu
}

module.exports = {
  getMenuFrontEnd
}