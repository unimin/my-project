"use client";

import { useState, useEffect, useCallback } from "react";

// ── Meal data ─────────────────────────────────────────────────
const MEALS = [
  {
    emoji: "🍚",
    name: "현미밥과 된장찌개",
    benefits: ["식이섬유가 풍부해요", "소화가 편안해요", "속이 든든해요"],
  },
  {
    emoji: "🐟",
    name: "고등어구이와 나물",
    benefits: ["오메가3가 가득해요", "뼈 건강에 좋아요", "단백질이 풍부해요"],
  },
  {
    emoji: "🥣",
    name: "닭가슴살 야채죽",
    benefits: ["부드럽게 드실 수 있어요", "몸을 따뜻하게 해줘요", "소화가 잘 돼요"],
  },
  {
    emoji: "🥗",
    name: "두부 채소무침",
    benefits: ["칼슘이 풍부해요", "담백하고 깔끔해요", "비타민이 가득해요"],
  },
  {
    emoji: "🍲",
    name: "시금치 된장국",
    benefits: ["철분 보충에 좋아요", "국물이 시원해요", "미네랄이 풍부해요"],
  },
  {
    emoji: "🍳",
    name: "계란찜과 부추무침",
    benefits: ["부드럽고 따뜻해요", "단백질이 많아요", "입맛을 돋워줘요"],
  },
  {
    emoji: "🍠",
    name: "찐 단호박과 두유",
    benefits: ["천천히 소화돼요", "혈당 관리에 좋아요", "달콤하고 든든해요"],
  },
];

// ── Color palettes ────────────────────────────────────────────
const PALETTES = {
  beige: {
    name: "베이지·주황",
    pageBg: "#EFE3D0",
    cardBg: "#FAF3E7",
    softBg: "#F5E8D3",
    accent: "#E89B5C",
    accentDark: "#C97A3E",
    accentSoft: "#FBE3CC",
    text: "#3B2A1E",
    textMuted: "#8B7560",
    border: "#E6D5BD",
  },
  sunset: {
    name: "따뜻한 노을",
    pageBg: "#F2DACA",
    cardBg: "#FCEFE3",
    softBg: "#F8DCC4",
    accent: "#E07A5F",
    accentDark: "#B85A3F",
    accentSoft: "#F8CFBE",
    text: "#3D2418",
    textMuted: "#8A6555",
    border: "#EDC9B0",
  },
  earth: {
    name: "차분한 흙",
    pageBg: "#E8DCC7",
    cardBg: "#F7EFDE",
    softBg: "#EDDFC4",
    accent: "#C8763A",
    accentDark: "#A55C28",
    accentSoft: "#EFCFA8",
    text: "#3A2C1E",
    textMuted: "#85705A",
    border: "#DCC9A8",
  },
  apricot: {
    name: "부드러운 살구",
    pageBg: "#F4E2CC",
    cardBg: "#FFF5E8",
    softBg: "#FBE6CE",
    accent: "#EFA868",
    accentDark: "#CC8344",
    accentSoft: "#FCDBBA",
    text: "#42301F",
    textMuted: "#937962",
    border: "#EBD2B2",
  },
} as const;

type PaletteKey = keyof typeof PALETTES;
type Palette = typeof PALETTES[PaletteKey];

// ── Text scale options ────────────────────────────────────────
const TEXT_SCALES = {
  normal: { label: "보통", scale: 1 },
  large: { label: "크게", scale: 1.12 },
  xlarge: { label: "아주 크게", scale: 1.24 },
} as const;

type ScaleKey = keyof typeof TEXT_SCALES;

// ── SVG icons ────────────────────────────────────────────────
function PlateIcon({ size = 150, color = "#E89B5C" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none">
      <circle cx="100" cy="100" r="78" stroke={color} strokeWidth="6" opacity="0.35" />
      <circle cx="100" cy="100" r="58" stroke={color} strokeWidth="6" />
      <path d="M70 95 Q100 75 130 95" stroke={color} strokeWidth="5" strokeLinecap="round" opacity="0.6" />
      <circle cx="85" cy="110" r="4" fill={color} />
      <circle cx="115" cy="110" r="4" fill={color} />
    </svg>
  );
}

