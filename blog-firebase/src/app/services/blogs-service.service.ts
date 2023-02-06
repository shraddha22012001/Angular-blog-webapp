import { Injectable } from '@angular/core';
import { Observable, Subject,switchMap } from 'rxjs';
import {Blog} from '../shared/Blogs'
import { Router } from '@angular/router';
import {AngularFirestore} from '@angular/fire/compat/firestore'
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogsServiceService {

  constructor(private afs:AngularFirestore) { }

  public blogs:any[]=[]

  getBlogs(){
    this.afs.collection("blogs").snapshotChanges().subscribe((data)=>{
      data.map(d=>{
        let blogDoc={
          author:"",
          content:"",
          title:"",
          id:""
        }
        let resDoc:any=d.payload.doc.data()
        blogDoc.author=resDoc.author
        blogDoc.content=resDoc.content
        blogDoc.title=resDoc.title
        blogDoc.id = d.payload.doc.id
        this.blogs.push(blogDoc)
      })
    })
    return this.blogs
  }

  addNewBlog(data:Blog){
    return new Promise<any>((resolve, reject) =>{
      this.afs
          .collection("blogs")
          .add(data)
          .then(res => {
            console.log(res)
            console.log("published blog")
            window.location.href='blog/'+res.id
          }, err => reject(err));
    });
  }

  readBlog(blog_id:string){
    this.afs.collection('blogs').doc(blog_id).ref.get()
    .then((doc:any)=>{
      if(doc.exists){
        let blogData = doc.data()
        // console.log(blogData)
        return blogData
      }else{
        return null
      }
    })
  }
}
