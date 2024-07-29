/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
const sections = document.getElementsByTagName("section");
let numb = sections.length;
console.log(sections);

const navbarList = document.querySelector("#navbar__list");
for (const section of sections) {
    const para = document.createElement("li");
    para.innerHTML = section.getAttribute('data-nav');
    para.classList.add('menu__link');
    navbarList.appendChild(para);

    
  }

function AddActiveClass(sections){
  for(const section of sections){
        let distanceFromTop = section.getBoundingClientRect().top;
        if(distanceFromTop >= 0 && distanceFromTop <= window.innerHeight){
            section.classList.add("your-active-class");
        } else {
            section.classList.remove("your-active-class")
        }

    }
}

document.addEventListener('scroll', () =>{
    AddActiveClass(sections);
});




/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav


// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

// Set sections as active


// for (const section of sections) {
//   const a = document.createElement("a");
//   a.innerText = section.dataset.linkText;
//   a.href = "#"+section.id;
//   nav.appendChild(a);
// }

