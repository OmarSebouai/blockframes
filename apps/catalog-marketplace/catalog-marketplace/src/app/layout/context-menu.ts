export const CONTEXT_MENU = [
  {
    route: 'default',
    items: []
  },
  {
    route: '/layout/o/catalog/home',
    items: [
      {
        name: 'home',
        path: '/layout/o/catalog/home'
      },
      {
        name: 'search',
        path: '/layout/o/catalog/search'
      },
      {
        name: 'selection',
        path: '/layout/o/catalog/selection'
      }
    ]
  },
  {
    route: '/layout/o/catalog/search',
    items: [
      {
        name: 'home',
        path: '/layout/o/catalog/home'
      },
      {
        name: 'search',
        path: '/layout/o/catalog/search'
      },
      {
        name: 'selection',
        path: '/layout/o/catalog/selection'
      }
    ]
  },
  {
    route: '/layout/o/catalog/selection',
    items: [
      {
        name: 'home',
        path: '/layout/o/catalog/home'
      },
      {
        name: 'search',
        path: '/layout/o/catalog/search'
      },
      {
        name: 'selection',
        path: '/layout/o/catalog/selection'
      }
    ]
  },
  {
    route: '/layout/o/catalog/:movieId/create',
    items: [
      {
        name: 'view',
        path: '/layout/o/catalog/:movieId/view'
      },
      {
        name: 'create',
        path: '/layout/o/catalog/:movieId/create'
      }
    ]
  }
];
