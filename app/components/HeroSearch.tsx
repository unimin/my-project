"use client";

import { useState } from "react";

const quickTags = ["디자인 레퍼런스", "읽을거리", "2026 회고", "북마크", "자료실"];

export default function HeroSearch() {
  const [query, setQuery] = useState("");

  return (
    <section style={{
      position: 'relative',
      padding: '72px 32px 56px',
      borderBottom: '1px solid var(--line)',
      overflow: 'hidden',
    }}>
      {/* 배경 이미지 */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'url(https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1600&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }} />
      {/* 어두운 오버레이 — 텍스트 가독성 확보 */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, rgba(11,29,58,0.72) 0%, rgba(11,29,58,0.60) 100%)',
      }} />

      <div style={{ maxWidth: '980px', margin: '0 auto', position: 'relative' }}>
        <div style={{
          textAlign: 'center',
          fontSize: '12px',
          fontWeight: 600,
          color: 'rgba(255,255,255,0.75)',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          marginBottom: '14px',
          fontFamily: 'Inter, sans-serif',
        }}>
          REFERENCE · 2026 EDITION
        </div>
        <h1 style={{
          textAlign: 'center',
          fontSize: '32px',
          fontWeight: 700,
          color: '#ffffff',
          letterSpacing: '-0.025em',
          margin: '0 0 8px',
          lineHeight: 1.25,
        }}>
          기록은 사라지지 않는다.
        </h1>
        <p style={{
          textAlign: 'center',
          color: 'rgba(255,255,255,0.8)',
          fontSize: '15px',
          margin: '0 0 36px',
        }}>
          링크, 문서, 이미지 — 흩어진 자료를 한 곳에 정돈합니다.
        </p>

        <div style={{
          background: '#fff',
          border: '2px solid var(--navy-700)',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          padding: '0 8px 0 28px',
          boxShadow: '0 4px 24px -8px rgba(11,29,58,0.18)',
          borderRadius: 'var(--radius)',
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1c3c70" strokeWidth="2"
            style={{ marginRight: '14px', flexShrink: 0 }}>
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="검색어를 입력해 주세요"
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{
              flex: 1,
              border: 0,
              outline: 0,
              fontSize: '16px',
              fontFamily: 'inherit',
              background: 'transparent',
              color: 'var(--ink-900)',
            }}
          />
          <button
            aria-label="검색하기"
            style={{
              width: '48px', height: '48px',
              background: 'var(--navy-700)',
              border: 0,
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background .15s',
              borderRadius: 'calc(var(--radius) - 2px)',
              flexShrink: 0,
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>

        <div style={{
          display: 'flex',
          gap: '8px',
          justifyContent: 'center',
          marginTop: '20px',
          flexWrap: 'wrap',
        }}>
          {quickTags.map(tag => (
            <a key={tag} href="#" style={{
              fontSize: '12.5px',
              color: 'rgba(255,255,255,0.85)',
              padding: '6px 14px',
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.25)',
              transition: 'all .15s',
              borderRadius: 'var(--radius)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.22)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
              e.currentTarget.style.color = 'rgba(255,255,255,0.85)';
            }}
            >
              <span style={{ color: 'rgba(255,255,255,0.5)', marginRight: '6px' }}>#</span>
              {tag}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
