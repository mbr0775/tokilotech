"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Menu,
  X,
  Moon,
  Sun,
  ArrowUpRight,
} from "lucide-react";

import { useTheme } from "../theme-provider";


const navItems = [
  {
    label: "Home",
    sectionId: "home",
  },
  {
    label: "About",
    sectionId: "about",
  },
  {
    label: "Projects",
    sectionId: "projects",
  },
  {
    label: "Services",
    sectionId: "services",
  },
  {
    label: "Team",
    sectionId: "team",
  },
  {
    label: "Contact",
    sectionId: "contact",
  },
];



export default function Navigation() {


  const {
    theme,
    toggleTheme,
  } = useTheme();



  const [
    mobileOpen,
    setMobileOpen,
  ] = useState(false);



  const [
    activeSection,
    setActiveSection,
  ] = useState("home");





  useEffect(()=>{


    const handleScroll = ()=>{


      let current =
        "home";


      navItems.forEach((item)=>{


        const section =
          document.getElementById(
            item.sectionId
          );


        if(section){

          if(
            window.scrollY >
            section.offsetTop - 180
          ){

            current =
              item.sectionId;

          }

        }


      });



      setActiveSection(current);


    };



    window.addEventListener(
      "scroll",
      handleScroll
    );


    return ()=>{

      window.removeEventListener(
        "scroll",
        handleScroll
      );

    };


  },[]);






  const scrollToSection = (
    id:string
  )=>{


    setMobileOpen(false);


    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior:"smooth",
      });


  };







return (

<header
className="
fixed
top-0
left-0
right-0
z-50
px-3
pt-3
sm:px-5
"
>


<nav
className="
mx-auto
max-w-[1400px]

rounded-2xl

border
border-slate-200/70

bg-white/90

backdrop-blur-xl

shadow-[0_15px_40px_rgba(23,35,61,0.12)]

dark:border-white/10

dark:bg-[#0b1120]/90

"
>



<div
className="
grid
grid-cols-[1fr_auto]

items-center

min-h-[62px]

px-3

lg:flex
lg:justify-between
lg:px-5
"
>




{/* LOGO */}

<button

onClick={()=>scrollToSection("home")}

className="
justify-self-start

overflow-hidden

rounded-2xl

border
border-slate-200

bg-white

shadow-sm

dark:border-white/10

"

>


<div
className="
relative

flex
items-center
justify-center


h-12

w-[175px]


sm:w-[220px]

"
>


<Image

src="/tokilotechlogo.png"

alt="Tokilo Technologies"

fill

priority

sizes="220px"

className="
object-contain

p-2

scale-[1.8]

"

/>


</div>


</button>






{/* DESKTOP MENU */}

<div
className="
hidden

lg:flex

items-center

gap-2
"
>


{
navItems.map((item)=>(


<button

key={item.sectionId}

onClick={()=>scrollToSection(item.sectionId)}

className={`

rounded-full

px-5

py-2.5

text-sm

font-bold

transition


${
activeSection===item.sectionId

?

"bg-[#17233d] text-white"

:

"text-slate-600 hover:bg-slate-100"

}

`}

>

{item.label}

</button>


))

}



</div>







{/* RIGHT BUTTONS */}

<div
className="
flex

items-center

gap-2
"
>


<button

onClick={toggleTheme}

className="
flex

h-10

w-10

items-center

justify-center

rounded-full

border

border-slate-200

dark:border-white/10

"

>


{
theme==="dark"

?

<Sun size={18}/>

:

<Moon size={18}/>

}


</button>






<button

onClick={()=>setMobileOpen(!mobileOpen)}

className="
flex

h-10

w-10

items-center

justify-center


rounded-full


bg-[#17233d]

text-white


lg:hidden

"

>


{
mobileOpen

?

<X size={20}/>

:

<Menu size={20}/>

}


</button>



</div>




</div>









{/* MOBILE MENU */}

{
mobileOpen &&

<div
className="
border-t

border-slate-200

p-3

lg:hidden

dark:border-white/10
"
>


<div
className="
grid

grid-cols-3

gap-2
"
>


{
navItems.map((item)=>(


<button

key={item.sectionId}

onClick={()=>scrollToSection(item.sectionId)}

className={`

rounded-xl

py-3

text-xs

font-bold


${
activeSection===item.sectionId

?

"bg-[#17233d] text-white"

:

"bg-slate-100"

}

`}

>

{item.label}


</button>


))

}


</div>




<button

onClick={()=>scrollToSection("contact")}

className="
mt-3

flex

w-full

items-center

justify-center

gap-2


rounded-xl

bg-[#91BF48]


py-3


text-sm

font-black

text-[#17233d]

"

>


Start a project

<ArrowUpRight size={16}/>


</button>



</div>


}



</nav>


</header>


);


}