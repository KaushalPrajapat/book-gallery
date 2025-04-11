import { Auth } from './auth.model';
import { createReducer, on } from '@ngrx/store';
import {
  fetchLoggedInAuthor,
  fetchUserName,
  removeLoggedInAuthor,
  signin,
  signout,
} from './auth.actions';
import { Author } from '../models/author.model';

export const initialStateAuth: Auth = {
  accessToken: '',
  refreshToken: '',
};

export const initialStateProfile: Author = {
  id: 0,
  userId: '',
  name: '',
  gender: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  jobTitle: '',
  books: [],
  reviews: [],
};

export const authReducer = createReducer(
  initialStateAuth,
  on(signin, (state, action) => {
    //console.log(action);
    return {
      ...state,
      accessToken: action.auth.accessToken,
      refreshToken: action.auth.refreshToken,
    };
  }),
  on(signout, (state, action) => {
    // clear the local storage
    localStorage.clear();
    return {
      ...state,
      accessToken: '',
      refreshToken: '',
    };
  })
);

export const profileReducer = createReducer(
  initialStateProfile,
  on(fetchLoggedInAuthor, (state, action) => {
    //console.log(action);
    localStorage.setItem('profile', JSON.stringify(action.profile));
    return {
      ...state,
      id: action.profile.id,
      userId: action.profile.userId,
      name: action.profile.name,
      gender: action.profile.gender,
      email: action.profile.email,
      phone: action.profile.phone,
      dateOfBirth: action.profile.dateOfBirth,
      jobTitle: action.profile.jobTitle,
      books: action.profile.books,
      reviews: action.profile.reviews,
    };
  }),
  on(removeLoggedInAuthor, (state, action) => {
    return {
      ...state,
      id: 0,
      userId: '',
      name: '',
      gender: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      jobTitle: '',
      books: [],
      reviews: [],
    };
  }),
  on(fetchUserName, (state, action) => {
    return {
      ...state,
      name: state.name,
    };
  })
);
