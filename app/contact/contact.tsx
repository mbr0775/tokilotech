"use client";

import {
  Mail,
  Phone,
  ArrowRight,
  Code2,
  Smartphone,
  BrainCircuit,
  Cloud,
  Sparkles,
} from "lucide-react";


const services = [
  {
    icon: Code2,
    title: "Web Applications",
  },
  {
    icon: Smartphone,
    title: "Mobile Applications",
  },
  {
    icon: BrainCircuit,
    title: "AI Solutions",
  },
  {
    icon: Cloud,
    title: "Cloud Systems",
  },
];


export default function Contact() {

  return (

<section
id="contact"
className="
relative
overflow-hidden
bg-[#08101F]

px-5
py-20

sm:px-8
lg:px-12
lg:py-32
"
>


<div
className="
absolute
right-0
top-0

h-[500px]
w-[500px]

rounded-full

bg-[#91BF48]/20

blur-[120px]
"
/>



<div
className="
relative
mx-auto
max-w-7xl
"
>



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

text-[#b8dc82]
"
>

<Sparkles size={15}/>

Contact Tokilo

</div>




<h2
className="
mt-6

text-4xl
font-black
tracking-tight

text-white

sm:text-6xl
"
>

Let&apos;s build something

<span
className="
block
text-[#91BF48]
"
>

amazing together

</span>


</h2>




<p
className="
mt-5

text-base
leading-7

text-slate-300
"
>

Have an idea, product requirement, or digital
challenge? Our team is ready to help you create
the right solution.

</p>


</div>






<div
className="
mt-14

grid

gap-8

lg:grid-cols-[0.8fr_1.2fr]
"
>




{/* CONTACT INFO */}

<div
className="
rounded-[2rem]

border

border-white/10

bg-white/[0.05]

p-7

backdrop-blur-xl
"
>


<h3
className="
text-2xl
font-black
text-white
"
>

Talk with us

</h3>



<p
className="
mt-3

text-sm
leading-6

text-slate-300
"
>

Discuss your software, AI, or digital
transformation project.

</p>




<div
className="
mt-8

space-y-4
"
>


<div
className="
flex
items-center
gap-4

rounded-2xl

border

border-white/10

bg-white/[0.04]

p-4
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

bg-[#91BF48]

text-[#17233d]
"
>

<Phone size={22}/>

</div>


<div>

<p
className="
text-xs
font-bold
uppercase

text-slate-400
"
>

Phone

</p>


<p
className="
mt-1

font-bold

text-white
"
>

+94 705373833

</p>


</div>


</div>





<div
className="
flex
items-center
gap-4

rounded-2xl

border

border-white/10

bg-white/[0.04]

p-4
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

bg-[#91BF48]

text-[#17233d]
"
>

<Mail size={22}/>

</div>



<div>

<p
className="
text-xs
font-bold
uppercase

text-slate-400
"
>

Email

</p>


<p
className="
mt-1

break-all

font-bold

text-white
"
>

mubassirnasar@gmail.com

</p>


</div>


</div>



</div>






<div
className="
mt-8
"
>


<p
className="
text-sm
font-black

uppercase

tracking-wider

text-[#91BF48]
"
>

We build

</p>



<div
className="
mt-4

grid

grid-cols-2

gap-3
"
>


{
services.map((service)=>{

const Icon = service.icon;


return (

<div
key={service.title}

className="
rounded-xl

border

border-white/10

p-3

text-sm

font-bold

text-white
"
>

<Icon
size={18}
className="
mb-2
text-[#91BF48]
"
/>


{service.title}


</div>


);


})
}


</div>


</div>



</div>








{/* FORM */}


<form
className="
rounded-[2rem]

bg-white

p-7

shadow-2xl
"
>


<h3
className="
text-2xl

font-black

text-[#17233d]
"
>

Start your project

</h3>



<p
className="
mt-2

text-sm

text-slate-500
"
>

Tell us about your requirements.

</p>





<div
className="
mt-6

space-y-4
"
>


<input
placeholder="Your name"

className="
w-full

rounded-xl

border

border-slate-200

px-4

py-3

outline-none

focus:border-[#91BF48]
"
/>




<input
placeholder="Email address"

className="
w-full

rounded-xl

border

border-slate-200

px-4

py-3

outline-none

focus:border-[#91BF48]
"
/>





<select

className="
w-full

rounded-xl

border

border-slate-200

px-4

py-3

text-slate-500

outline-none

focus:border-[#91BF48]
"

>

<option>
Select service
</option>

<option>
Web Application
</option>

<option>
Mobile Application
</option>

<option>
AI Solution
</option>

<option>
Cloud System
</option>

</select>





<textarea

placeholder="Tell us about your project"

rows={5}

className="
w-full

rounded-xl

border

border-slate-200

px-4

py-3

outline-none

focus:border-[#91BF48]
"

/>




<button

type="submit"

className="
group

flex

w-full

items-center

justify-center

gap-2

rounded-xl

bg-[#17233d]

py-4

font-black

text-white

transition

hover:bg-[#263859]
"

>

Send inquiry

<ArrowRight
size={18}

className="
transition

group-hover:translate-x-1
"
/>


</button>



</div>


</form>





</div>



</div>


</section>


  );

}