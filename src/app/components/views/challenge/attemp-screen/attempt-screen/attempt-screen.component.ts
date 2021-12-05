import { QuestionService } from './../../../../../services/QuestionService/question.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attempt-screen',
  templateUrl: './attempt-screen.component.html',
  styleUrls: ['./attempt-screen.component.scss'],
})
export class AttemptScreenComponent implements OnInit {
  topicName: string = '';
  questions: [];
  quizAnswers = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {
    this.topicName = this.route.snapshot.params['topicName'];
    this.questionService.getAllQuestions(this.topicName).subscribe((res) => {
      console.log(res);
      this.questions = res['questions'];
    });
  }

  handleChoose(e, _answer, _questionId) {
    // let _answer = parseInt(e.target.getAttribute('_answer'));
    // let _questionId = e.target.getAttribute('_id');
    if (e.target.className.includes('selected-answer')) {
      e.target.classList.remove('selected-answer');
      e.target.children[0].checked = false;
      delete this.quizAnswers[_questionId];
      return;
    }
    this.quizAnswers[_questionId] = _answer;
    console.log(this.quizAnswers);

    let selectedAnswer = e.target.parentElement.querySelector(
      '.answer-box__choice.selected-answer'
    );
    if (selectedAnswer) {
      selectedAnswer.classList.remove('selected-answer');
    }
    e.target.classList.toggle('selected-answer');
    e.target.children[0].checked = true;
  }
}
