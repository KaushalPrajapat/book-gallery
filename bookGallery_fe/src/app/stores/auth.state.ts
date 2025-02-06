import { Author } from "../models/author.model";
import { Auth } from "./auth.model";

export interface AppState
{
  auth: Auth;
  profile : Author;
}
