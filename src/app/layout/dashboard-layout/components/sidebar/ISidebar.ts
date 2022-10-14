export interface INavigationMenu {
  url: string;
  exact: boolean;
  queryParams: {
    [key: string]: string | number;
  };
  icon: string;
  title: string;
}
