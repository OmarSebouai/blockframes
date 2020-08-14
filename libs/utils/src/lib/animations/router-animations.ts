import {transition, trigger, query, style, animate, group, animateChild, stagger, sequence } from '@angular/animations';
import { Easing } from './animation-easing';


const homeToList = [
    'home => title-list',
    'home => wishlist',
    'home => organization-list',
    'home => event-list',
].join(',');

const listToList = [
    'notifications <=> title-list',
    'notifications <=> wishlist',
    'notifications <=> organization-list',
    'notifications <=> event-list',
    'wishlist <=> title-list',
    'wishlist <=> organization-list',
    'wishlist <=> event-list',
    'title-list <=> organization-list',
    'title-list <=> event-list',
    'organization-list <=> event-list',
].join(',');

// List => View
const listToView = [
    'notifications => title-view',
    'notifications => organization-view',
    'notifications => event-view',
    'wishlist => title-view',
    'wishlist => organization-view',
    'wishlist => event-view',
    'title-list => title-view',
    'title-list => organization-view',
    'organization-list => organization-view',
].join(', ')

// View <=> View
// 'title-view <=> organization-view',

/** Prepare page before leaving/entering (use absolute to get out of the page flow) */
const prepare = [
    style({ position: 'relative' }),
    query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          overflow: 'hidden'
        })
    ], { optional: true }),
];


/**
 * Router Animation
 * @note * => home: slide from bottom
 * @note list <=> list: slide from right
 * @note list <=> view: run local animation (else very slow)
 */
export const routeAnimation = trigger('routeAnimation', [
    transition('* => home', [
        ...prepare,
        query(':enter', [ style({ opacity: 0 }) ], { optional: true }),
        group([
            query(':leave', [ animate('200ms ease-in', style({ opacity: 0 })) ], { optional: true }),
            query(':enter', [ animate(`400ms 100ms ease-out`, style({ opacity: 1 })) ], { optional: true })
        ]),
    ]),
    // Home => List
    transition(homeToList, [
        ...prepare,
        query(':enter', [ style({ transform: 'translateY(100%)', opacity: 1 }) ], { optional: true }),
        sequence([
            query(':leave', [ animate('400ms ease-in', style({ transform: 'scale(0.98)' })) ], { optional: true }),
            query(':enter', [ animate(`400ms ease-out`, style({ transform: 'translateY(0)' })) ], { optional: true })
        ]),
    ]),
    // List <=> List
    transition(listToList, [
        ...prepare,
        query(':enter', [ style({ opacity: 0 }) ], { optional: true }),
        group([
            query(':leave', [ animate('200ms ease-in', style({ opacity: 0 })) ], { optional: true }),
            query(':enter', [ animate(`200ms 100ms ease-out`, style({ opacity: 1 })) ], { optional: true })
        ])
    ]),
    // List => View
    transition(listToView, [
        ...prepare,
        query(':enter', [ style({ transform: 'scale(0.95)', opacity: 1 }) ], { optional: true }),
        group([
            query(':leave', [ animate('200ms ease-in', style({ opacity: 0 })) ], { optional: true }),
            query(':enter', [ animate(`200ms 100ms ${Easing.easeOutcubic}`, style({ transform: 'scale(1)', opacity: 1 })) ], { optional: true })
        ])
    ]),
    // List <=> view
    // transition(listToView, [
    //     ...prepare,
    //     query(':enter', [ style({ opacity: 0 }) ], { optional: true }),
    //     query(':leave', animateChild(), { optional: true }),
    //     query(':enter', animateChild(), { optional: true }),
    // ]),
]);
