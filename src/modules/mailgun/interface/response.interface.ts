import { DnsRecordDto, DomainDto } from '../dto/mailgun-response.dto';
import { StatResolution } from '../enum/mailgun.enum';

export interface StatResponse {
  domain: string;
  resolution: StatResolution;
  totals: TotalStats;
  provider: Map<string, CommonStat>;
  countries: Map<string, CommonStat>;
  devices: DeviceStat;
}

export interface DeviceStat {
  desktop: CommonStat;
  mobile: CommonStat;
  tablet: CommonStat;
  unknown: CommonStat;
}

export interface CommonStat {
  clicked: number;
  complained: number;
  opened: number;
  unique_clicked: number;
  unique_opened: number;
  unsubscribed: number;
}

export interface TotalStats {
  description: string;
  start: string;
  end: string;
  resolution: string;
  stats: TotalStat[];
}

interface TotalStat {
  time: string;
  accepted: Accepted;
  delivered: Delivered;
  failed: Failed;
  stored: Total;
  opened: Total;
  clicked: Total;
  unsubscribed: Total;
  complained: Total;
}

interface Accepted {
  incoming: number;
  outgoing: number;
  total: number;
}

interface Delivered {
  smtp: number;
  http: number;
  optimized: number;
  total: number;
}

interface Failed {
  temporary: Temporary;
  permanent: Permanent;
}

interface Temporary {
  espblock: number;
  total: number;
}

interface Permanent {
  'suppress-bounce': number;
  'suppress-unsubscribe': number;
  'suppress-complaint': number;
  bounce: number;
  'delayed-bounce': number;
  webhook: number;
  optimized: number;
  total: number;
}

interface Total {
  total: string;
}

export interface DomainConfigurations {
  domain: string;
  webPixelProfileId?: string;
  company?: string | any;
  details: DomainDto;
  sendingDnsRecords: DnsRecordDto[];
  receivingDnsRecords: DnsRecordDto[];
}
