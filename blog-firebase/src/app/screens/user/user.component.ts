import { Component, OnInit } from '@angular/core';
import { BLOGS, Blog } from '../../shared/Blogs'
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { Subject, switchMap, map } from 'rxjs';
import { BlogsServiceService } from '../../services/blogs-service.service'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css', '../../app.component.css']
})
export class UserComponent implements OnInit {

  public username: string = ''
  public blogs: Blog[] = [];

  constructor(private route: ActivatedRoute, private bs: BlogsServiceService, private afs: AngularFirestore) {
    this.route.params.subscribe((param) => {
      this.username = param["username"]
      console.log(this.username)
    })
  }

  ngOnInit(): void {
    this.loadData()
  }

  loadData() {
    this.afs.collection("blogs").snapshotChanges().subscribe((data)=>{
      data.map(d=>{
        let blogDoc={
          author:"",
          content:"",
          title:"",
          id:""
        }
        let resDoc:any=d.payload.doc.data()
        if(resDoc.author===this.username){
          blogDoc.author=resDoc.author
          blogDoc.content=resDoc.content
          blogDoc.title=resDoc.title
          blogDoc.id = d.payload.doc.id
          this.blogs.push(blogDoc)
        }
      })
    })
  }
}
