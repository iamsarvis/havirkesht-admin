import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Navigate } from "react-router-dom";
import { login } from "../../api/auth.api";
import { decodeJWT } from "../../utils/auth";

const schema = Yup.object({
  username: Yup.string().required("نام کاربری الزامی است"),
  password: Yup.string().required("رمز عبور الزامی است"),
});


function Login() {
    // if User Loged in
    const token = localStorage.getItem("access_token");
    if (token) {
        return <Navigate to="/" replace />;
    }


  return (
    <div
      dir="rtl"
      className="min-h-screen flex items-center justify-center
      bg-linear-to-br from-emerald-600 via-green-600 to-teal-600 px-4"
    >
      {/* Card */}
      <div className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8">
        {/* Brand */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 w-16 h-16 rounded-full
            bg-linear-to-br from-emerald-500 to-teal-500
            flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            S
          </div>

          <h1 className="text-2xl font-extrabold text-slate-800">
            پنل مدیریت هاویرکشت
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            سامانه مدیریت هوشمند کشاورزی
          </p>
        </div>

        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={schema}
          onSubmit={async (values, { setSubmitting, setStatus }) => {
            try {
              const data = await login(values);

              // ذخیره توکن‌ها
              localStorage.setItem("access_token", data.access_token);
              localStorage.setItem("refresh_token", data.refresh_token);

              // decode jwt
              const decoded = decodeJWT(data.access_token);

              if (decoded) {
                const user = {
                  user_id: decoded.user_id,
                  fullname: decoded.fullname,
                  role_id: decoded.role_id,
                };

                localStorage.setItem("user", JSON.stringify(user));
              }

              setStatus({ success: "خوش آمدید 🌱" });

              setTimeout(() => {
                window.location.reload();
              }, 2000);

            } catch (error) {
              setStatus({
                error:
                  error.response?.data?.detail ||
                  "نام کاربری یا رمز عبور اشتباه است",
              });
            } finally {
              setSubmitting(false);
            }
        }}
        >
          {({ isSubmitting, status }) => (
            <Form className="space-y-5">
              {/* Messages */}
              {status?.success && (
                <div className="bg-emerald-100 text-emerald-700 text-sm p-3 rounded-xl">
                  {status.success}
                </div>
              )}

              {status?.error && (
                <div className="bg-red-100 text-red-700 text-sm p-3 rounded-xl">
                  {status.error}
                </div>
              )}

              {/* Username */}
              <div>
                <label className="block text-sm text-slate-700 mb-1">
                  نام کاربری
                </label>
                <Field
                  name="username"
                  type="text"
                  className="
                    w-full rounded-xl border border-slate-300
                    px-4 py-2
                    focus:outline-none focus:ring-2 focus:ring-emerald-500
                    transition
                  "
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm text-slate-700 mb-1">
                  رمز عبور
                </label>
                <Field
                  name="password"
                  type="password"
                  className="
                    w-full rounded-xl border border-slate-300
                    px-4 py-2
                    focus:outline-none focus:ring-2 focus:ring-emerald-500
                    transition
                  "
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="
                  w-full py-3 rounded-xl text-white font-bold
                  bg-linear-to-r from-emerald-500 to-teal-500
                  hover:from-emerald-600 hover:to-teal-600
                  active:scale-[0.98]
                  transition-all
                  disabled:opacity-60
                "
              >
                {isSubmitting ? "در حال ورود..." : "ورود به سامانه"}
              </button>
            </Form>
          )}
        </Formik>

        <p className="text-xs text-center text-slate-400 mt-8">
          Havirkesht © 2026
        </p>
      </div>
    </div>
  );
}

export default Login;
