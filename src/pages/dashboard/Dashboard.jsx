// src/dashboard/Dashboard.jsx
import { useEffect, useState } from "react";
import { getFullReport } from "../../api/dashboard.api";

function Dashboard() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const data = await getFullReport(13);
        setReport(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, []);

  if (loading) return <div className="p-6">در حال دریافت گزارش...</div>;
  if (!report) return <div className="p-6">خطا در دریافت اطلاعات</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card title="مانده فعلی در حساب پیمانکار" value={`${report.current_contractor_remaining_balance.toLocaleString()} تومان`} />
        <Card title="تعداد قرارداد کشاورزان" value={report.farmers_commitment_count} />
        <Card title="کل تناژ تحویلی کشاورزان" value={`${report.total_delivered_tonnage.toLocaleString()} تن`} />
        <Card title="جمع بدهی به کشاورزان" value={`${report.total_farmers_debt.toLocaleString()} تومان`} />
        <Card title="جمع طلب از کشاورزان" value={`${report.total_farmers_receivable.toLocaleString()} تومان`} />
        <Card title="مانده تسویه کشاورزان" value={`${report.farmers_remaining_settlement.toLocaleString()} تومان`} />
        <Card title="کارمزد پیمانکار (۱٪)" value={`${report.contractor_fee.toLocaleString()} تومان`} />
        <Card title="سود پیمانکار از بذر" value={`${report.contractor_seed_profit.toLocaleString()} تومان`} />
        <Card title="سود پیمانکار از سم" value={`${report.contractor_pesticide_profit.toLocaleString()} تومان`} />
        <Card title="وضعیت کلی پیمانکار" value={`${report.overall_contractor_status.toLocaleString()} تومان`} />
        <Card title="سود پیمانکار از سم (نهایی)" value={`${report.contractor_pesticide_profit.toLocaleString()} تومان`} />
      </div>

      <div className="text-xs text-slate-400 text-center">
        تاریخ تولید گزارش: {report.report_generated_at}
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <p className="text-sm text-slate-500">{title}</p>
      <p className="mt-2 text-xl font-bold text-slate-800">{value}</p>
    </div>
  );
}

export default Dashboard;
