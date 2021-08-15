import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IFlash } from './flash.model';
import {NgForm} from '@angular/forms';
import { FlashService } from './flash.service';
import { Observable, Subscription } from 'rxjs';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  @ViewChild('flashForm', {static: true}) flashForm!: NgForm;

  title = 'ng-flashcards';
  flash : IFlash = {
    id: -1,
    question: '',
    answer: '',
    show: false
  };
  editing = false;
  editingId: number | undefined;
  flashs$!: Observable<IFlash[]>

  constructor(private flashService: FlashService) {
  }

  ngOnInit() {
    this.flashs$ = this.flashService.flashs$
  }


  trackByFlashId(index: number, flash: IFlash):number {
    return flash.id
  }

  handleToggleCard(id: number) {
   this.flashService.toggleFlash(id)
}

handleDelete(id: number) {
 this.flashService.deleteFlash(id)
 }

 handleEdit(id: number) {
    this.flash = this.flashService.getFlash(id);
 this.editing = true;
 this.editingId = id;
 }

 handleRememberedChange({id, flag}: {id: number, flag: 'correct' | 'incorrect'}) {
  this.flashService.changeRemembered({id, flag})
 }

 handleSubmit(){
   this.flashService.addFlash(this.flash)
   this.handleClear()
 }

 handleClear() {
   this.flash = {
     id: -1,
     question: '',
     answer: '',
     show: false
   }
   this.flashForm.reset()
 }

 handleUpdate () {
   this.flashService.updateFlash(this.editingId!, this.flash)
   this.handleCancel()
 }

 handleCancel() {
   this.editing = false
   this.editingId = undefined
   this.handleClear()
 }

}
