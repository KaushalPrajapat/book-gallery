import { Injectable } from "@angular/core"

@Injectable({
  providedIn: "root",
})
export class PaginationStateService {
  private bookGridState: { page: number; pageSize: number } = { page: 1, pageSize: 10 }
  private authorGridState: { page: number; pageSize: number } = { page: 1, pageSize: 10 }

  constructor() {}

  setBookGridState(page: number, pageSize: number) {
    this.bookGridState = { page, pageSize }
  }

  getBookGridState() {
    return this.bookGridState
  }

  setAuthorGridState(page: number, pageSize: number) {
    this.authorGridState = { page, pageSize }
  }

  getAuthorGridState() {
    return this.authorGridState
  }
}

