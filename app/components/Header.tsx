"use client";

import { useState } from "react";

const navItems = ["안내", "소통마당", "알림마당", "위원활동", "자료실", "소개"];

export default function Header() {
  const [activeNav, setActiveNav] = useState("소통마당");

  return (
    <header style={{ background: '#fff', borderBottom: '1px solid var(--line)' }}>
      <nav style={{
        maxWidth: 'var(--maxw)',
        margin: '0 auto',
        padding: '0 32px',
        height: '84px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Brand */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '44px', height: '44px',
            border: '1.5px solid var(--navy-900)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute',
              inset: '4px',
              border: '1px solid var(--navy-900)',
            }} />
            <span style={{
              position: 'relative',
              fontWeight: 700,
              color: 'var(--navy-900)',
              fontSize: '14px',
              letterSpacing: '0.02em',
              fontFamily: 'Inter, sans-serif',
            }}>R</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
            <span style={{
              fontSize: '20px',
              fontWeight: 700,
              color: 'var(--navy-900)',
              letterSpacing: '-0.02em',
            }}>reference</span>
            <span style={{
              fontSize: '10.5px',
              fontWeight: 500,
              color: 'var(--ink-500)',
              letterSpacing: '0.16em',
              marginTop: '3px',
            }}>PERSONAL ARCHIVE</span>
          </div>
        </a>

        {/* Nav menu */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {navItems.map(item => (
            <button
              key={item}
              onClick={() => setActiveNav(item)}
              style={{
                padding: '0 26px',
                height: '84px',
                display: 'flex',
                alignItems: 'center',
                fontWeight: 600,
                fontSize: '16px',
                color: activeNav === item ? 'var(--navy-700)' : 'var(--ink-900)',
                background: 'transparent',
                border: 0,
                position: 'relative',
                transition: 'color .15s',
                cursor: 'pointer',
              }}
            >
              {item}
              {activeNav === item && (
                <span style={{
                  position: 'absolute',
                  bottom: '-1px',
                  left: '12px', right: '12px',
                  height: '2px',
                  background: 'var(--navy-700)',
                }} />
              )}
            </button>
          ))}
        </div>

        {/* Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            fontSize: '11px',
            lineHeight: 1.35,
            color: 'var(--ink-700)',
            textAlign: 'right',
            fontWeight: 500,
          }}>
            나의 정보를 정리하는<br />
            <strong style={{ color: 'var(--navy-900)', fontWeight: 700 }}>나만의 아카이브</strong>
          </div>
          <button
            aria-label="검색"
            style={{
              width: '42px', height: '42px',
              borderRadius: '50%',
              border: '1px solid var(--line)',
              background: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--ink-700)',
              transition: 'all .15s',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}
