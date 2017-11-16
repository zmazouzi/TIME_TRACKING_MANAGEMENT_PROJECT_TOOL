// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  views : [
    {
      name: 'Project',
      path: '/Project',
      icon: '',
      allowedUsers: ["societe"]
    },
    {
      name: 'Ressources',
      path: '/Ressource',
      icon: '',
      allowedUsers: ["societe"]
    },
    {
      name: 'Affectation',
      path: '/Affectation',
      icon: '',
      allowedUsers: ["societe"]
    },
    {
      name: 'Dashboard',
      path: '/adminDashBoard',
      icon: '',
      allowedUsers: ["admin"]
    }
  ]
};
