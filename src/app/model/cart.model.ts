import { Menu } from './menu.model';

export interface CartItem extends Menu {
  quantity: number;
  total: number;
}
