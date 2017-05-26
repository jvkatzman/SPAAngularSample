import { Component, ElementRef, HostBinding, HostListener, Renderer,
        OnInit , Input
    } from '@angular/core';
// import { animate,trigger,transition,style} from '@angular/animations';
// import { trigger,transition,style } from '@angular/platform-browser/animations';
import { 
    trigger,
    state,
    style,
    transition,
    animate,
    keyframes
 } from '@angular/core';

import { MenuItem , MenuService}  from '../../services/menu.service';
import { Router, NavigationEnd} from '@angular/router';

@Component({
  selector: 'fw-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css'],
  animations: [
        trigger('visibilityChanged', [
          // void means not in DOM, * means "ALL" occurences
            transition(':enter', [   // :enter is alias to 'void => *'
                style({opacity:0}),
                animate(500, style({opacity:1}))  // over 250 sec opacity goes to 1
            ]),
            transition(':leave', [   // :leave is alias to '* => void'
                animate(100, style({opacity:0})) 
            ])
        ])
    ]

})
export class MenuItemComponent implements OnInit {

  @Input() item = <MenuItem>null;  // see angular cli issue = 2034
  @HostBinding('class.parent-is-popup')
  @Input() parentIsPopup = true;
  isActiveRoute = false;

  mouseInItem = false;
  mouseInPopup = false;
  popupLeft = 0;
  popupTop = 34;

  constructor(  private router:Router,
                private menuService: MenuService,
                private el: ElementRef,
                private renderer: Renderer) { }

  checkActiveRoute(route: string) : void {
    this.isActiveRoute = (route == '/' + this.item.route)
  }//checkActiveRoute

  ngOnInit() {
    this.checkActiveRoute(this.router.url);

    // handle events on router
    this.router.events
        .subscribe((event)=>{
          if (event instanceof NavigationEnd) {
            this.checkActiveRoute(event.url);
            // Sconsole.log(event.url + ' ' + this.item.route +  ' ' + this.isActiveRoute);
          }
        })
  }

  @HostListener('click',  ['$event'])
  onclick(event): void {
    event.stopPropagation();  // dont let click go to parent
    if (this.item.submenu) {
      if (this.menuService.isVertical){
        this.mouseInPopup = !this.mouseInPopup;
      }// vertical menual
    }
    else if (this.item.route)
    {
      // force mouse leave to close any pop up horizontal menu items
      // bubble up to close all menus
      let newEvent = new MouseEvent('mouseleave',{bubbles:true});
      // invoiceElementMethod allows angular to talk to the DOM
      this.renderer.invokeElementMethod(
        this.el.nativeElement, 'dispatchEvent', [newEvent]
      );
      this.router.navigate(['/'+ this.item.route]);
    }
  }//onclick

  onPopupMouseEnter(event) : void {
      if (!this.menuService.isVertical) {
          this.mouseInPopup = true;
      }
  }

  onPopupMouseLeave(event) : void {
      if (!this.menuService.isVertical) {
          this.mouseInPopup = false;
      }
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event) : void {
      if (!this.menuService.isVertical) {
          this.mouseInItem = false;
      }
  }


@HostListener('mouseenter',['$event'] )
onMouseEnter() : void {
      if (!this.menuService.isVertical) {
        if (this.item.submenu){
          this.mouseInItem = true;
          if (this.parentIsPopup){
            this.popupTop =0;
            this.popupLeft =160;
          }// parent is popup
        }// if submenu


      }//if vertical
}//onMouseleave

}
