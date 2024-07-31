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

/**
 * End Global Variables
 * Begin Main Functions
 * 
*/

// build the nav
function createNav(){
    const navbarList = document.querySelector("#navbar__list");
    for (const section of sections) {
        const elementLink = document.createElement("a")
        const para = document.createElement("li");
        para.appendChild(elementLink);
        elementLink.setAttribute('href', '#' + section.getAttribute('id'));

        elementLink.innerHTML = section.getAttribute('data-nav');
        para.classList.add('menu__link');
        navbarList.appendChild(para);
    }
}

// Add class 'active' to section when near top of viewport
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
  
// Scroll to anchor ID using scrollTO event
function smoothScroll(target) {
    const element = document.getElementById(target);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });
    }
  }

// Scroll to section on link click
function enableSmoothScroll(){
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(function(anchor) {
      anchor.addEventListener('click', function(event) {
        event.preventDefault();
        const target = anchor.getAttribute('href').substring(1);
        smoothScroll(target);
      });
    });
}

//This will request content from server in future. Now it returns just some static data.
function getContent(){
    const pageContent = {
    sections:
    [{
        menuText:"Section 1", sectionId:"section1", sectionName:"Section 1", sectionText:"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p>"+
        "<p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>"
    },
    {
        menuText:"Section 2", sectionId:"section2", sectionName:"Section 2", sectionText:"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p>"+
        "<p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>"
    },
    {
        menuText:"Section 3", sectionId:"section3", sectionName:"Section 3", sectionText:"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p>"+
        "<p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>"
    }
        
    ]
    }
 return pageContent;
};

//Fill sections of page with content.
function fillPageContent(){
   let content = getContent();
   const main = document.getElementsByTagName('main')[0];
   const dFrag = document.createDocumentFragment();
   for(const sectionData of content.sections){
    const section = document.createElement('section');
    section.setAttribute('id', sectionData.sectionId );
    section.setAttribute('data-nav',sectionData.menuText);
    const div =document.createElement('div');
    div.classList.add('landing__container');
    const h2 = document.createElement('h2');
    h2.innerHTML = sectionData.sectionName;
    div.appendChild(h2);
    div.innerHTML += sectionData.sectionText;
    section.appendChild(div);
    dFrag.appendChild(section);
   }
   main.appendChild(dFrag);
};

//Initialize page, menu and set event listeners.
function preparePage(){  
    fillPageContent();
    createNav();
    enableSmoothScroll();
    document.addEventListener('scroll', () =>{
        AddActiveClass(sections);
    });
};

document.addEventListener('DOMContentLoaded', preparePage);


