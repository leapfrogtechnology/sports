import * as ROUTES from '@/constants/routes';

interface SideBarMenu {
  name: string;
  route: string;
  order: number;
  icon: string;
}

const sideBarMenus: SideBarMenu[] = [
  {
    name: 'Tournaments',
    route: ROUTES.TOURNAMENTS,
    icon: 'trophy',
    order: 1
  },
  {
    name: 'Employees',
    route: ROUTES.EMPLOYEES,
    order: 2,
    icon: 'team'
  },
  {
    name: 'Rounds',
    route: ROUTES.ROUNDS,
    order: 3,
    icon: 'table'
  },
  {
    name: 'Games',
    route: ROUTES.GAMES,
    order: 4,
    icon: 'global'
  },
  {
    name: 'Categories',
    route: ROUTES.CATEGORIES,
    order: 5,
    icon: 'table'
  },
  {
    name: 'Statuses',
    route: ROUTES.STATUSES,
    order: 6,
    icon: 'check-circle'
  }
];

export default sideBarMenus;
