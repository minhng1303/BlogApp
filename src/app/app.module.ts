import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/views/nav-bar/nav-bar.component';
import { FooterComponent } from './components/views/footer/footer.component';
import { LoginComponent } from './components/views/login/login.component';
import { SignUpComponent } from './components/views/sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './services/AuthService/auth.service';
import { ArticleService } from 'src/app/services/ArticleService/article.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { SettingComponent } from './components/views/setting/setting.component';
import { HomeComponent } from './components/views/home/home.component';
import { ArticleComponent } from './components/views/article/article.component';
import { PaginationComponent } from './components/commons/pagination/pagination.component';
import { LikeButtonComponent } from './components/commons/like-button/like-button.component';
import { ChipsComponent } from './components/commons/chips/chips.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { TabComponent } from './components/commons/tab/tab.component';
import { MyProfileComponent } from './components/views/my-profile/my-profile.component';
import { MyArticleComponent } from './components/views/my-profile/my-article/my-article.component';
import { FavoritedArticleComponent } from './components/views/my-profile/favorited-article/favorited-article.component';
import { NewArticleComponent } from './components/views/new-article/new-article.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LoginComponent,
    SignUpComponent,
    SettingComponent,
    HomeComponent,
    PaginationComponent,
    LikeButtonComponent,
    ChipsComponent,
    ArticleComponent,
    TabComponent,
    NavBarComponent,
    MyProfileComponent,
    FavoritedArticleComponent,
    MyArticleComponent,
    NewArticleComponent,
  ],
  imports: [
    MatChipsModule,
    MatTabsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    ArticleService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
