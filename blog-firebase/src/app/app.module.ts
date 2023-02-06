import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './screens/login/login.component';
import { BlogsComponent } from './screens/blogs/blogs.component';
import { PostComponent } from './components/post/post.component';
import { UsersidebarComponent } from './components/usersidebar/usersidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { BlogEditorComponent } from './components/blog-editor/blog-editor.component';
import { EditorComponent } from './screens/editor/editor.component';
import { UserComponent } from './screens/user/user.component';
import { ReadBlogComponent } from './screens/read-blog/read-blog.component';
import { SignupComponent } from './screens/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BlogsComponent,
    PostComponent,
    UsersidebarComponent,
    NavbarComponent,
    BlogEditorComponent,
    EditorComponent,
    UserComponent,
    ReadBlogComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }