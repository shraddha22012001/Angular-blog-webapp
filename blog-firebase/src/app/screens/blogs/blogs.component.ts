import { Component, OnInit } from '@angular/core';
import {BLOGS,Blog} from '../../shared/Blogs'

import {BlogsServiceService} from '../../services/blogs-service.service'
 
@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css','../../app.component.css']
})
export class BlogsComponent implements OnInit {

  public blogs:Blog[]=[];

  constructor(private bs:BlogsServiceService) {
  }

  ngOnInit(): void {
    this.blogs=this.bs.getBlogs()
  }

}
