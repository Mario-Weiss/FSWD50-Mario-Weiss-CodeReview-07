import { Injectable } from '@angular/core';
import { FormControl , FormGroup, Validators } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";

@Injectable({
  providedIn: 'root'
})
export class MyPhoneBookService {

  constructor(private firebase: AngularFireDatabase) { }
  	phoneBookList: AngularFireList<any>;

  form = new FormGroup({
  	$key:new FormControl(null),
  	firstName:new FormControl('', Validators.required),
  	lastName:new FormControl('', Validators.required),
  	phoneNumber:new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  getPhoneBook() {
  	this.phoneBookList = this.firebase.list('phonebook');
  	return this.phoneBookList.snapshotChanges();
  }

  insertPhoneBook(phonebook) {
  	this.phoneBookList.push({
  		firstName: phonebook.firstName,
  		lastName: phonebook.lastName,
  		phoneNumber: phonebook.phoneNumber,
  	});
  }

  populateForm(phonebook) {
    this.form.setValue(phonebook);
  }

  updatePhoneBook(phonebook) {
    this.phoneBookList.update(phonebook.$key,{
      firstName: phonebook.firstName,
      lastName: phonebook.lastName,
      phoneNumber: phonebook.phoneNumber
    });
  }

  deleteEntry($key: string){
    this.phoneBookList.remove($key);
  }
}
