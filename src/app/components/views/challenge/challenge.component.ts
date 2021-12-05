import { Router } from '@angular/router';
import { QuestionService } from './../../../services/QuestionService/question.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss'],
})
export class ChallengeComponent implements OnInit {
  topicList: [];
  constructor(
    private questionService: QuestionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.questionService.getAllTopic().subscribe((res) => {
      this.topicList = res['topics'];
    });
  }

  startAttempt(topicName: string) {
    console.log(topicName);
    this.router.navigate(['challenge', topicName]);
  }
}
