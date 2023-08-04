export const MenuInput = [
  {
    label: 'Item Name',
    formControlName: 'itemName',
    type: 'text',
    onclick: `onClearInput($event, 'itemName')`,
  },
  {
    label: 'Price(in Nu)',
    formControlName: 'price',
    type: 'number',
    onclick: `onClearInput($event, 'price')`,
  },
];
