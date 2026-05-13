const stats = [
  { label: "TOTAL ARCHIVE", value: "1,284", unit: "items", trend: "↑ 12", trendText: "이번 주 추가" },
  { label: "BOOKMARKS", value: "342", unit: "links", trend: "↑ 5", trendText: "이번 주 추가" },
  { label: "DOCUMENTS", value: "68", unit: "files", trend: null, trendText: "2.1 GB 사용 중" },
  { label: "UPCOMING", value: "7", unit: "events", trend: null, trendText: "다음 7일 이내" },
];

export default function StatsStrip() {
  return (
    <section style={{ background: 'var(--navy-900)', color: '#fff', padding: '32px 32px', marginTop: '40px' }}>
      <div style={{
        maxWidth: 'var(--maxw)',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
      }}>
        {stats.map((stat, i) => (
          <div key={stat.label} style={{
            padding: '0 24px',
            borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.12)' : 'none',
            paddingLeft: i === 0 ? 0 : '24px',
          }}>
            <div style={{
              fontSize: '11px', fontWeight: 600,
              color: 'rgba(255,255,255,0.6)',
              letterSpacing: '0.16em', textTransform: 'uppercase',
              fontFamily: 'Inter, sans-serif', marginBottom: '8px',
            }}>{stat.label}</div>
            <div style={{
              fontSize: '32px', fontWeight: 700,
              letterSpacing: '-0.025em', fontFamily: 'Inter, sans-serif',
            }}>
              {stat.value}
              <span style={{ fontSize: '14px', fontWeight: 500, marginLeft: '4px', color: 'rgba(255,255,255,0.65)' }}>
                {stat.unit}
              </span>
            </div>
            <div style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.6)', marginTop: '4px', fontFamily: 'Inter, sans-serif' }}>
              {stat.trend && <span style={{ color: '#82d8a3', fontWeight: 600 }}>{stat.trend} </span>}
              {stat.trendText}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
