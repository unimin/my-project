"use client";

const links = ["개인정보처리방침", "이용약관", "백업 정책", "문의"];

export default function Footer() {
  return (
    <footer style={{
      background: '#1a2540',
      color: 'rgba(255,255,255,0.6)',
      padding: '36px 32px',
      fontSize: '13px',
    }}>
      <div style={{
        maxWidth: 'var(--maxw)',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div style={{ display: 'flex', gap: '22px' }}>
          {links.map(link => (
            <a key={link} href="#"
              style={{ transition: 'color .15s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
            >{link}</a>
          ))}
        </div>
        <div>© 2026 reference. 나만의 자료 아카이브.</div>
      </div>
    </footer>
  );
}
