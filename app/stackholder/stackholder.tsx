"use client";

import Image from "next/image";
import {
  Award,
  Code2,
  Palette,
  Rocket,
  Sparkles,
} from "lucide-react";


const teamMembers = [
  {
    name: "Technology Team",
    role: "Software Engineering",
    icon: Code2,
  },
  {
    name: "Product Team",
    role: "Design & Product Development",
    icon: Palette,
  },
  {
    name: "Innovation Team",
    role: "AI & Digital Solutions",
    icon: Rocket,
  },
];


export default function Stakeholders() {

return (

<section
id="team"
className="
relative
overflow-hidden

bg-[#f8fafc]

px-5
py-20

sm:px-8
lg:px-12
lg:py-32

dark:bg-[#0a0f1c]
"
>


<div
className="
absolute
right-0
top-0

h-96
w-96

rounded-full

bg-[#91BF48]/10

blur-3xl
"
/>




<div
className="
relative
mx-auto
max-w-7xl
"
>


{/* TITLE */}

<div
className="
mx-auto
max-w-3xl
text-center
"
>


<div
className="
inline-flex
items-center
gap-2

rounded-full

border

border-[#91BF48]/30

bg-[#91BF48]/10

px-4
py-2

text-xs
font-black
uppercase
tracking-[0.15em]

text-[#628b2d]
"
>

<Sparkles size={15}/>

Leadership

</div>




<h2
className="
mt-6

text-4xl

font-black

tracking-tight

text-[#17233d]

sm:text-5xl

dark:text-white
"
>

Building technology
<span
className="
block

text-[#91BF48]
"
>

with vision

</span>

</h2>



<p
className="
mt-5

text-base

leading-7

text-slate-600

dark:text-slate-300
"
>

Driven by innovation, AI, and engineering
to create scalable digital products.

</p>


</div>






{/* CEO CARD */}

<div
className="
mx-auto

mt-14

max-w-md

overflow-hidden

rounded-[2rem]

border

border-slate-200

bg-white

shadow-xl

dark:border-white/10

dark:bg-white/[0.04]
"
>



<div
className="
relative

h-[430px]

overflow-hidden

"
>


<Image

src="/mubassir.png"

alt="Abul Naser Mubassir Founder and CEO"

fill

sizes="
(max-width:768px) 100vw,
420px
"

priority

className="
object-cover

object-top
"

/>





<div
className="
absolute

inset-x-0

bottom-0

bg-gradient-to-t

from-[#17233d]

via-[#17233d]/70

to-transparent

p-6

pt-40
"
>


<div
className="
flex

items-center

gap-2

text-sm

font-bold

text-[#b8dc82]
"
>

<Award size={18}/>

Visionary Leadership

</div>


</div>


</div>







<div
className="
p-6
"
>


<h3
className="
text-2xl

font-black

text-[#17233d]

dark:text-white
"
>

Abul Naser Mubassir

</h3>



<p
className="
mt-2

font-bold

text-[#91BF48]
"
>

Founder & CEO

</p>



<p
className="
mt-4

text-sm

leading-6

text-slate-600

dark:text-slate-300
"
>

Leading Tokilo Technologies in building
AI-powered software solutions and scalable
digital products.

</p>


</div>



</div>









{/* TEAM WITHOUT IMAGES */}

<div
className="
mt-16

grid

gap-5

sm:grid-cols-3
"
>


{
teamMembers.map((member)=>{


const Icon = member.icon;


return (

<div

key={member.name}

className="
rounded-3xl

border

border-slate-200

bg-white

p-6

transition

hover:-translate-y-1

dark:border-white/10

dark:bg-white/[0.04]
"

>


<div
className="
flex

h-12

w-12

items-center

justify-center

rounded-xl

bg-[#91BF48]/15

text-[#17233d]

dark:text-[#91BF48]
"
>

<Icon size={24}/>

</div>




<h4
className="
mt-5

font-black

text-[#17233d]

dark:text-white
"
>

{member.name}

</h4>




<p
className="
mt-2

text-sm

text-slate-600

dark:text-slate-300
"
>

{member.role}

</p>



</div>


);


})

}


</div>



</div>


</section>

);

}
