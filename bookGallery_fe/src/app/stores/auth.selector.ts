import { createSelector } from '@ngrx/store';
import { AppState } from './auth.state';
import { Author } from '../models/author.model';
import { Auth } from './auth.model';

export const authSelector = (state: AppState) => state.auth;

export const profileSelector = (state: AppState) => state.profile;

export const profileValue = createSelector(
  profileSelector,
  (state: Author) => state
);

export const accessTokenValue = createSelector(
  authSelector,
  (state:Auth)=>state.accessToken
)
