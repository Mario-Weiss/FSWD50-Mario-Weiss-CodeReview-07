import { Component, OnInit } from '@angular/core';
import { MyPhoneBookService } from '../shared/my-phone-book.service';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';

@Component({
  selector: 'app-important-numbers',
  templateUrl: './important-numbers.component.html',
  styleUrls: ['./important-numbers.component.sass'],
  animations: [
    trigger('listStagger', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(-50px)' }),
            stagger(
              '100ms',
              animate(
                '750ms ease-out',
              style({ opacity: 1, transform: 'translateY(0px)' })
              )
            )
          ],
          { optional: true }
        ),
      ])
    ])
  ]
})
export class ImportantNumbersComponent implements OnInit {

  constructor(private phoneBookService: MyPhoneBookService) { }
  phoneBookArray = [];
  formControls = this.phoneBookService.formtest.controls;
  submitted: boolean;

  ngOnInit() {
  	this.phoneBookService.getImportantPhoneBook().subscribe(
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
  	if (this.phoneBookService.formtest.valid) {
  		if (this.phoneBookService.formtest.get("$key").value == null){
  			console.log(this.phoneBookService.formtest.value);
  			this.phoneBookService.insertImportantPhoneBook(this.phoneBookService.formtest.value);
  			this.submitted = false;
  			this.phoneBookService.formtest.reset();
  		} 
  	} 
  }

}
