// app/terms-and-conditions/page.tsx

export const metadata = {
  title: "Terms & Conditions | Tokilo Technologies",
  description:
    "Tokilo Technologies Terms and Conditions for using Tokilo Business Hub.",
};


export default function TermsAndConditionsPage() {

  const sections = [

    {
      icon: "📋",
      title: "Acceptance of Terms",
      content:
        "By accessing or using Tokilo Business Hub, you agree to comply with these Terms and Conditions. If you do not agree with these terms, please do not use our services.",
    },


    {
      icon: "🚀",
      title: "About Tokilo Business Hub",
      content:
        "Tokilo Business Hub is a business operating ecosystem designed to help organizations manage workflows, projects, communication, and business operations.",
    },


    {
      icon: "👤",
      title: "User Accounts",
      content:
        "Users are responsible for maintaining the confidentiality of their account information and ensuring that provided information is accurate and up to date.",
    },


    {
      icon: "🏢",
      title: "Business Data",
      content:
        "Users remain responsible for the business information they submit through Tokilo. Users should only upload information that they have the right to use.",
    },


    {
      icon: "🔐",
      title: "Account Security",
      content:
        "Users must protect their login credentials and immediately notify Tokilo Technologies if they suspect unauthorized access to their account.",
    },


    {
      icon: "🗑️",
      title: "Account Termination",
      content:
        "Users may delete their account through the Tokilo application. Tokilo Technologies may restrict access when required to protect platform security or comply with legal obligations.",
    },


    {
      icon: "⚖️",
      title: "Limitation of Liability",
      content:
        "Tokilo Technologies provides the platform on an as-available basis and does not guarantee that the service will always be uninterrupted or error-free.",
    },


    {
      icon: "🔄",
      title: "Changes to Terms",
      content:
        "Tokilo Technologies may update these Terms and Conditions when improvements, legal requirements, or service changes occur.",
    },


  ];


  return (

    <main className="
      min-h-screen
      bg-gradient-to-b
      from-slate-50
      via-white
      to-white
      px-6
      py-16
    ">


      <div className="
        mx-auto
        max-w-5xl
      ">


        <section className="
          rounded-3xl
          bg-gradient-to-r
          from-cyan-600
          to-blue-700
          p-10
          text-white
          shadow-xl
        ">


          <div className="
            mb-5
            flex
            items-center
            gap-3
          ">

            <div className="
              rounded-xl
              bg-white/20
              p-3
              text-3xl
            ">
              📄
            </div>


            <span className="
              text-sm
              uppercase
              tracking-wider
              opacity-90
            ">
              Tokilo Technologies
            </span>

          </div>



          <h1 className="
            text-4xl
            font-bold
            md:text-5xl
          ">
            Terms & Conditions
          </h1>



          <p className="
            mt-5
            max-w-2xl
            text-lg
            text-white/90
          ">
            Please review the terms that govern your
            use of Tokilo Business Hub.
          </p>



          <p className="
            mt-6
            text-sm
            text-white/80
          ">
            Last updated: September 2026
          </p>


        </section>



        <section className="
          mt-10
          space-y-5
        ">


          {sections.map((section)=>(

            <article

              key={section.title}

              className="
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-7
                shadow-sm
                transition
                hover:shadow-lg
              "

            >


              <div className="
                flex
                gap-5
              ">


                <div className="
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-cyan-50
                  text-2xl
                ">

                  {section.icon}

                </div>



                <div>

                  <h2 className="
                    text-xl
                    font-bold
                    text-slate-900
                  ">
                    {section.title}
                  </h2>



                  <p className="
                    mt-3
                    leading-7
                    text-slate-600
                  ">
                    {section.content}
                  </p>


                </div>


              </div>


            </article>


          ))}


        </section>



        <section className="
          mt-8
          rounded-3xl
          bg-slate-900
          p-8
          text-white
        ">


          <h2 className="
            text-2xl
            font-bold
          ">
            Contact Tokilo Technologies
          </h2>



          <p className="
            mt-3
            text-slate-300
          ">
            For questions regarding these Terms and Conditions,
            contact us through:
          </p>



          <p className="
            mt-5
            text-sm
          ">
            Website:
            <br />
            https://www.tokilotech.com
          </p>


        </section>


      </div>


    </main>

  );

}