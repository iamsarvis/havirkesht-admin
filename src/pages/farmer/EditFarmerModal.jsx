import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { updateFarmer } from "../../api/farmer.api";

function EditFarmerModal({ isOpen, onClose, onSuccess, farmer }) {
  if (!isOpen || !farmer) return null;

  // Validation (مثل Add)
  const validationSchema = Yup.object({
    full_name: Yup.string().required("نام و نام خانوادگی الزامی است"),

    phone_number: Yup.string()
      .matches(/^09\d{9}$/, "شماره موبایل معتبر نیست")
      .nullable(),

    sheba_number_1: Yup.string()
        .matches(/^\d{24}$/, "شماره شبا باید ۲۴ رقم عدد باشد")
        .required("شماره شبا الزامی است"),

  });

  // Initial values (prefill)
  const initialValues = {
    full_name: farmer.full_name || "",
    phone_number: farmer.phone_number || "",
    father_name: farmer.father_name || "",
    address: farmer.address || "",
    sheba_number_1: farmer.sheba_number_1 || "",
  };

  // Submit
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const payload = Object.fromEntries(
        Object.entries(values).filter(([_, v]) => v !== "")
      );

      await updateFarmer(farmer.national_id, payload);

      alert("ویرایش با موفقیت انجام شد.");
      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      alert("خطا در ویرایش کشاورز");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-xl rounded-xl shadow-lg flex flex-col max-h-[85vh] overflow-hidden">

        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-lg font-bold">
            ویرایش اطلاعات کشاورز
          </h2>
          <button
            onClick={onClose}
            className="text-xl text-slate-500 hover:text-slate-800"
          >
            ✕
          </button>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <>
              {/* Body */}
              <div className="flex-1 overflow-auto px-6 py-4">
                <Form id="editFarmerForm" className="space-y-4">

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
                      rows="3"
                      name="address"
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>

                </Form>
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-3 px-6 py-4 border-t">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg border"
                >
                  انصراف
                </button>

                <button
                  type="submit"
                  form="editFarmerForm"
                  disabled={isSubmitting}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-50"
                >
                  {isSubmitting ? "در حال ذخیره..." : "ذخیره تغییرات"}
                </button>
              </div>
            </>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default EditFarmerModal;