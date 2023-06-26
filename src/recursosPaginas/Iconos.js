import { library, icon } from '@fortawesome/fontawesome-svg-core';
import {faCirclePlay, faTrash, faCircleStop, faRotateLeft, faPerson, faPersonRunning, faCode, faComment, faAnglesRight} from '@fortawesome/free-solid-svg-icons';


library.add(
faTrash,
faCirclePlay,
faCircleStop,
faRotateLeft,
faPerson,
faPersonRunning,
faCode,
faComment,
faAnglesRight
);

export const trash = icon({ prefix: 'fa', iconName: 'trash' }).html;
export const play = icon({ prefix: 'fa', iconName: 'circle-play' }).html;
export const stop = icon({ prefix: 'fa', iconName: 'circle-stop' }).html;
export const restart = icon({ prefix: 'fa', iconName: 'rotate-left' }).html;
export const standingPerson = icon({ prefix: 'fa', iconName: 'person' }).html;
export const runningPerson = icon({ prefix: 'fa', iconName: 'person-running' }).html;
export const code = icon({ prefix: 'fa', iconName: 'code' }).html;
export const comment = icon({ prefix: 'fa', iconName: 'comment' }).html;
export const foward = icon({ prefix: 'fa', iconName: 'angles-right' }).html;



