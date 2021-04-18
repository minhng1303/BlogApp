import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';
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
import { RecommenderComponent } from './components/commons/recommender/recommender.component';
import { FollowButtonComponent } from './components/commons/follow-button/follow-button.component';
import { DeleteButtonComponent } from './components/commons/delete-button/delete-button.component';
import { EditButtonComponent } from './components/commons/edit-button/edit-button.component';
import { FavoriteButtonComponent } from './components/commons/favorite-button/favorite-button.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './components/commons/dialog/dialog.component';
import {MatButtonModule} from '@angular/material/button';
import { OptionDialogComponent } from './components/commons/option-dialog/option-dialog.component';
import { AboutUsComponent } from './components/views/about-us/about-us.component';
import { NewPostIconComponent } from './components/commons/new-post-icon/new-post-icon.component';
import { NotFoundComponent } from './components/views/not-found/not-found.component';
import { ArticleHeaderComponent } from './components/commons/article-header/article-header.component';
import { ParticlesModule } from 'angular-particle';
import { ArticleBodyComponent } from './components/commons/article-body/article-body.component';
import { UserProfileComponent } from './components/views/user-profile/user-profile.component';
import { UserPostComponent } from './components/views/user-profile/user-post/user-post.component';
import { UserFavoritedComponent } from './components/views/user-profile/user-favorited/user-favorited.component';

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
    RecommenderComponent,
    FollowButtonComponent,
    DeleteButtonComponent,
    EditButtonComponent,
    FavoriteButtonComponent,
    DialogComponent,
    OptionDialogComponent,
    AboutUsComponent,
    NewPostIconComponent,
    NotFoundComponent,
    ArticleHeaderComponent,
    ArticleBodyComponent,
    UserProfileComponent,
    UserPostComponent,
    UserFavoritedComponent,
  ],
  entryComponents: [OptionDialogComponent, DialogComponent],
  imports: [
    MatButtonModule,
    MatDialogModule,
    NgxSpinnerModule,
    MatChipsModule,
    MatTabsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule,
    ParticlesModule
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
