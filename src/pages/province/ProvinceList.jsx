import { useEffect, useState } from "react";
import { getProvinces, deleteProvince } from "../../api/province.api";

function ProvinceList() {
  const [provinces, setProvinces] = useState([]);
  const [page, setPage] = useState(1);
  const [size] = useState(10);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchProvinces = async () => {
    try {
      setLoading(true);
      const data = await getProvinces({ page, size, search });

      setProvinces(data.items);
      setTotal(data.total);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProvinces();
  }, [page, search]);

  const handleDelete = async (name) => {
    if (!confirm(`حذف استان «${name}»؟`)) return;

    await deleteProvince(name);
    fetchProvinces();
  };

  const totalPages = Math.ceil(total / size);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-800">استان‌ها</h1>

        <button className="bg-emerald-600 text-white px-4 py-2 rounded-xl">
          ثبت استان جدید
        </button>
      </div>

      {/* Search */}
      <input
        value={search}
        onChange={(e) => {
          setPage(1);
          setSearch(e.target.value);
        }}
        placeholder="جستجوی استان..."
        className="w-64 px-4 py-2 rounded-xl border"
      />

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm text-right">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="p-3">نام استان</th>
              <th className="p-3">تاریخ ایجاد</th>
              <th className="p-3">عملیات</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan="3" className="p-6 text-center">
                  در حال بارگذاری...
                </td>
              </tr>
            )}

            {!loading && provinces.length === 0 && (
              <tr>
                <td colSpan="3" className="p-6 text-center text-slate-400">
                  داده‌ای وجود ندارد
                </td>
              </tr>
            )}

            {provinces.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-3">{item.name}</td>
                <td className="p-3">
                  {new Date(item.created_at).toLocaleDateString("fa-IR")}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleDelete(item.name)}
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex gap-2">
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
    </div>
  );
}

export default ProvinceList;
