import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { SortableGrid } from '../components/sortable-grid/sortable-grid';
import { IntroductionPage } from '../pages/introduction/introduction';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    IntroductionPage,
    HomePage,
    TabsPage,
    SortableGrid
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    IntroductionPage,
    HomePage,
    TabsPage
  ],
  providers: []
})
export class AppModule {}
