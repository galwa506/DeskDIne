import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { MenuService } from 'src/app/services/menu.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css'],
})
export class AddMenuComponent implements OnInit {
  menuForm!: FormGroup;
  value = 'Clear me';
  path!: File;
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

  onAddItem() {
    const menuItem = {
      itemName: this.menuForm.get('itemName')?.value,
      price: this.menuForm.get('price')?.value,
      image: this.imageURl(),
    };
    this.menuService.addItem(menuItem).subscribe();
  }

  handleImageChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement?.files && inputElement.files.length > 0) {
      this.path = inputElement.files[0];
    }
  }

  imageURl() {
    const filepath = `/item-name/${this.path.name}`;
    this.fireStorage.upload(filepath, this.path);
    const url = this.fireStorage.ref(filepath).getDownloadURL().toPromise();
    return url;
  }

  onClearInput(event: Event, controlName: string) {
    event.preventDefault();
    this.menuForm.get(controlName)?.setValue(null);
  }
}
