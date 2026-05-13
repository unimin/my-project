import TopUtilBar from "./components/TopUtilBar";
import Header from "./components/Header";
import HeroSearch from "./components/HeroSearch";
import FeaturedCard from "./components/FeaturedCard";
import ListPanel from "./components/ListPanel";
import CalendarPanel from "./components/CalendarPanel";
import QuickMenu from "./components/QuickMenu";
import StatsStrip from "./components/StatsStrip";
import Footer from "./components/Footer";

const featuredItems1 = [
  {
    title: "북유럽 가구 디자인 무드보드 · 2026 봄 시즌 정리",
    tag: "디자인",
    date: "2026.05.06",
    count: "14개 항목",
    imgVariant: "var-1" as const,
    imgLabel: "FEATURED IMAGE — 16:9",
  },
  {
    title: "타이포그래피 레퍼런스 — 서체 선택 가이드",
    tag: "디자인",
    date: "2026.05.04",
    count: "8개 항목",
    imgVariant: "var-1" as const,
    imgLabel: "FEATURED IMAGE — 16:9",
  },
];

const featuredItems2 = [
  {
    title: "연말 정리 — 2026년에 읽은 책과 메모",
    tag: "독서",
    date: "2026.05.04",
    count: "32개 항목",
    imgVariant: "var-2" as const,
    imgLabel: "SECONDARY IMAGE — 16:9",
  },
  {
    title: "5월 큐레이션 — 놓치면 아쉬운 콘텐츠",
    tag: "소식",
    date: "2026.05.01",
    count: "11개 항목",
    imgVariant: "var-2" as const,
    imgLabel: "SECONDARY IMAGE — 16:9",
  },
];

export default function Home() {
  return (
    <>
      <TopUtilBar />
      <Header />
      <HeroSearch />

      <main style={{
        maxWidth: 'var(--maxw)',
        margin: '0 auto',
        padding: '56px 32px 80px',
      }}>
        {/* Row 1: 2 featured cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '28px',
          marginBottom: '40px',
        }}>
          <FeaturedCard
            title="소통마당"
            tabs={["소통마당 주요동정", "최근 등록"]}
            items={featuredItems1}
          />
          <FeaturedCard
            title="알림마당"
            tabs={["알림마당", "소식"]}
            items={featuredItems2}
          />
        </div>

        {/* Row 2: list + calendar + quick menu */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr 0.9fr',
          gap: '28px',
        }}>
          <ListPanel />
          <CalendarPanel />
          <QuickMenu />
        </div>
      </main>

      <StatsStrip />
      <Footer />
    </>
  );
}
