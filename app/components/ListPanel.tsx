"use client";

import { useState } from "react";

const listData = [
  { tag: "[디자인]", title: "2026 봄 무드보드 — 톤·온·톤 컬러 레퍼런스 모음", date: "2026-05-06" },
  { tag: "[북마크]", title: "읽고 싶은 글 모음 — 디자인 시스템과 토큰 전략", date: "2026-05-06" },
  { tag: "[문서]", title: "개인 프로젝트 회의록 — 사이드 프로젝트 v2 킥오프", date: "2026-05-05" },
  { tag: "[이미지]", title: "서울 산책 사진 — 4월 마지막 주 정리", date: "2026-05-04" },
  { tag: "[링크]", title: "자주 보는 디자인 블로그 12선 — 정리 및 메모", date: "2026-05-03" },
  { tag: "[메모]", title: "매주 회고 템플릿 — 5월 1주차 / 2주차 작성 완료", date: "2026-05-02" },
];

const tabs = ["위원활동 · 자료", "진행 중", "공지"];

export default function ListPanel() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div style={{
      background: '#fff',
      border: '1px solid var(--line)',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 'var(--radius)',
      overflow: 'hidden',
    }}>
      <div style={{ display: 'flex', alignItems: 'stretch', borderBottom: '1px solid var(--line)' }}>
        {tabs.map((tab, i) => (
          <button key={tab} onClick={() => setActiveTab(i)} style={{
            padding: '18px 22px',
            fontWeight: 600,
            fontSize: '16px',
            color: activeTab === i ? 'var(--navy-900)' : 'var(--ink-500)',
            border: 0,
            background: 'transparent',
            borderBottom: `2px solid ${activeTab === i ? 'var(--navy-700)' : 'transparent'}`,
            marginBottom: '-1px',
            letterSpacing: '-0.01em',
            transition: 'all .15s',
            cursor: 'pointer',
          }}>{tab}</button>
        ))}
        <button aria-label="더보기" style={{
          marginLeft: 'auto', marginRight: '14px', alignSelf: 'center',
          width: '28px', height: '28px', borderRadius: '50%',
          border: '1px solid var(--line)', background: '#fff',
          color: 'var(--ink-700)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '16px', cursor: 'pointer',
        }}>+</button>
      </div>

      {listData.map((row, i) => (
        <a key={i} href="#" style={{
          display: 'flex', alignItems: 'center',
          padding: '14px 22px',
          borderBottom: i < listData.length - 1 ? '1px solid var(--line)' : 'none',
          gap: '14px',
          transition: 'background .15s',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = 'var(--navy-50)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        >
          <span style={{
            fontSize: '11.5px', fontWeight: 600, color: 'var(--navy-700)',
            flexShrink: 0, minWidth: '64px',
          }}>{row.tag}</span>
          <span style={{
            flex: 1, fontSize: '14.5px', color: 'var(--ink-900)',
            letterSpacing: '-0.01em',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>{row.title}</span>
          <span style={{
            fontSize: '12px', color: 'var(--ink-500)',
            fontVariantNumeric: 'tabular-nums', flexShrink: 0,
            fontFamily: 'Inter, sans-serif',
          }}>{row.date}</span>
        </a>
      ))}
    </div>
  );
}
