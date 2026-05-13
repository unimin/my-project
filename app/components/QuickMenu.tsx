"use client";

const menuItems = [
  { label: "자료 추가하기", badge: "N" },
  { label: "최근 본 항목" },
  { label: "즐겨찾기" },
  { label: "태그 관리" },
  { label: "메모 작성" },
  { label: "캘린더" },
  { label: "검색 기록" },
  { label: "백업/내보내기" },
  { label: "설정", muted: true },
];

export default function QuickMenu() {
  return (
    <div style={{
      background: '#fff',
      border: '1px solid var(--line)',
      borderRadius: 'var(--radius)',
      overflow: 'hidden',
    }}>
      <div style={{
        background: 'var(--navy-900)',
        color: '#fff',
        padding: '16px 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        fontSize: '15px', fontWeight: 700, letterSpacing: '-0.01em',
      }}>
        Quick 메뉴
        <span style={{ fontSize: '11px', opacity: 0.7 }}>▲</span>
      </div>
      <div style={{ padding: '4px 0' }}>
        {menuItems.map((item, i) => (
          <a key={item.label} href="#" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '13px 20px',
            borderBottom: i < menuItems.length - 1 ? '1px solid var(--line)' : 'none',
            fontSize: '14px',
            color: item.muted ? 'var(--ink-500)' : 'var(--ink-900)',
            fontWeight: 500,
            transition: 'background .15s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'var(--navy-50)';
            e.currentTarget.style.color = 'var(--navy-700)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = item.muted ? 'var(--ink-500)' : 'var(--ink-900)';
          }}
          >
            {item.label}
            {item.badge ? (
              <span style={{
                width: '16px', height: '16px',
                background: '#c83737', color: '#fff', borderRadius: '50%',
                fontSize: '9px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontFamily: 'Inter, sans-serif',
              }}>{item.badge}</span>
            ) : (
              <span style={{ color: 'var(--ink-500)', fontSize: '12px' }}>›</span>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}
