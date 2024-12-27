import { trigger, animate, transition, style, state } from '@angular/animations';

export const downAnimation = trigger('detailExpand', [
    state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
    state('expanded', style({ height: '*', visibility: 'visible' })),
    transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
]);

export const upAnimation = trigger('comDetailExpand', [
    state('comCollapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
    state('comExpanded', style({ height: '*', visibility: 'visible' })),
    transition('comExpanded <=> comCollapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
]);