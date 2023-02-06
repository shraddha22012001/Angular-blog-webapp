import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css','../../app.component.css']
})
export class NavbarComponent implements OnInit {

  public render = false
  public curruser:any = {}
  public show = false

  constructor(private user:UserService) { 
    this.curruser = this.user.getCurrentUserData()
    if(this.curruser!==null){
      this.render=true
    }else{
      this.render==false
    }
  }
  
  ngOnInit(): void {
  }

  toggleShow(){
    this.show=!this.show
  }

  signout(){
    this.user.signout()
    window.sessionStorage.clear()
    window.location.href=""
  }


}
