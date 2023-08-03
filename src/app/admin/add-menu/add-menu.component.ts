import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { MenuService } from 'src/app/services/menu.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css'],
})
export class AddMenuComponent implements OnInit {
  menuForm!: FormGroup;
  value = 'Clear me';
  constructor(
    private db: AngularFireDatabase,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    this.menuForm = new FormGroup({
      itemName: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      image: new FormControl(null, Validators.required),
    });
  }
  onAddItem() {
    const menuItem = {
      itemName: this.menuForm.get('itemName')?.value,
      price: this.menuForm.get('price')?.value,
      image: this.menuForm.get('image')?.value,
    };
    this.menuService.addItem(menuItem).subscribe();
  }

  onClearInput(event: Event, controlName: string) {
    // Prevent the click event from bubbling up to the form and triggering ngSubmit
    event.preventDefault();
    this.menuForm.get(controlName)?.setValue(null);
  }

  // handleImageChange(event: Event) {
  //   const inputElement = event.target as HTMLInputElement;
  //   if (inputElement.files && inputElement.files[0]) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.menuForm.get('image')?.setValue(reader.result);
  //     };
  //     reader.readAsDataURL(inputElement.files[0]);
  //   }
  // }
}
