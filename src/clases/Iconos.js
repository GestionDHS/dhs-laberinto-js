import { library, icon } from '@fortawesome/fontawesome-svg-core';
import {faPlay, faTrashCan} from '@fortawesome/free-solid-svg-icons';


library.add(
faTrashCan,
faPlay
);

export const tacho = icon({ prefix: 'fas', iconName: 'trash-can' }).html;
export const play = icon({ prefix: 'fas', iconName: 'play' }).html;
