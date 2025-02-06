import { CommonModule } from "@angular/common"
import { Component } from "@angular/core"

@Component({
  selector: "app-home",
  imports:[CommonModule],
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
  features = [
    {
      icon: "fas fa-search",
      title: "Discover Books",
      description: "Explore a vast collection of books across various genres and authors.",
    },
    {
      icon: "fas fa-star",
      title: "Rate and Review",
      description: "Share your thoughts and rate books to help other readers make informed choices.",
    },
    // {
    //   icon: "fas fa-users",
    //   title: "Connect with Readers",
    //   description: "Join a community of book lovers, discuss your favorite reads, and make new friends.",
    // },
    // {
    //   icon: "fas fa-book-open",
    //   title: "Track Your Reading",
    //   description: "Keep a record of books you've read, want to read, and are currently reading.",
    // },
  ]

  howItWorks = [
    {
      step: 1,
      title: "Create an Account",
      description: "Sign up for free and set up your personal profile.",
    },
    {
      step: 2,
      title: "Explore the Library",
      description: "Browse through our extensive collection of books or search for specific titles.",
    },
    {
      step: 3,
      title: "Engage with Content",
      description: "Rate books, write reviews, and interact with other readers' content.",
    },
    {
      step: 4,
      title: "Build Your Collection",
      description: "Add books to your personal shelves and track your reading progress.",
    },
  ]
}

