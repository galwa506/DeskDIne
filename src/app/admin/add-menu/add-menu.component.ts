import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { MenuService } from 'src/app/services/menu.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MenuInput } from 'src/app/misc/menu.constant';
import { Menu } from './model/menu.model';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css'],
})
export class AddMenuComponent implements OnInit {
  menuForm!: FormGroup;
  value = 'Clear me';
  path!: File;
  menuInput = MenuInput;
  constructor(
    private db: AngularFireDatabase,
    private menuService: MenuService,
    private fireStorage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    this.menuForm = new FormGroup({
      itemName: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      image: new FormControl(null, Validators.required),
    });
  }

  async onAddItem() {
    const menuItem = {
      itemName: this.menuForm.get('itemName')?.value,
      price: this.menuForm.get('price')?.value,
      image: await this.imageURl(),
    };
    this.menuService.addItem(menuItem).subscribe();
  }

  handleImageChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement?.files && inputElement.files.length > 0) {
      this.path = inputElement.files[0];
    }
  }
  async imageURl() {
    const filepath = `/item-name/${this.path.name}`;
    await this.fireStorage.upload(filepath, this.path);
    const url = this.fireStorage.ref(filepath).getDownloadURL();
    return url.toPromise();
  }

  onClearInput(event: Event, controlName: string) {
    // Prevent the click event from bubbling up to the form and triggering ngSubmit
    event.preventDefault();
    this.menuForm.get(controlName)?.setValue(null);
  }
}
