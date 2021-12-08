//OG SPLENDOR
//FRONT-END DEV
//BOOK LENDING SERVICE


const line = _=> console.log("=".repeat(55));
let returnBookCount = 0;

const Lib = (function(){

  const activities = ["View all categories", "Donate a book", "Rent a book", "Return a book", "View available books", "Exit"];

  //Book Categories
  const books = {
        'Comics': ['Naruto by "Masashi Kashimoto"', 'The Adventures of Tin Tin by "Herge"', 'Black Jack by "Osamu Tezuka"', 'Garfield by "Jim Davis"',],

        'Romantic': ['Scarlet Thread by "Francine Rivers"', 'Pride & Prejudice by "Jane Austen"', 'The Hating Game by "Sally Thorne"', 'The Kissing Quotient by "Helen Hoang"',],

        'Mystics': ['The Alchemist by "Paulo Coelho"', 'The Essential Rumi by "Jalal al-Din Rumi"', 'Dune Chronicles by "Frank Herbert"'],

        'Nigerian Poetry': ['Early Birds by "Niyi"', 'Sahara Testaments by "Tade Ipadeola"', 'Clinicals Blues by "Dami Ajayi"', ],

        'Go Back':''
  };

    //All Bindings
  let category,choices, menuItem, name, index, choice, selectedCategory,                 selectedCategoryBooks, selectedBook, categoryBiasedRentedBooks = [], rentedBooks = [];

  //Optional prompt
  const optPrompt = _=> {
      line();
      console.log("What now?");
      console.log(`0. Go back\n1. Main Menu`);
      index = 0;
      choice = prompt("");

      if(parseInt(choice) == 0){
        viewCategories();
      } else if(parseInt(choice) == 1){
        viewMainMenu();
      }
  }

  const viewMainMenu = ()=> {

      console.log("\nMAIN MENU");

      activities.forEach((activity, idx) => console.log(`${idx+1}. ${activity}`));

      menuItem = prompt("");

      switch(menuItem){
        case "1":
              viewCategories()
              break;
        case "2":
              donateABook();
              break;
        case "3":
              rentBook();
              break;
        case "4":
              returnBook();
              break;
        case "5":
              viewAvailableBooks();
              break;
        case "6":
              {
                name = '';
              line();
              console.log("Bye for now and hope to see you again. Happy learning ;)!");
              line();
              }
              break;
        default:
              console.log("Invalid option, restart the program and try again.");

      }
        
    };


    //Get category
    const getCategory = ()=> {
      line();
      console.log("Select a category");
      Object.keys(books).forEach((book, idx) => console.log(`${idx+1}. ${book}`));

    
      category = prompt('');

        if(category == ''){
          return false;
        }

      return parseInt(category);

    };

    //Get books
    const getBooks = (category)=> {

      return books[`${Object.keys(books)[parseInt(category)-1]}`];

    };




    const viewCategories = _=> {

      category = getCategory();

      //Add Go back functionaity
      if(category == 5) {
        line(); 
        viewMainMenu();
        return;
      } else if(category > 5 || category <= 0 || !category){
        line();
        console.log("Invalid category option, please enter options 1 - 5");
        viewCategories();
        return;
      }

      line();
      console.log(`All books under the ${Object.keys(books)[category - 1]} category`);
      books[`${Object.keys(books)[parseInt(category)-1]}`].forEach((book, idx) => {
          index = idx+1;
          console.log(`> ${book}`);
      });


      viewCategories();
      
        
    };

    //Donate book 
    const donateABook = ()=> {

      category = getCategory();

      //Add Go back functionaity
      if(category == 5) {
        line(); 
        viewMainMenu();
        return;
      } else if(category > 5 || category <= 0 || !category){
        line();
        console.log("Invalid category option, please enter options 1 - 5");
        donateABook();
        return;
      }

      let book;

      line();
      // console.log("Enter the name of your donated book");
      // const book = prompt("");

      //Check if a book was donated
      do {
        console.log("Enter the name of the book you wish to donate");
        book = prompt("");
      } while(book == "");

      //Add to lib
      books[Object.keys(books)[category - 1]].push(book+" - donated");

      line();
      console.log(`Thank you ${name} for your contribution to our Library`);
      line();
      viewMainMenu();

      // if(book !== ""){
      //   console.log(`Thank you ${name} for your contribution to our Library`);
      //   viewMainMenu();
      // } else {
      //   console.log("Abeg donate something!😉");

      // }
      
      
      //console.log(getBooks(category));

      
    };

    //Rent Book
    const rentBook = ()=> {

      category = getCategory();

      //Add Go back functionaity
      if(category == 5) {
        line(); 
        viewMainMenu();
        return;
      } else if(category > 5 || category <= 0 || !category){
        line();
        console.log("Invalid category option, please enter options 1 - 5");
        rentBook();
        return;
      }

      const catBooks = getBooks(category);
      line();
      // console.log(catBooks);
      console.log("You can rent upto 3 books by comma seperating your selection (1,2,3)");
      catBooks.filter(book => {
          for(let rbook of rentedBooks){
            if(book == rbook) return false;
          }

          return true;
        }).forEach((book, idx) => {
        index = idx+1;
        console.log(`${index}. ${book}`);
      }); 

      //Go back and main menu options
      console.log(`${++index}. Go Back`);
      console.log(`${++index}. Main Menu`);

      //Pick book, books to rent
      do {
        choice = prompt("");
        if(parseInt(choice) === index){
          //Main Menu
          viewMainMenu();
        } else if(parseInt(choice) === (index - 1)){
          //Go back
          rentBook();
        } else if((parseInt(choice) < index - 2) || choice.toString().includes(",")) {

          choices = choice.split(",");
          choices.forEach(c => rentedBooks.push(catBooks[parseInt(c)-1]));

          line();
          console.log(`You have successfully rented ${rentedBooks}. HAPPY LEARNING!!!`);
          line();

          viewMainMenu();

        } else {
          console.log("Please, pick a valid option");
        }
      } while(parseInt(choice) > index || choice == "");
      



    };

    //Return Book
    const returnBook = ()=> {

      category = getCategory();

      //Add Go back functionaity
      if(category == 5) {
        line(); 
        viewMainMenu();
        return;
      } else if(category > 5 || category <= 0 || !category){
        line();
        console.log("Invalid category option, please enter options 1 - 5");
        returnBook();
        return;
      }

      categoryBiasedRentedBooks = books[`${Object.keys(books)[parseInt(category)-1]}`].filter(book => {
        for(let rbook of rentedBooks){
          if(book === rbook) return true;
        }

        return false;
      });


      //Check if you rented book (s) from the selected category
      if(categoryBiasedRentedBooks.length == 0){
        if(returnBookCount == 2) {
          console.log("Bros/babe, abeg wait o. If you borrow book, you no go know?");
          console.log("We are taking you to main menu");
          viewMainMenu();
          return;

        }
        console.log(`You have not rented any book from the ${Object.keys(books)[category - 1]} category`);

        //Go back to rent book
        returnBookCount++;
        
        returnBook();
      } else {

        console.log("You can return 1 or more books by comma seperating your selection (1,2,3)");

        categoryBiasedRentedBooks.forEach((book, idx) => {
          index = idx+1;
          console.log(`${index}. ${book}`);

        });

        choice = prompt("");
        choices = choice.split(",");
        choices.forEach(c => rentedBooks.splice(rentedBooks.indexOf(categoryBiasedRentedBooks[parseInt(c)-1]), 1));

        line();
        console.log(`You have returned the book(s) you lent. Hope you had a good time reading? Don't forget the saying "Readers are leaders." Bye for now`);
        line();

        viewMainMenu();

      }

      


    
    };

    const listAvailBooks = (category) => {
      console.log(`These are the available books under ${Object.keys(books)[category - 1]} category`);
      books[`${Object.keys(books)[parseInt(category)-1]}`].filter(book => {
          for(let rbook of rentedBooks){
            if(book == rbook) return false;
          }

          return true;
        })
        .forEach((book, idx) => {
          index = idx+1;
          console.log(`> ${book}`);
      });
    };

    //View Available books
    const viewAvailableBooks = ()=> {
      category = getCategory();

      if(category == 5) {
        line(); 
        viewMainMenu();
        return;
      } else if(category > 5 || category <= 0 || !category){
        line();
        console.log("Invalid category option, please enter options 1 - 5");
        viewAvailableBooks();
        return;
      }

      line();
      listAvailBooks(category);
      viewAvailableBooks();

    };


  return {

    init(){

      console.log("Welcome to Splendor Library 📚");
      line();


      do {
        name = prompt("Please enter your name(For Documentation Purposes)");
      } while(name == '');

      if(name !== ''){
        //Welcome message
        line();
        console.log(`\nHi ${name} 👋.\nWelcome to Splendor\'s Library\n`);
        line();

        console.log("What would you like to do today?");
        line();

        //show main menu
        viewMainMenu();
      }

    }
  }

  

})();



//Start the program
Lib.init();