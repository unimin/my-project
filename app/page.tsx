import TopUtilBar from "./components/TopUtilBar";
import Header from "./components/Header";
import HeroSearch from "./components/HeroSearch";
import FeaturedCard from "./components/FeaturedCard";
import ListPanel from "./components/ListPanel";
import CalendarPanel from "./components/CalendarPanel";
import QuickMenu from "./components/QuickMenu";
import StatsStrip from "./components/StatsStrip";
import Footer from "./components/Footer";

// 이미지 출처: Wikimedia Commons, CC BY-SA 3.0
// 본회의장: https://commons.wikimedia.org/wiki/File:Main_conference_room_of_South_korean_national_assembly_building.JPG
// 의사당 외관: https://commons.wikimedia.org/wiki/File:National_Assembly_Building_of_South_Korea10.JPG
const featuredItems1 = [
  {
    title: "국회 본회의장 — 대한민국 입법부의 중심",
    tag: "국회",
    date: "2026.05.13",
    count: "1개 항목",
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/9/90/Main_conference_room_of_South_korean_national_assembly_building.JPG",
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
    title: "국회의사당 — 여의도 대한민국 입법부 청사",
    tag: "국회",
    date: "2026.05.13",
    count: "1개 항목",
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4f/National_Assembly_Building_of_South_Korea10.JPG",
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
