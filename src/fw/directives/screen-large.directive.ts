import {Directive, Input, OnDestroy, TemplateRef, ViewContainerRef} from '@angular/core'

import {ScreenService} from '../services/screen.service'
import {Subscription} from 'rxjs/Subscription'

@Directive({selector: '[screenLarge]'})

export class ScreenLarge implements OnDestroy {
    private hasView = false;
    private screenSubscription : Subscription;

    constructor (private ViewContainer: ViewContainerRef,
                private template: TemplateRef<object>,
                private screenService: ScreenService) {
    this.screenSubscription = screenService.resize$.subscribe(()=>this.onResize() )
    }// constructor

@Input()
set screenLarge(condition) {
    // ignore the passed condition and set it based on screen size
    condition = this.screenService.screenWidth >= this.screenService.largeBreakpoint;

    if (condition && !this.hasView) {
        this.hasView=true;
        // createEmbeddedView addes view below  to the DOM
        this.ViewContainer.createEmbeddedView(this.template);
    }else if (!condition && this.hasView){
        this.hasView=false;
        this.ViewContainer.clear();
    }//if
}

ngOnDestroy(){
    this.screenSubscription.unsubscribe();
}

onResize() {
    // trigger the setter above
    this.screenLarge = false;
}//onResize

}// ScreenLarge