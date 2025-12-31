import React from "react";
import { UserFormDataForm } from "@/pages-components/FormPages/UserFormDataForm";
import { UserJsonForm } from "@/pages-components/FormPages/UserJsonForm";

export default function Form(): React.ReactElement {
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* JSON FORM */}
          <section className="rounded-xl bg-white p-6 shadow-sm">
            <header className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800">
                JSON Payload
              </h2>
              <p className="text-sm text-gray-500">
                Standard application/json request
              </p>
            </header>

            <UserJsonForm />
          </section>

          {/* FORM DATA */}
          <section className="rounded-xl bg-white p-6 shadow-sm">
            <header className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800">
                FormData Payload
              </h2>
              <p className="text-sm text-gray-500">
                multipart/form-data (file upload)
              </p>
            </header>

            <UserFormDataForm />
          </section>
        </div>
      </div>
    </div>
  );
}
