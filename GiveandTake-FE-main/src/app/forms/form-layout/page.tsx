import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ContactForm from "@/components/Forms/ContactForm";
import SignInForm from "@/components/Forms/SignInForm";
import SignUpForm from "@/components/Forms/SignUpForm";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js Form Layout | Give&Take - Next.js Dashboard Template",
  description:
    "This is Next.js Form Layout page for Give&Take - Next.js Tailwind CSS Admin Dashboard Template",
};

const FormLayout = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="FormLayout" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        {/* <div className="flex flex-col gap-9">
          <UserEditForm  />
        </div> */}
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <ContactForm />
        </div>

        <div className="flex flex-col gap-9">
          {/* <!-- Sign In Form --> */}
          <SignInForm />

          {/* <!-- Sign Up Form --> */}
          <SignUpForm />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default FormLayout;
