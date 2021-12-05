import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private http: HttpClient) {}
  private baseURL: string = 'http://localhost:3001/api';

  getAllQuestions(topic: string) {
    return this.http.post(`${this.baseURL}/question/${topic}`, {});
  }

  getAllTopic() {
    return this.http.get(`${this.baseURL}/topic`);
  }
}
