"use client";

export default function TopUtilBar() {
  return (
    <div style={{
      background: 'var(--navy-900)',
      color: 'rgba(255,255,255,0.85)',
      fontSize: '12.5px',
      height: '38px',
      display: 'flex',
      alignItems: 'center',
    }}>
      <div style={{
        maxWidth: 'var(--maxw)',
        margin: '0 auto',
        width: '100%',
        padding: '0 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {[
            { dot: '★', label: '2026년 5월 아카이브' },
            { dot: 'i', label: '사용 가이드' },
            { dot: '⌕', label: '빠른 검색' },
          ].map(({ dot, label }) => (
            <a key={label} href="#" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '5px 12px',
              borderRadius: '999px',
              background: 'rgba(255,255,255,0.08)',
              fontSize: '12px',
              transition: 'background .15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.16)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
            >
              <span style={{
                width: '14px', height: '14px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.15)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '9px',
              }}>{dot}</span>
              {label}
            </a>
          ))}
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          fontSize: '12.5px',
          color: 'rgba(255,255,255,0.75)',
        }}>
          {['홈', '로그인', '설정'].map((item, i) => (
            <span key={item} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              {i > 0 && <span style={{ color: 'rgba(255,255,255,0.25)' }}>|</span>}
              <a href="#" style={{ transition: 'color .15s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
              >{item}</a>
            </span>
          ))}
          <span style={{ color: 'rgba(255,255,255,0.25)' }}>|</span>
          <a href="#" style={{ color: '#fff', fontWeight: 600 }}>KOR</a>
          <span style={{ color: 'rgba(255,255,255,0.25)' }}>|</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            화면크기
            {['+', '−'].map(ch => (
              <span key={ch} style={{
                width: '22px', height: '22px',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: '4px',
                background: 'rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.65)',
                cursor: 'pointer',
              }}>{ch}</span>
            ))}
          </span>
          <span style={{ color: 'rgba(255,255,255,0.25)' }}>|</span>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {['⊞', '◷', '▤', '✕'].map(ic => (
              <span key={ic} style={{
                width: '22px', height: '22px',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: '4px',
                color: 'rgba(255,255,255,0.65)',
                cursor: 'pointer',
              }}>{ic}</span>
            ))}
          </div>
          <span style={{ color: 'rgba(255,255,255,0.25)' }}>|</span>
          <a href="#"
            style={{ transition: 'color .15s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
          >사이트맵</a>
        </div>
      </div>
    </div>
  );
}
