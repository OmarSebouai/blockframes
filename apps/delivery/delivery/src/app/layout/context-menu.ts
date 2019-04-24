export const CONTEXT_MENU = [
  {
    route: 'default',
    items: [
      { name: 'home', path: '/layout/home' },
      { name: 'templates', path: '/layout/template' },
    ]
  },
  {
    route: '/layout/home/form/:movieId',
    items: [
      { name: 'home', path: '/layout/home', exact:true },
      { name: 'edit film', path: '/layout/home/form/:movieId', exact:true },
      { name: 'teamwork', path: '/layout/home/form/:movieId/teamwork', exact:true },
    ]
  },
  {
    route: '/layout/:movieId',
    items: [
      { name: 'home', path: '/layout/home'},
      { name: 'templates', path: '/layout/template/list'},
      { name: 'deliveries', path: '/layout/:movieId/list'},
      { name: 'movie materials', path: '/layout/:movieId/movie-materials'},
    ]
  },
  {
    // TODO: Resolve bug on movie materials tab
    route: '/layout/:movieId/movie-materials',
    items: [
      { name: 'home', path: '/layout/home'},
      { name: 'templates', path: '/layout/template/list'},
      { name: 'deliveries', path: '/layout/:movieId/list'},
      { name: 'movie materials', path: '/layout/:movieId/movie-materials'},
    ]
  },
  {
    route: '/layout/:movieId/view/:deliveryId',
    items: [
      { name: 'home', path: '/layout/home'},
      { name: 'templates', path: '/layout/template/list'},
      { name: 'deliveries', path: '/layout/:movieId/list'},
      { name: 'movie materials', path: '/layout/:movieId/movie-materials'},
      { name: 'delivery', path: '/layout/:movieId/view/:deliveryId'}
    ]
  },
  {
    route: '/layout/:movieId/form/:deliveryId',
    items: [
      { name: 'home', path: '/layout/home'},
      { name: 'templates', path: '/layout/template/list'},
      { name: 'deliveries', path: '/layout/:movieId/list'},
      { name: 'movie materials', path: '/layout/:movieId/movie-materials'},
      { name: 'delivery', path: '/layout/:movieId/form/:deliveryId'},
      { name: 'settings', path: '/layout/:movieId/form/:deliveryId/settings'}
    ]
  },
  {
    route: '/layout/template/list',
    items: [
      { name: 'home', path: '/layout/home'},
      { name: 'templates', path: '/layout/template/list'},
    ]
  },
  {
    route: '/layout/template/:templateId',
    items: [
      { name: 'home', path: '/layout/home'},
      { name: 'templates', path: '/layout/template/list'},
      { name: 'edit', path: '/layout/template/:templateId'}
    ]
  },
];