function RefreshIcon({ size = 28, color }: { size?: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M3 12a9 9 0 0115.5-6.3M21 4v5h-5" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 12a9 9 0 01-15.5 6.3M3 20v-5h5" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon({ size = 18, color }: { size?: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M5 12.5l4.5 4.5L19 7" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Today's date in Korean ────────────────────────────────────
function todayKor() {
  const d = new Date();
  const w = ["일", "월", "화", "수", "목", "금", "토"][d.getDay()];
  return `${d.getMonth() + 1}월 ${d.getDate()}일 ${w}요일`;
}

// ── Android status bar ────────────────────────────────────────
function AndroidStatusBar() {
  const c = PALETTES.beige.text;
  return (
    <div style={{
      height: 40, display: "flex", alignItems: "center",
      justifyContent: "space-between", padding: "0 16px",
      position: "relative", fontFamily: "system-ui, sans-serif",
      background: "transparent",
    }}>
      <span style={{ fontSize: 14, fontWeight: 400, color: c, letterSpacing: 0.25 }}>9:30</span>
      <div style={{
        position: "absolute", left: "50%", top: 8, transform: "translateX(-50%)",
        width: 22, height: 22, borderRadius: "50%", background: "#2e2e2e",
      }} />
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <svg width="14" height="14" viewBox="0 0 16 16">
          <path d="M8 13.3L.67 5.97a10.37 10.37 0 0114.66 0L8 13.3z" fill={c} />
        </svg>
        <svg width="12" height="12" viewBox="0 0 16 16">
          <path d="M14.67 14.67V1.33L1.33 14.67h13.34z" fill={c} />
        </svg>
        <svg width="12" height="12" viewBox="0 0 16 16">
          <rect x="3.75" y="2" width="8.5" height="13" rx="1.5" fill={c} />
          <rect x="5.5" y="0.9" width="5" height="2" rx="0.5" fill={c} />
        </svg>
      </div>
    </div>
  );
}

// ── Android gesture nav bar ───────────────────────────────────
function AndroidNavBar({ color }: { color: string }) {
  return (
    <div style={{ height: 24, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{
        width: 108, height: 4, borderRadius: 2,
        background: color, opacity: 0.35,
      }} />
    </div>
  );
}

// ── Android device frame ──────────────────────────────────────
function AndroidDevice({
  children,
  cardBg,
  border,
  text,
}: {
  children: React.ReactNode;
  cardBg: string;
  border: string;
  text: string;
}) {
  return (
    <div style={{
      width: 390, height: 844,
      borderRadius: 44,
      overflow: "hidden",
      background: cardBg,
      border: `8px solid rgba(100,80,60,0.45)`,
      boxShadow: "0 30px 80px rgba(0,0,0,0.25), 0 0 0 1px rgba(100,80,60,0.2)",
      display: "flex",
      flexDirection: "column",
      boxSizing: "border-box",
      flexShrink: 0,
    }}>
      <AndroidStatusBar />
      <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
        {children}
      </div>
      <AndroidNavBar color={text} />
    </div>
  );
}

// ── Home screen ───────────────────────────────────────────────
function HomeScreen({
  palette,
  textScale,
  mealIndex,
  onRecommend,
}: {
  palette: Palette;
  textScale: number;
  mealIndex: number | null;
  onRecommend: () => void;
}) {
  const p = palette;
  const f = (px: number) => Math.round(px * textScale);
  const meal = mealIndex !== null ? MEALS[mealIndex] : null;
  const revealed = meal !== null;

  return (
    <div style={{
      height: "100%",
      display: "flex",
      flexDirection: "column",
      background: p.cardBg,
      fontFamily: '"Pretendard", "Noto Sans KR", system-ui, sans-serif',
      color: p.text,
      position: "relative",
    }}>
      {/* Greeting header */}
      <div style={{
        padding: "20px 28px 16px",
        borderBottom: `1px solid ${p.border}`,
      }}>
        <div style={{ fontSize: f(16), color: p.textMuted, fontWeight: 500 }}>
          오늘은 {todayKor()}
        </div>
        <div style={{ fontSize: f(26), fontWeight: 700, color: p.text, marginTop: 4, letterSpacing: "-0.02em" }}>
          안녕하세요 👋
        </div>
      </div>

      {/* Content area */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        padding: "24px 28px 28px",
      }}>
        {!revealed && (
          <>
            <div style={{
              fontSize: f(24),
              lineHeight: 1.45,
              fontWeight: 600,
              color: p.text,
              textAlign: "center",
              marginTop: 8,
              letterSpacing: "-0.02em",
            }}>
              오늘 무엇을<br />드시면 좋을지<br />알려드릴게요
            </div>

            {/* Bowl illustration */}
            <div style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px 0",
            }}>
              <div style={{
                width: 200,
                height: 200,
                borderRadius: "50%",
                background: p.softBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `inset 0 0 0 1px ${p.border}`,
              }}>
                <PlateIcon size={136} color={p.accent} />
              </div>
            </div>

            {/* Main CTA button */}
            <button
              onClick={onRecommend}
              style={{
                width: "100%",
                minHeight: 88,
                padding: "20px 24px",
                background: p.accent,
                color: "#FFFFFF",
                border: "none",
                borderRadius: 100,
                fontSize: f(24),
                fontWeight: 700,
                fontFamily: "inherit",
                letterSpacing: "-0.01em",
                boxShadow: `0 8px 20px ${p.accent}55, 0 2px 0 ${p.accentDark} inset, 0 -3px 0 ${p.accentDark}33 inset`,
                cursor: "pointer",
                transition: "transform 0.12s ease",
              }}
              onMouseDown={(e) => { e.currentTarget.style.transform = "translateY(2px)"; }}
              onMouseUp={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
            >
              오늘의 식단 추천받기
            </button>

            <div style={{
              fontSize: f(14),
              color: p.textMuted,
              textAlign: "center",
              marginTop: 14,
            }}>
              버튼을 한 번 눌러 주세요
            </div>
          </>
        )}

        {revealed && meal && (
          <div key={mealIndex} style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            animation: "fadeUp 0.4s ease",
          }}>
            {/* Badge */}
            <div style={{
              display: "inline-flex",
              alignSelf: "flex-start",
              alignItems: "center",
              gap: 8,
              background: p.accentSoft,
              color: p.accentDark,
              padding: "8px 16px",
              borderRadius: 100,
              fontSize: f(14),
              fontWeight: 700,
            }}>
              <CheckIcon size={f(16)} color={p.accentDark} />
              오늘의 추천 식단
            </div>

            <div style={{
              fontSize: f(20),
              fontWeight: 600,
              color: p.text,
              marginTop: 14,
              letterSpacing: "-0.02em",
              lineHeight: 1.35,
            }}>
              오늘은 이 식단을<br />추천드려요
            </div>

            {/* Large emoji */}
            <div style={{
              alignSelf: "center",
              width: 180,
              height: 180,
              borderRadius: "50%",
              background: p.softBg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "16px 0 10px",
              fontSize: 110,
              lineHeight: 1,
              boxShadow: `inset 0 0 0 1px ${p.border}`,
            }}>
              <span style={{
                display: "block",
                transform: "translateY(-2px)",
                animation: "pop 0.5s ease",
              }}>
                {meal.emoji}
              </span>
            </div>

            {/* Food name */}
            <div style={{
              fontSize: f(28),
              fontWeight: 800,
              color: p.text,
              textAlign: "center",
              letterSpacing: "-0.025em",
              lineHeight: 1.25,
              marginTop: 4,
            }}>
              {meal.name}
            </div>

            {/* Benefits */}
            <ul style={{
              listStyle: "none",
              padding: 0,
              margin: "16px 0 0",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}>
              {meal.benefits.map((b, i) => (
                <li key={i} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  background: p.softBg,
                  borderRadius: 14,
                  padding: "12px 18px",
                  fontSize: f(17),
                  color: p.text,
                  fontWeight: 500,
                }}>
                  <span style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: p.accent,
                    flexShrink: 0,
                  }} />
                  {b}
                </li>
              ))}
            </ul>

            {/* Retry button */}
            <div style={{ marginTop: "auto", paddingTop: 20 }}>
              <button
                onClick={onRecommend}
                style={{
                  width: "100%",
                  minHeight: 78,
                  padding: "18px 24px",
                  background: p.accent,
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: 100,
                  fontSize: f(20),
                  fontWeight: 700,
                  fontFamily: "inherit",
                  letterSpacing: "-0.01em",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  boxShadow: `0 6px 16px ${p.accent}55, 0 2px 0 ${p.accentDark} inset, 0 -3px 0 ${p.accentDark}33 inset`,
                  cursor: "pointer",
                  transition: "transform 0.12s ease",
                }}
                onMouseDown={(e) => { e.currentTarget.style.transform = "translateY(2px)"; }}
                onMouseUp={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <RefreshIcon size={f(22)} color="#FFFFFF" />
                다른 식단 추천받기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Palette swatch picker ─────────────────────────────────────
function PaletteSwatches({
  value,
  onChange,
}: {
  value: PaletteKey;
  onChange: (v: PaletteKey) => void;
}) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 8,
    }}>
      {(Object.entries(PALETTES) as [PaletteKey, Palette][]).map(([k, p]) => {
        const active = k === value;
        return (
          <button
            key={k}
            type="button"
            onClick={() => onChange(k)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "8px 10px",
              borderRadius: 10,
              border: active ? "2px solid #6366f1" : "2px solid rgba(255,255,255,0.15)",
              background: active ? "rgba(99,102,241,0.12)" : "rgba(255,255,255,0.06)",
              cursor: "pointer",
              fontFamily: "inherit",
              color: "inherit",
              textAlign: "left",
            }}
          >
            <div style={{
              display: "flex",
              borderRadius: 6,
              overflow: "hidden",
              flexShrink: 0,
              border: "1px solid rgba(255,255,255,0.2)",
            }}>
              <span style={{ width: 14, height: 28, background: p.accent, display: "block" }} />
              <span style={{ width: 14, height: 28, background: p.cardBg, display: "block" }} />
              <span style={{ width: 14, height: 28, background: p.softBg, display: "block" }} />
            </div>
            <span style={{ fontSize: 12, fontWeight: 600, opacity: active ? 1 : 0.75 }}>
              {p.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ── Tweaks panel (floating) ───────────────────────────────────
function TweaksPanel({
  paletteKey,
  scaleKey,
  onPaletteChange,
  onScaleChange,
}: {
  paletteKey: PaletteKey;
  scaleKey: ScaleKey;
  onPaletteChange: (v: PaletteKey) => void;
  onScaleChange: (v: ScaleKey) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          width: 48,
          height: 48,
          borderRadius: "50%",
          background: "rgba(50,40,30,0.85)",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
          boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
          zIndex: 100,
        }}
        title="Tweaks"
      >
        ⚙
      </button>

      {open && (
        <div style={{
          position: "fixed",
          bottom: 78,
          right: 20,
          width: 260,
          background: "rgba(40,30,20,0.9)",
          backdropFilter: "blur(20px)",
          border: "0.5px solid rgba(255,255,255,0.15)",
          borderRadius: 14,
          boxShadow: "0 12px 40px rgba(0,0,0,0.35)",
          color: "rgba(255,255,255,0.9)",
          fontFamily: "system-ui, sans-serif",
          fontSize: 12,
          zIndex: 99,
          overflow: "hidden",
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 14px 10px",
            borderBottom: "0.5px solid rgba(255,255,255,0.1)",
          }}>
            <span style={{ fontWeight: 700, fontSize: 13 }}>Tweaks</span>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: "transparent",
                border: 0,
                color: "rgba(255,255,255,0.6)",
                cursor: "pointer",
                fontSize: 14,
                padding: "2px 6px",
              }}
            >✕</button>
          </div>

          <div style={{ padding: "12px 14px 16px", display: "flex", flexDirection: "column", gap: 14 }}>
            {/* Palette section */}
            <div>
              <div style={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.45)",
                marginBottom: 8,
              }}>색상 팔레트</div>
              <PaletteSwatches value={paletteKey} onChange={onPaletteChange} />
            </div>

            {/* Text scale section */}
            <div>
              <div style={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.45)",
                marginBottom: 8,
              }}>접근성 — 글씨 크기</div>
              <div style={{ display: "flex", gap: 6 }}>
                {(Object.entries(TEXT_SCALES) as [ScaleKey, typeof TEXT_SCALES[ScaleKey]][]).map(([k, s]) => (
                  <button
                    key={k}
                    onClick={() => onScaleChange(k)}
                    style={{
                      flex: 1,
                      padding: "7px 0",
                      borderRadius: 8,
                      border: "none",
                      background: scaleKey === k ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.1)",
                      color: scaleKey === k ? "#2a1e10" : "rgba(255,255,255,0.75)",
                      fontWeight: 600,
                      fontSize: 11,
                      cursor: "pointer",
                      fontFamily: "inherit",
                      transition: "all 0.15s",
                    }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ── Page ──────────────────────────────────────────────────────
export default function DietPage() {
  const [paletteKey, setPaletteKey] = useState<PaletteKey>("beige");
  const [scaleKey, setScaleKey] = useState<ScaleKey>("large");
  const [mealIndex, setMealIndex] = useState<number | null>(null);

  const palette = PALETTES[paletteKey];
  const textScale = TEXT_SCALES[scaleKey].scale;

  const recommend = useCallback(() => {
    setMealIndex((prev) => {
      let next: number;
      do {
        next = Math.floor(Math.random() * MEALS.length);
      } while (next === prev && MEALS.length > 1);
      return next;
    });
  }, []);

  const cycleScale = () => {
    const order: ScaleKey[] = ["normal", "large", "xlarge"];
    setScaleKey((prev) => order[(order.indexOf(prev) + 1) % order.length]);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: palette.pageBg,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 20px",
      boxSizing: "border-box",
      fontFamily: '"Pretendard", "Noto Sans KR", system-ui, sans-serif',
      transition: "background 0.3s ease",
    }}>
      <div style={{ position: "relative" }}>
        <AndroidDevice cardBg={palette.cardBg} border={palette.border} text={palette.text}>
          <HomeScreen
            palette={palette}
            textScale={textScale}
            mealIndex={mealIndex}
            onRecommend={recommend}
          />
        </AndroidDevice>

        {/* Font size toggle beside the phone */}
        <button
          onClick={cycleScale}
          title="글씨 크기 조절"
          style={{
            position: "absolute",
            top: 110,
            right: -76,
            width: 62,
            padding: "10px 0",
            background: palette.cardBg,
            border: `2px solid ${palette.border}`,
            borderRadius: 14,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
            cursor: "pointer",
            boxShadow: "0 6px 14px rgba(0,0,0,0.1)",
            fontFamily: "inherit",
            transition: "border-color 0.15s",
          }}
        >
          <span style={{ fontSize: 11, color: palette.textMuted, fontWeight: 600 }}>글씨</span>
          <span style={{ fontSize: 22, color: palette.accent, fontWeight: 800, lineHeight: 1 }}>가</span>
          <span style={{ fontSize: 10, color: palette.text, fontWeight: 600 }}>
            {TEXT_SCALES[scaleKey].label}
          </span>
        </button>
      </div>

      <TweaksPanel
        paletteKey={paletteKey}
        scaleKey={scaleKey}
        onPaletteChange={setPaletteKey}
        onScaleChange={setScaleKey}
      />

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pop {
          0%   { transform: scale(0.6); opacity: 0; }
          60%  { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
