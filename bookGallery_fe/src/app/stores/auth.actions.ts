import { createAction, props } from '@ngrx/store';
import { Auth } from './auth.model';
import { Author } from '../models/author.model';

export const signin = createAction(
  '[Sign In Component] signin',
  props<{ auth: Auth }>()
);
export const signout = createAction('[Header Component] signout');
export const fetchLoggedInAuthor = createAction(
  '[Header Component] fetchLoggedInAuthor',
  props<{ profile: Author }>()
);

export const removeLoggedInAuthor = createAction(
  '[Header Componet] (trigger at time of signout) removeLoggedInAuthor'
);
