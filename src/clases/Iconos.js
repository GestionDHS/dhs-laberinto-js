import { library, icon } from '@fortawesome/fontawesome-svg-core';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons';


library.add(
faTrashCan
);

export const tacho = icon({ prefix: 'fas', iconName: 'trash-can' }).html;

