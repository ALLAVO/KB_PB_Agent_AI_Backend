// 이 파일은 서버 측에서 실행될 데이터 가져오기 로직을 담당합니다.
// 실제 애플리케이션에서는 데이터베이스 조회나 외부 API 호출 등이 포함될 수 있습니다.

export interface CompanyOverview {
  ticker: string;
  name: string;
  sector?: string;
  industry?: string;
  headquarters?: string;
  business_summary: string;
  website?: string;
  market_cap?: number | string;
  current_price?: number | string;
  dividend_yield?: number | string;
  // 기존 필드 유지 또는 필요시 제거/수정
  ceo?: string; // yfinance 예시에는 없지만, 유지하거나 필요에 따라 관리
  founded?: string; // yfinance 예시에는 없지만, 유지하거나 필요에 따라 관리
}

export async function fetchCompanyOverview(companyTicker: string): Promise<CompanyOverview> {
  // 실제 API 호출을 시뮬레이션하기 위해 약간의 지연을 추가할 수 있습니다.
  // await new Promise(resolve => setTimeout(resolve, 500)); 
  
  // 현재는 목 데이터를 반환합니다. yfinance 예시를 기반으로 필드 확장
  const tickerUpper = companyTicker.toUpperCase();
  return {
    ticker: tickerUpper,
    name: `${tickerUpper} Inc.`, // 예시 이름
    sector: "정보기술",
    industry: "소프트웨어 및 IT 서비스",
    headquarters: "대한민국 서울",
    business_summary: `${tickerUpper}는 혁신적인 기술 솔루션을 제공하는 글로벌 리더입니다. 이 회사는 다양한 산업 분야의 고객들에게 최첨단 소프트웨어, 하드웨어 및 서비스를 제공하여 디지털 전환을 가속화하고 비즈니스 성장을 지원합니다. ${tickerUpper}는 지속적인 연구 개발과 전략적 파트셔십을 통해 시장을 선도하고 있으며, 주주 가치 극대화를 위해 노력하고 있습니다.`,
    website: `https://www.${tickerUpper.toLowerCase()}.example.com`,
    market_cap: Math.floor(Math.random() * 500000000000) + 100000000000, // 1000억 ~ 6000억 사이 랜덤
    current_price: parseFloat(((Math.random() * 200) + 50).toFixed(2)), // 50 ~ 250 사이 랜덤
    dividend_yield: parseFloat((Math.random() * 5).toFixed(2)), // 0 ~ 5% 사이 랜덤
    ceo: "김대표",
    founded: "1998년",
  };
}

export interface NewsSentimentData {
  overallScore: number;
  positiveNews: string[];
  negativeNews: string[];
  neutralNewsCount: number;
}

export async function fetchNewsSentiment(companyName: string): Promise<NewsSentimentData> {
  // await new Promise(resolve => setTimeout(resolve, 500));
  return {
    overallScore: 75, // Example: 0-100 scale
    positiveNews: [
      `${companyName.toUpperCase()}의 긍정적인 발전 A.`,
      `${companyName.toUpperCase()}의 성공적인 제품 B 출시.`,
    ],
    negativeNews: [
      `${companyName.toUpperCase()}에 영향을 미치는 시장 문제 C.`,
    ],
    neutralNewsCount: 5,
  };
}

export interface OpportunityRiskData {
  opportunities: string[];
  risks: string[];
}

export async function fetchOpportunityRisk(companyName: string): Promise<OpportunityRiskData> {
  // await new Promise(resolve => setTimeout(resolve, 500));
  return {
    opportunities: [
      `${companyName.toUpperCase()}의 새로운 시장 부문으로의 확장.`,
      `전략적 인수를 통한 성장 잠재력.`,
      `${companyName.toUpperCase()} 핵심 제품에 대한 강력한 수요.`,
    ],
    risks: [
      `주요 시장에서의 경쟁 심화.`,
      `핵심 공급업체에 대한 의존성.`,
      `다가오는 규제 변화의 잠재적 영향.`,
    ],
  };
}
