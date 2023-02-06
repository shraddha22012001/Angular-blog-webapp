import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './screens/signup/signup.component';
import {LoginComponent} from './screens/login/login.component'
import {BlogsComponent} from './screens/blogs/blogs.component'
import { EditorComponent } from './screens/editor/editor.component';
import {UserComponent} from './screens/user/user.component'
import {ReadBlogComponent} from './screens/read-blog/read-blog.component'
const routes: Routes = [
  {path:"",component:LoginComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:SignupComponent},
  {path:"blogs",component:BlogsComponent},
  {path:"compose",component:EditorComponent},
  {path:"user/:username",component:UserComponent},
  {path:"blog/:id",component:ReadBlogComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }