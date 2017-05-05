// Angular
import { NgModule, ValueProvider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

// Modules
import { AppRoutingModule } from './routing/app-routing.module';

// Components
import { AppComponent } from './components/app/app.component';
import { MenuComponent } from './components/menu/menu.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { DirectoryListComponent } from './components/directory/directory-list.component';
import { FileBrowserComponent, AllItemsModelService } from './components/directory/file-browser.component';

// Directives
import { ClipboardDirective } from './directives/clipboard.directive';

// Providers
import { DateProvider } from './providers/date.provider';
import { HttpProvider, SecureHttpProvider } from './providers/http.provider';
import { JsonProvider } from './providers/json.provider';
import { SecurityProvider } from './providers/security.provider';
import { SettingsProvider } from './providers/settings.provider';
import { StorageProvider } from './providers/storage.provider';
import { ValidationProvider } from './providers/validation.provider';

// Services
import { AuthService, MockAuthService } from './services/auth.service';
import { DirectoryService, MockDirectoryService } from './services/directory.service';

const WINDOW_PROVIDER: ValueProvider = {
  provide: Window,
  useValue: window
};

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    MenuComponent,
    DashboardComponent,
    LoginComponent,
    DirectoryListComponent,
    FileBrowserComponent,
    ClipboardDirective
  ],
  providers: [
    WINDOW_PROVIDER,
    DateProvider,
    HttpProvider, SecureHttpProvider,
    JsonProvider,
    SecurityProvider,
    SettingsProvider,
    StorageProvider,
    ValidationProvider,
    AllItemsModelService,
    AuthService, MockAuthService,
    DirectoryService, MockDirectoryService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
