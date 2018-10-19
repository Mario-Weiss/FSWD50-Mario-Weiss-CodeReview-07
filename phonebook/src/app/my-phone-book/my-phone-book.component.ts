import { Component, OnInit } from '@angular/core';
import { MyPhoneBookService } from '../shared/my-phone-book.service';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';

@Component({
  selector: 'app-my-phone-book',
  templateUrl: './my-phone-book.component.html',
  styleUrls: ['./my-phone-book.component.sass'],
  animations: [
    trigger('listStagger', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(-15px)' }),
            stagger(
              '50ms',
              animate(
                '750ms ease-out',
                style({ opacity: 1, transform: 'translateY(0px)' })
              )
            )
          ],
          { optional: true }
        ),
        query(':leave', animate('500ms', style({ opacity: 0 })), {
          optional: true
        })
      ])
    ])
  ]
})
export class MyPhoneBookComponent implements OnInit {

  phoneBookArray = [];

  constructor(private phoneBookService: MyPhoneBookService) { }
  submitted: boolean;
  formControls = this.phoneBookService.form.controls;
  showSuccessMessage: boolean;
  showUpdateMessage: boolean;
  showDeletedMessage : boolean;
  searchText:string = "";
  filter:boolean = false;

  ngOnInit() {
  	this.phoneBookService.getPhoneBook().subscribe(
      (list) => {
        this.phoneBookArray = list.map( (item) => {
          return {
            $key: item.key,
            ...item.payload.val()
          }
        })
      }
      );
  }

  onSubmit() {
  	this.submitted = true;
  	if (this.phoneBookService.form.valid) {
  		if (this.phoneBookService.form.get("$key").value == null){
  			this.phoneBookService.insertPhoneBook(this.phoneBookService.form.value);
  			this.showSuccessMessage = true;
  			setTimeout(()=>this.showSuccessMessage=false,3000);
  			this.submitted = false;
  			this.phoneBookService.form.reset()
  		} else {
  			this.phoneBookService.updatePhoneBook(this.phoneBookService.form.value);
        this.showUpdateMessage = true;
        setTimeout(()=>this.showUpdateMessage=false,3000);
        this.submitted = false;
        this.phoneBookService.form.reset()
  		}
  	}
  }

  onDelete($key){
     if(confirm("Are you sure you want to delete this record?")){
       this.phoneBookService.deleteEntry($key);
       this.showDeletedMessage = true;
       setTimeout(()=> this.showDeletedMessage=false , 3000);
       }
   }

  filterCondition(phonebook) {
    if (this.filter == true){
      return phonebook.firstName.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1||phonebook.lastName.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1 ; 
    }
    return phonebook;
  }

  toggleFilter() {
    if (this.filter == false){
      this.filter = true;
      document.getElementById("filter").classList.add("btn-success");
      document.getElementById("filter").classList.remove("btn-dark");
      document.getElementById("filter").innerHTML="Filter on"
    } else {
      this.filter = false;
      document.getElementById("filter").classList.remove("btn-success");
      document.getElementById("filter").classList.add("btn-dark");
      document.getElementById("filter").innerHTML="Filter off"
    }
  }

}
