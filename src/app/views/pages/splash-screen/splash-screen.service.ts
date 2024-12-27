import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { animate, AnimationBuilder, AnimationPlayer, style } from '@angular/animations';
import { NavigationEnd, Router } from '@angular/router';

import { filter, take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SplashScreenService {

    splashScreenEement: any;
    player: AnimationPlayer | null = null;

    constructor(
        private _animationBuilder: AnimationBuilder,
        @Inject(DOCUMENT) private document: any,
        private router: Router
    ) {
        this.init();
    }

    private init(): void {
        // Get the splash screen element
        this.splashScreenEement = this.document.body.querySelector('#splash-screen');

        // If the splash screen element exists...
        if (this.splashScreenEement) {
            // Hide it on the first NavigationEnd event
            this.router.events
                .pipe(
                    filter((event => event instanceof NavigationEnd)),
                    take(1)
                )
                .subscribe(() => {
                    setTimeout(() => {
                        this.hide();
                    });
                });
        }
    }

    show(): void {
        this.player =
            this._animationBuilder
                .build([
                    style({
                        opacity: '0',
                        zIndex: '99999'
                    }),
                    animate('400ms ease', style({ opacity: '1' }))
                ]).create(this.splashScreenEement);

        setTimeout(() => {
            this.player?.play();
        }, 0);
    }

    hide(): void {
        this.player =
            this._animationBuilder
                .build([
                    style({ opacity: '1' }),
                    animate('400ms ease', style({
                        opacity: '0',
                        zIndex: '-10'
                    }))
                ]).create(this.splashScreenEement);

        setTimeout(() => {
            this.player?.play();
        }, 1000);
    }
}
