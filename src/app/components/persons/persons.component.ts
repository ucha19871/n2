import {Component, OnInit} from '@angular/core';
import {FirebaseService, Person} from "../../services/firebase.service";
import {AngularFire} from "angularfire2";

@Component({
  selector: 'app-persons',
  template: `
    <div>
    
      <md-card *ngIf="appState == 'default'">
        <button md-raised-button (click)="changeState('add')">Add</button>
        <label for="filt">Filter By:</label>
        <select id="filt" #filter (change)="filterBY($event,filter.value)">
          <option value="" selected>Select A Filter</option>
          <option value="name">Name</option>
          <option value="bio">Bio</option>
        </select>
      </md-card>
      <md-card *ngIf="appState == 'add'">
        <form (submit)="savePerson(name.value,bio.value,img.value)" >
            <table>
              <tr>
                  <td class="title">Name: </td>
                  <td class="text"><md-input #name><md-placeholder><i class="fa fa-user" aria-hidden="true"></i> You Name</md-placeholder></md-input></td>
              </tr>
              <tr>
                  <td class="title">Biography: </td>
                  <td class="text">
                    <textarea #bio placeholder="You Biography" cols="50" rows="5" id="textarea1" class="materialize-textarea"></textarea>
                  </td>
              </tr>
              <tr>
                  <td class="title">Image: </td>
                  <td class="text"><md-input #img ><md-placeholder><i class="fa fa-picture-o" aria-hidden="true"></i> You Picture URL</md-placeholder></md-input></td>
              </tr>
            </table>
            <br>
            <button md-raised-button (click)="changeState('default')">Go Back</button>
            <input md-raised-button color="primary" type="submit" value="Save">
        </form>
      </md-card>
      <md-card *ngIf="appState == 'extend'">
        <table>
          <div *ngFor="let person of persons">
            <div *ngIf="activeKey == person.$key">
              <tr>
                  <td class="title">Name: </td>
                  <td class="text">{{person.name}}</td>
              </tr>
              <tr>
                  <td class="title">Biography: </td>
                  <td class="text">{{person.bio}}</td>
              </tr>
              <tr>
                  <td class="title">Image: </td>
                  <td class="text"><img src="{{person.image}}" alt="" width="50"></td>
              </tr>
            </div>
          </div>
        </table>
        <br>
        <button md-raised-button (click)="changeState('default')">Go Back</button>
      </md-card>
      <md-card>
        <md-list class="app-list">
          <md-list-item class="app-list-item" *ngFor="let person of persons">
            <h4 md-line>{{person.name}}</h4>
            <button md-raised-button (click)="changeState('extend',person.$key)">More</button>
            <button md-raised-button color="primary">Edit</button>
            <button md-raised-button color="warn">Delete</button>
          </md-list-item>
        </md-list>
      </md-card>
    </div>
  `,
  styles: [],
  providers: [FirebaseService]
})
export class PersonsComponent implements OnInit {
  persons: Person[];
  appState: string;
  activeKey: string;
  
  constructor(af: AngularFire, private fs: FirebaseService) {
  }
  
  ngOnInit() {
    this.appState = 'default';
    this.fs.getPersons().subscribe(persons => {
      this.persons = persons
    })
  }
  
  changeState(state, key = null) {
    if (key) {
      this.activeKey = key
    }
    this.appState = state
  }
  
  filterBY($event,filter){
    this.fs.getPersons(filter).subscribe(persons => {
      this.persons = persons;
    })
  }
  
  savePerson(name:string,bio:string,img:string){
    let newPerson = {
      name: name,
      bio: bio,
      img: img
    }

    this.fs.addPerson(newPerson);
    this.changeState('default')
  }
  
}
