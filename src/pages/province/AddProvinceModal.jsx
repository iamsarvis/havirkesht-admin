import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createProvince } from "../../api/province.api";

function AddProvinceModal({ isOpen, onClose, onSuccess }) {
  if (!isOpen) return null;

  const validationSchema = Yup.object({
    province: Yup.string()
      .required("نام استان الزامی است")
      .min(2, "نام استان حداقل ۲ حرف باشد"),
  });

    const initialValues = {
        province: "",
    };


  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await createProvince(values);
      resetForm();
      onClose();
      onSuccess?.();
    } catch (error) {
      alert("خطا در ثبت استان");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b bg-slate-50">
          <h2 className="text-lg font-bold text-slate-800">
            ثبت استان جدید
          </h2>
        </div>

        {/* Form */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col">
              <div className="p-6 space-y-4">
                <div>
                  <label className="block mb-1 text-sm font-medium">
                    نام استان
                  </label>
                  <Field
                    name="province"
                    className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="مثلاً: اصفهان"
                  />
                  <ErrorMessage
                    name="province"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t bg-slate-50 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-slate-200"
                >
                  انصراف
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white disabled:opacity-50"
                >
                  {isSubmitting ? "در حال ثبت..." : "ثبت استان"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default AddProvinceModal;