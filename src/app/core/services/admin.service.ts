import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
@Injectable({
    providedIn: 'root',
})

export class AdminService {
    private base_url = environment.BASE_API;
    constructor(private httpClient: HttpClient) { }
    
    AddCourse(data:any):Observable<any>{
        return this.httpClient.post(`${environment.BASE_API}/api/Course/create-khoahoc`,data)
    }
    AddCourseCategor(data:any):Observable<any>{
        return this.httpClient.post(`${environment.BASE_API}/api/CourseCategory/create-loai`,data)
    }


    
   
}