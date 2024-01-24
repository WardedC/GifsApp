import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  public gifsList: Gif[] = []
  private _tagsHistory: string[] = []
  private _apiKey: string = 'n0VnKOPEmyv3lbQiKikvklYNIGF50jU3'
  private _serviceUrl: string = 'http://api.giphy.com/v1/gifs'
  

  constructor(private http: HttpClient) { this.loadLocalStorage() }


  get tagHistory(){
    return [...this._tagsHistory];
  }
 
  public deleteSpecificTagnHistory(tag: string): void{
    this._tagsHistory = this._tagsHistory.filter(item => item !== tag)
    localStorage.removeItem(tag);
    this.safeLocalStorage();

  }

  public deleteAllTagHistory(): void{
    this._tagsHistory = [];
    localStorage.clear;
    this.safeLocalStorage();


  }



  private safeLocalStorage(){
    localStorage.setItem('History', JSON.stringify(this._tagsHistory))
  }

  private loadLocalStorage(){
    
    if(!localStorage.getItem('History')) return;
    this._tagsHistory = JSON.parse(localStorage.getItem('History')!)

    if(this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0]);
  }
  
  private organizeHistory(tag:string){
    tag = tag.toLowerCase();

    if( this._tagsHistory= this._tagsHistory.filter((oldTag)=> oldTag !== tag) )
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this.tagHistory.splice(0,10);
    this.safeLocalStorage();
  }
  
   searchTag(tag:string):void{

    if(tag.length === 0) return;
    this.organizeHistory(tag);
    const params = new HttpParams()
      .set('api_key', this._apiKey)
      .set('q', tag)
      .set('limit', '10')
      

    this.http.get<SearchResponse>(`${this._serviceUrl}/search`, {params})
      .subscribe(resp => {
        this.gifsList = resp.data
        
      })

    
      

  }

}
