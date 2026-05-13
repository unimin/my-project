"use client";

import { useState } from "react";

const DOW = ["일", "월", "화", "수", "목", "금", "토"];

const events = [
  { time: "10:00", text: "디자인 시스템 v2 리뷰 미팅 (사내 회의실 A)" },
  { time: "14:30", text: "개인 회고 — 4월 정리 노트 작성" },
  { time: "19:00", text: "독서 모임 — 「디자인의 역사」 3장 토론" },
];

// 이벤트가 있는 날짜 (5월 기준)
const eventDays = new Set([2, 4, 6, 7, 12, 15, 20, 23, 28]);

function buildCalendar(year: number, month: number) {
  const firstDay = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const prevDays = new Date(year, month - 1, 0).getDate();
  const cells: { day: number; muted: boolean }[] = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({ day: prevDays - i, muted: true });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, muted: false });
  }
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    cells.push({ day: d, muted: true });
  }
  return cells;
}

export default function CalendarPanel() {
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(5);
  const today = { year: 2026, month: 5, day: 13 };

  const cells = buildCalendar(year, month);

  const prevMonth = () => {
    if (month === 1) { setYear(y => y - 1); setMonth(12); }
    else setMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (month === 12) { setYear(y => y + 1); setMonth(1); }
    else setMonth(m => m + 1);
  };

  return (
    <div style={{
      background: '#fff',
      border: '1px solid var(--line)',
      display: 'flex', flexDirection: 'column',
      borderRadius: 'var(--radius)', overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '18px 22px', borderBottom: '1px solid var(--line)',
      }}>
        <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 700, color: 'var(--navy-900)', letterSpacing: '-0.02em' }}>
          {year} · {month}
        </h3>
        <div style={{ display: 'flex', gap: '4px' }}>
          {[{ label: '‹', fn: prevMonth }, { label: '›', fn: nextMonth }].map(({ label, fn }) => (
            <button key={label} onClick={fn} style={{
              width: '28px', height: '28px',
              border: '1px solid var(--line)', background: '#fff',
              color: 'var(--ink-700)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', fontSize: '16px',
              borderRadius: 'var(--radius)',
            }}>{label}</button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)',
        padding: '14px 16px 18px', gap: '2px',
      }}>
        {DOW.map((d, i) => (
          <div key={d} style={{
            textAlign: 'center', fontSize: '11px', fontWeight: 600,
            color: i === 0 ? '#c83737' : i === 6 ? 'var(--navy-700)' : 'var(--ink-500)',
            padding: '8px 0',
            fontFamily: 'Inter, sans-serif',
          }}>{d}</div>
        ))}
        {cells.map((cell, idx) => {
          const isToday = !cell.muted && year === today.year && month === today.month && cell.day === today.day;
          const hasEvent = !cell.muted && eventDays.has(cell.day);
          return (
            <div key={idx} style={{
              aspectRatio: '1',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              fontSize: '13px',
              color: cell.muted ? 'var(--ink-300)' : isToday ? '#fff' : 'var(--ink-700)',
              fontVariantNumeric: 'tabular-nums',
              cursor: 'pointer',
              borderRadius: '2px',
              position: 'relative',
              background: isToday ? 'var(--navy-900)' : 'transparent',
              fontFamily: 'Inter, sans-serif',
              fontWeight: isToday ? 600 : 400,
              transition: 'background .15s',
            }}>
              {cell.day}
              {hasEvent && (
                <span style={{
                  position: 'absolute', bottom: '4px',
                  width: '4px', height: '4px', borderRadius: '50%',
                  background: isToday ? '#fff' : 'var(--navy-500)',
                }} />
              )}
            </div>
          );
        })}
      </div>

      {/* Events */}
      <div style={{ borderTop: '1px solid var(--line)', padding: '16px 22px 22px' }}>
        <h4 style={{
          margin: '0 0 12px',
          fontSize: '13px', fontWeight: 600, color: 'var(--ink-700)',
          fontFamily: 'Inter, sans-serif', letterSpacing: '0.02em',
        }}>오늘의 일정 — 5월 13일 (수)</h4>
        {events.map((ev, i) => (
          <div key={i} style={{
            display: 'flex', gap: '12px', padding: '10px 0',
            borderBottom: i < events.length - 1 ? '1px dashed var(--line)' : 'none',
          }}>
            <div style={{
              fontSize: '12px', color: 'var(--navy-700)', fontWeight: 600,
              fontFamily: 'Inter, sans-serif', flexShrink: 0, width: '50px',
            }}>{ev.time}</div>
            <div style={{ fontSize: '13.5px', color: 'var(--ink-900)', lineHeight: 1.45 }}>{ev.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
