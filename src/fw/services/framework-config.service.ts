import { Injectable } from '@angular/core';

export interface IconFiles {
  imageFile: string;
  alt: string;
  link: string;
}

// ? means not required
export interface FrameworkConfigSettings {
  showLanguageSelector?:boolean,
  showUserControls?:boolean,
  showStatusBar?:boolean,
  showStatusBarBreakpoint?:number,
  socialIcons?: Array<IconFiles>
}

@Injectable()
export class FrameworkConfigService {
  showLanguageSelector=true;
  showUserControls=true;
  showStatusBar=true;
  showStatusBarBreakpoint=0;
  socialIcons = Array<IconFiles>();

  configure(settings: FrameworkConfigSettings): void {
    Object.assign(this,settings);
  }

}
