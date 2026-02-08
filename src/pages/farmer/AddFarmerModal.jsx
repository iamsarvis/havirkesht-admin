import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createFarmer } from "../../api/farmer.api";

function AddFarmerModal({ isOpen, onClose, onSuccess }) {
  if (!isOpen) return null;

  // ✅ Validation
  const validationSchema = Yup.object({
    full_name: Yup.string().required("نام و نام خانوادگی الزامی است"),

    national_id: Yup.string()
      .length(10, "کد ملی باید ۱۰ رقم باشد")
      .required("کد ملی الزامی است"),

    phone_number: Yup.string()
      .matches(/^09\d{9}$/, "شماره موبایل باید با 09 شروع شود و 11 رقم باشد")
      .nullable(),

    sheba_number_1: Yup.string()
      .matches(/^IR\d{24}$/, "شماره شبا باید با IR شروع شده و 26 کاراکتر باشد")
      .required("شماره شبا الزامی است"),

    father_name: Yup.string().nullable(),
    address: Yup.string().nullable(),
  });

  // ✅ Initial values
  const initialValues = {
    full_name: "",
    national_id: "",
    phone_number: "",
    father_name: "",
    address: "",
    sheba_number_1: "",
  };

  // ✅ Submit
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const payload = Object.fromEntries(
        Object.entries(values).filter(([_, value]) => value !== "")
      );

      await createFarmer(payload);

      alert("کشاورز با موفقیت ثبت شد ✅");
      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);

      if (error.response?.status === 422) {
        alert("اطلاعات وارد شده معتبر نیست");
      } else {
        alert("خطا در ثبت کشاورز");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      {/* Card */}
      <div className="bg-white w-full max-w-xl rounded-xl shadow-lg flex flex-col max-h-[85vh] overflow-hidden">

        {/* ✅ Header (Sticky) */}
        <div className="flex items-center justify-between px-6 py-4 border-b bg-white sticky top-0 z-10">
          <h2 className="text-lg font-bold">
            ثبت کشاورز جدید
          </h2>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-800 text-xl"
          >
            ✕
          </button>
        </div>

        {/* ✅ Formik */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <>
              {/* ✅ Scrollable Body */}
              <div className="flex-1 overflow-auto px-6 py-4">
                <Form id="farmerForm" className="space-y-4">

                  <div>
                    <label className="block text-sm mb-1">
                      نام و نام خانوادگی
                    </label>
                    <Field
                      name="full_name"
                      className="w-full border rounded-lg px-3 py-2"
                    />
                    <ErrorMessage
                      name="full_name"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-1">
                      کد ملی
                    </label>
                    <Field
                      name="national_id"
                      className="w-full border rounded-lg px-3 py-2"
                    />
                    <ErrorMessage
                      name="national_id"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-1">
                      نام پدر
                    </label>
                    <Field
                      name="father_name"
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-1">
                      شماره تماس
                    </label>
                    <Field
                      name="phone_number"
                      className="w-full border rounded-lg px-3 py-2"
                    />
                    <ErrorMessage
                      name="phone_number"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-1">
                      شماره شبا
                    </label>
                    <Field
                      name="sheba_number_1"
                      className="w-full border rounded-lg px-3 py-2"
                      placeholder="IRxxxxxxxxxxxxxxxxxxxxxx"
                    />
                    <ErrorMessage
                      name="sheba_number_1"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-1">
                      آدرس
                    </label>
                    <Field
                      as="textarea"
                      name="address"
                      rows="3"
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>

                </Form>
              </div>

              {/* ✅ Footer (Sticky) */}
              <div className="flex justify-end gap-3 px-6 py-4 border-t bg-white sticky bottom-0">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg border"
                >
                  انصراف
                </button>

                <button
                  type="submit"
                  form="farmerForm"
                  disabled={isSubmitting}
                  className="px-4 py-2 rounded-lg bg-emerald-600 text-white disabled:opacity-50"
                >
                  {isSubmitting ? "در حال ثبت..." : "ثبت"}
                </button>
              </div>
            </>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default AddFarmerModal;