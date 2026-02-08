import { useEffect, useState } from "react";
import {
  getAllFarmers,
  deleteFarmer,
} from "../../api/farmer.api";
import AddFarmerModal from "./AddFarmerModal";


function FarmerList() {
  // State ها
  const [farmers, setFarmers] = useState([]);
  const [page, setPage] = useState(1);
  const [size] = useState(25);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  
  // گرفتن لیست کشاورزها
  const fetchFarmers = async () => {
    try {
      setLoading(true);

      const data = await getAllFarmers({
        page,
        size,
        search,
      });

      setFarmers(data.items);
      setTotal(data.total);
    } finally {
      setLoading(false);
    }
  };

  // اجرا هنگام تغییر page یا search
  useEffect(() => {
    fetchFarmers();
  }, [page, search]);

  // حذف کشاورز
  const handleDelete = async (nationalId, fullName) => {
    if (!confirm(`حذف کشاورز «${fullName}»؟`)) return;

    try {
      await deleteFarmer(nationalId);
      fetchFarmers();
      alert("کشاورز با موفقیت حذف شد");
    } catch (error) {
      console.error(error);

      if (error.response?.status === 500) {
        alert(
          "امکان حذف این کشاورز وجود ندارد.\n" +
          "این کشاورز دارای اطلاعات وابسته (فاکتور، پرداخت یا ضمانت) است."
        );
      } else {
        alert("خطایی در حذف کشاورز رخ داد");
      }
    }
  };

        

  const totalPages = Math.ceil(total / size);

  // UI
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-800">
          کشاورزان
        </h1>

        <button onClick={() => setIsAddOpen(true)} className="bg-emerald-600 text-white px-4 py-2 rounded-xl">
          ثبت کشاورز جدید
        </button>
      </div>

      {/* Search */}
      <input
        value={search}
        onChange={(e) => {
          setPage(1);
          setSearch(e.target.value);
        }}
        placeholder="جستجوی کشاورز..."
        className="w-72 px-4 py-2 rounded-xl border"
      />

      {/* Table */}
      <div className="bg-white rounded-xl shadow">
        <div className="overflow-x-auto">
          <table className="min-w-225 w-full text-sm text-right">
            <thead className="bg-slate-100 text-slate-600">
              <tr>
                <th className="p-3 whitespace-nowrap">نام و نام خانوادگی</th>
                <th className="p-3 whitespace-nowrap">کد ملی</th>
                <th className="p-3 whitespace-nowrap">شماره تماس</th>
                <th className="p-3 whitespace-nowrap">تاریخ ایجاد</th>
                <th className="p-3 whitespace-nowrap">عملیات</th>
              </tr>
            </thead>

            <tbody>
              {loading && (
                <tr>
                  <td colSpan="5" className="p-6 text-center">
                    در حال بارگذاری...
                  </td>
                </tr>
              )}

              {!loading && farmers.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-6 text-center text-slate-400">
                    داده‌ای وجود ندارد
                  </td>
                </tr>
              )}

              {farmers.map((item) => (
                <tr key={item.national_id} className="border-t">
                  <td className="p-3 whitespace-nowrap">
                    {item.full_name}
                  </td>

                  <td className="p-3 whitespace-nowrap">
                    {item.national_id}
                  </td>

                  <td className="p-3 whitespace-nowrap">
                    {item.phone_number ?? "-"}
                  </td>

                  <td className="p-3 whitespace-nowrap">
                    {item.created_at}
                  </td>

                  <td className="p-3 whitespace-nowrap space-x-3 space-x-reverse">
                    <button className="text-blue-600">
                      ویرایش
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(
                          item.national_id,
                          item.full_name
                        )
                      }
                      className="text-red-600"
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


      {/* Pagination */}

      {totalPages > 1 && (
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded ${
              page === i + 1
                ? "bg-emerald-600 text-white"
                : "bg-slate-200"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    )}
    <AddFarmerModal
          isOpen={isAddOpen}
          onClose={() => setIsAddOpen(false)}
          onSuccess={fetchFarmers}
        />
    </div>

  );
}

export default FarmerList;