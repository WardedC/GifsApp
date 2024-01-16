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
  

  constructor(private http: HttpClient) { }


  get tagHistory(){
    return [...this._tagsHistory];
  }
  
  private organizeHistory(tag:string){
    tag = tag.toLowerCase();

    if( this._tagsHistory= this._tagsHistory.filter((oldTag)=> oldTag !== tag) )
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this.tagHistory.splice(0,10);
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
