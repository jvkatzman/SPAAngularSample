import { Injectable } from '@angular/core';


export interface MenuItem {
    text: string,
    icon: string,
    route: string,
    submenu: Array<MenuItem>

}// MenuItems

@Injectable()
export class MenuService{

    // menu items
    items: Array<MenuItem>;
    isVertical= false;
    showingLeftSideMenu=false;

    toggleLeftSideMenu(): void {
        this.isVertical = true;
        this.showingLeftSideMenu = !this.showingLeftSideMenu;
    } //toggleLeftSideMenu

    toggleMenuOrientation(){
        this.isVertical = !this.isVertical;
    }//toggleOrientation

}// MenuService