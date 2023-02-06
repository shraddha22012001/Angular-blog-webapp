import { Component, OnInit,Input } from '@angular/core';
import {UserService} from '../../services/user.service'

@Component({
  selector: 'app-usersidebar',
  templateUrl: './usersidebar.component.html',
  styleUrls: ['./usersidebar.component.css','../../app.component.css']
})
export class UsersidebarComponent implements OnInit {

  constructor(private user:UserService) { }

  @Input() display:boolean=false

  public username:String=""

  ngOnInit(): void {
    this.username = this.user.getCurrentUserData().username
    // console.log(this.user.getCurrentUserData())
  }

}
