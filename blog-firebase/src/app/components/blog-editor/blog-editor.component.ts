import { Component, OnInit } from '@angular/core';
import {FormBuilder,Validators} from '@angular/forms'
import {UserService} from '../../services/user.service'
import {BlogsServiceService} from '../../services/blogs-service.service'
import {Blog} from '../../shared/Blogs'

@Component({
  selector: 'app-blog-editor',
  templateUrl: './blog-editor.component.html',
  styleUrls: ['./blog-editor.component.css']
})
export class BlogEditorComponent implements OnInit {

  constructor(private fb:FormBuilder,private user:UserService,private blog:BlogsServiceService) { }

  public newblog=this.fb.group({
    title:['',Validators.required],
    content:['',Validators.required]
  })

  ngOnInit(): void {
  }

  handlePublish(){
    let newblogObject:Blog={
      title:"",
      author:"",
      content:""
    }
    newblogObject.title=this.newblog.value.title
    newblogObject.content=this.newblog.value.content
    newblogObject.author=this.user.getCurrentUserData().username

    this.blog.addNewBlog(newblogObject)
  }

}
