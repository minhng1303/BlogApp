import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './components/views/article/article.component';
import { HomeComponent } from './components/views/home/home.component';
import { LoginComponent } from './components/views/login/login.component';
import { SignUpComponent } from './components/views/sign-up/sign-up.component';
import { AuthGuard } from './guards/auth.guard';
import { SettingComponent } from './components/views/setting/setting.component';
import { NewArticleComponent } from './components/views/new-article/new-article.component';
import { MyProfileComponent } from './components/views/my-profile/my-profile.component';
import { MyArticleComponent } from './components/views/my-profile/my-article/my-article.component';
import { FavoritedArticleComponent } from './components/views/my-profile/favorited-article/favorited-article.component';
import { AboutUsComponent } from './components/views/about-us/about-us.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'article/:slug',
    component: ArticleComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'setting',
    component: SettingComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'new-article',
    component: NewArticleComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: MyProfileComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'my-article',
        pathMatch: 'full',
      },
      {
        path: 'my-article',
        component: MyArticleComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'favorited',
        component: FavoritedArticleComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignUpComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
