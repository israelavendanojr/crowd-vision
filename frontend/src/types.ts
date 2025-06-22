export interface CrowdData {
    time_stamp: string;
    image: string;
    risk_level: 'LOW' | 'MEDIUM' | 'HIGH';
    risk_trend: 'INCREASING' | 'DECREASING' | 'STABLE';
    hot_zones: string[];
    summary: string;
    insights: string;
    protocol: string;
    flags: string[];
  }
  