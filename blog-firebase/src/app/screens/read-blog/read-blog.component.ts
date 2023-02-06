import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';  
import { Blog } from 'src/app/shared/Blogs';
import {AngularFirestore} from '@angular/fire/compat/firestore'

@Component({
  selector: 'app-read-blog',
  templateUrl: './read-blog.component.html',
  styleUrls: ['./read-blog.component.css','../../app.component.css']
})
export class ReadBlogComponent implements OnInit {

  public blogId=""
  public blog:Blog={
    author:"",
    title:"",
    content:"",
  }

  constructor(private route:ActivatedRoute,private afs:AngularFirestore) {
    
  }

  ngOnInit(): void {
    this.readBlog()
  }

  readBlog(){
    this.blogId = this.route.snapshot.params["id"]
    console.log(this.blogId)
    this.afs.collection('blogs').doc(this.blogId).ref.get()
    .then((doc:any)=>{
      if(doc.exists){
        let blogData = doc.data()
        console.log(blogData)
        this.blog.author=blogData.author
        this.blog.content=blogData.content
        this.blog.title=blogData.title
      }
    })
  }

}