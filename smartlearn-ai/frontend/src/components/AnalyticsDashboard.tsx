const AnalyticsDashboard = () => {
  return (
    <div>
      <h2>لوحة تحليلات الأداء</h2>
      <p className="subtitle">عرض سريع لأهم مؤشرات التعلم ونقاط التحسين.</p>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>88%</h3>
          <p>معدل النجاح العام</p>
        </div>
        <div className="stat-card">
          <h3>24</h3>
          <p>جلسات التعلم هذا الأسبوع</p>
        </div>
        <div className="stat-card">
          <h3>3</h3>
          <p>المواد التي تحتاج دعم</p>
        </div>
        <div className="stat-card">
          <h3>74%</h3>
          <p>نسبة التفاعل داخل المنصة</p>
        </div>
      </div>
      <div className="chart-placeholder">رسم بياني متقدم جاهز للربط بـ API</div>
    </div>
  );
};

export default AnalyticsDashboard;
