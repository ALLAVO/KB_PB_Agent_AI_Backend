// 이 파일은 클라이언트 측에서 사용될 차트 관련 유틸리티 함수들을 포함합니다.

export interface PriceDataPoint {
  date: string;
  price: number;
  predictedPrice: number;
}

// Mock data for the chart
export const generateMockPredictionData = (companyName: string): PriceDataPoint[] => {
  const basePrice = companyName.length * 10 + 100; // Simple way to vary data by ticker
  const months = ["1월", "2월", "3월", "4월", "5월", "6월"];
  return months.map((month, index) => ({
    date: month,
    price: parseFloat((basePrice + index * Math.random() * 5).toFixed(2)),
    predictedPrice: parseFloat((basePrice + index * Math.random() * 5 + (Math.random() * 10 - 5)).toFixed(2))
  }));
};
