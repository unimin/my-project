"use client";

import { useState } from "react";

interface FeaturedItem {
  title: string;
  tag: string;
  date: string;
  count: string;
  imgVariant: "var-1" | "var-2";
  imgLabel: string;
}

interface FeaturedCardProps {
  title: string;
  tabs: string[];
  items: FeaturedItem[];
}

const stripBg = {
  "var-1": "repeating-linear-gradient(45deg,#e7ebf3,#e7ebf3 10px,#dce2ee 10px,#dce2ee 20px)",
  "var-2": "repeating-linear-gradient(135deg,#eaecf2,#eaecf2 10px,#dee2eb 10px,#dee2eb 20px)",
};

export default function FeaturedCard({ title, tabs, items }: FeaturedCardProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const item = items[slideIndex] ?? items[0];

  return (
    <div style={{
      background: '#fff',
      border: '1px solid var(--line)',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 'var(--radius)',
      overflow: 'hidden',
    }}>
      {/* Tabs */}
      <div style={{
        display: 'flex',
        alignItems: 'stretch',
        borderBottom: '1px solid var(--line)',
      }}>
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
          marginLeft: 'auto',
          marginRight: '14px',
          alignSelf: 'center',
          width: '28px', height: '28px',
          borderRadius: '50%',
          border: '1px solid var(--line)',
          background: '#fff',
          color: 'var(--ink-700)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '16px',
          cursor: 'pointer',
        }}>+</button>
      </div>

      {/* Featured image */}
      <div style={{
        aspectRatio: '16/9',
        background: stripBg[item.imgVariant],
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--navy-700)',
        fontFamily: 'Inter, monospace',
        fontSize: '11px',
        letterSpacing: '0.12em',
        overflow: 'hidden',
      }}>
        <span>{item.imgLabel}</span>
        <button
          onClick={() => setSlideIndex(i => Math.max(0, i - 1))}
          aria-label="이전"
          style={{
            position: 'absolute', top: '50%', left: '14px',
            width: '36px', height: '36px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.85)',
            border: '1px solid var(--line)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--navy-700)',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
            fontSize: '18px',
          }}>‹</button>
        <button
          onClick={() => setSlideIndex(i => Math.min(items.length - 1, i + 1))}
          aria-label="다음"
          style={{
            position: 'absolute', top: '50%', right: '14px',
            width: '36px', height: '36px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.85)',
            border: '1px solid var(--line)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--navy-700)',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
            fontSize: '18px',
          }}>›</button>
        <div style={{
          position: 'absolute', bottom: '14px', left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', gap: '6px',
        }}>
          {items.map((_, i) => (
            <span key={i} onClick={() => setSlideIndex(i)} style={{
              width: i === slideIndex ? '18px' : '6px',
              height: '6px',
              borderRadius: i === slideIndex ? '3px' : '50%',
              background: i === slideIndex ? 'var(--navy-700)' : 'rgba(11,29,58,0.25)',
              cursor: 'pointer',
              transition: 'all .2s',
            }} />
          ))}
        </div>
      </div>

      {/* Caption */}
      <div style={{
        padding: '18px 22px 22px',
        fontSize: '17px',
        fontWeight: 600,
        color: 'var(--ink-900)',
        letterSpacing: '-0.015em',
        lineHeight: 1.4,
      }}>
        {item.title}
        <div style={{
          display: 'flex', gap: '10px', alignItems: 'center',
          marginTop: '8px',
          fontSize: '12px', fontWeight: 500, color: 'var(--ink-500)',
        }}>
          <span style={{
            color: 'var(--navy-700)',
            background: 'var(--navy-50)',
            padding: '3px 8px',
            fontSize: '11px', fontWeight: 600,
          }}>{item.tag}</span>
          <span>{item.date}</span>
          <span>· {item.count}</span>
        </div>
      </div>
    </div>
  );
}
