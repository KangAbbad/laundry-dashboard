import { IsActiveMatchOptions } from '@angular/router';

export const defaultRouterLinkActiveOptions: IsActiveMatchOptions = {
  queryParams: 'ignored',
  matrixParams: 'exact',
  paths: 'exact',
  fragment: 'exact',
};

export interface INavigationMenu {
  url: string;
  routerLinkActiveOptions:
    | {
        exact: boolean;
      }
    | IsActiveMatchOptions;
  queryParams: {
    [key: string]: string | number;
  };
  icon: string;
  title: string;
}
