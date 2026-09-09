// app/privacy-policy/page.tsx

export const metadata = {
  title: "Privacy Policy | Tokilo Technologies",
  description:
    "Tokilo Technologies Privacy Policy explains how we collect, use, protect, and manage your information.",
};


export default function PrivacyPolicyPage() {

  const sections = [
    {
      icon: "👤",
      title: "Information We Collect",
      content:
        "When you use Tokilo Business Hub, we may collect account information such as your name, email address, company details, phone number, and business information that you provide through the application.",
    },

    {
      icon: "⚙️",
      title: "How We Use Your Information",
      content:
        "We use your information to provide Tokilo services, authenticate your account, manage business workflows, improve application performance, communicate important updates, and provide customer support.",
    },

    {
      icon: "🔒",
      title: "Data Storage & Security",
      content:
        "Tokilo uses secure cloud infrastructure and industry-standard security practices to protect user information from unauthorized access, misuse, or loss.",
    },

    {
      icon: "☁️",
      title: "Third-Party Services",
      content:
        "Tokilo uses trusted technology providers such as Supabase for authentication and database services and Firebase services for application notifications.",
    },

    {
      icon: "🗑️",
      title: "Account Deletion",
      content:
        "Users can permanently delete their Tokilo account directly from the application. Account deletion removes the associated user account according to our deletion process.",
    },

    {
      icon: "👶",
      title: "Children's Privacy",
      content:
        "Tokilo Business Hub is designed for business users and is not intended for children below the applicable legal age.",
    },

    {
      icon: "🔄",
      title: "Policy Updates",
      content:
        "We may update this Privacy Policy when necessary. Any changes will be published on this page with an updated revision date.",
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


        {/* Hero */}

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
            flex
            items-center
            gap-3
            mb-5
          ">

            <div className="
              rounded-xl
              bg-white/20
              p-3
              text-3xl
            ">
              🛡️
            </div>


            <span className="
              text-sm
              font-medium
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
            Privacy Policy
          </h1>



          <p className="
            mt-5
            max-w-2xl
            text-lg
            text-white/90
          ">
            Your privacy and business data security
            are important to us. Learn how Tokilo
            collects, uses, and protects your information.
          </p>



          <p className="
            mt-6
            text-sm
            text-white/80
          ">
            Last updated: September 2026
          </p>


        </section>



        {/* Content Cards */}

        <section className="
          mt-10
          space-y-5
        ">


          {sections.map((section) => (

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



        {/* Contact */}

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
            If you have questions about this Privacy Policy,
            please contact us.
          </p>



          <div className="
            mt-5
            space-y-2
            text-sm
          ">

            <p>
              Website:
              {" "}
              https://www.tokilotech.com
            </p>


            <p>
              Company:
              {" "}
              Tokilo Technologies
            </p>


          </div>


        </section>


      </div>


    </main>

  );

}