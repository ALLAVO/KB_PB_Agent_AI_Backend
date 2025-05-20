// 이 파일은 서버 측에서 실행될 데이터 가져오기 로직을 담당합니다.
// 실제 애플리케이션에서는 데이터베이스 조회나 외부 API 호출 등이 포함될 수 있습니다.

export interface CompanyOverview {
  description: string;
  industry: string;
  ceo: string;
  founded: string;
  headquarters: string;
}

export async function fetchCompanyOverview(companyName: string): Promise<CompanyOverview> {
  // 실제 API 호출을 시뮬레이션하기 위해 약간의 지연을 추가할 수 있습니다.
  // await new Promise(resolve => setTimeout(resolve, 500)); 
  
  // 현재는 목 데이터를 반환합니다.
  return {
    description: `${companyName.toUpperCase()}에 대한 개요입니다. 일반적으로 회사의 역사, 미션, 제품 및 시장에서의 위치와 같은 정보가 포함됩니다.`,
    industry: "정보기술",
    ceo: "김철수",
    founded: "2000년",
    headquarters: "대한민국 서울"
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
