export interface Points {
  min: number;
  max: number;
}

export interface File {
  name: string;
  url: string;
}

export interface CleanedChallenge {
  id: string;
  name: string;
  description: string;
  category: string;
  author: string;
  files: File[];
  points: Points;
  sortWeight?: number;
}

export interface Challenge {
  id: string;
  name: string;
  description: string;
  category: string;
  author: string;
  files: File[];
  points: Points;
  flag: string;
  tiebreakEligible: boolean;
  sortWeight?: number;
}

export interface TeamScoreboardEntry {
  id: string;
  name: string;
  score: number;
}

export interface Solve {
  id: string;
  category: string;
  name: string;
  createdAt: string;
  points: number;
}

export interface ProfileData {
  id: string;
  name: string;
  email: string;
  divisionId: string;
  score: number;
  solves: Solve[];
  divisionPlace: number;
  globalPlace: number;
  teamToken: string;
  ctftimeId?: string;
  allowedDivisions?: string[];
}

export type ServerConfig = {
  database: {
    sql: string | {
      host: string;
      port: number;
      user: string;
      password: string;
      database: string;
    }
    redis: string | {
      host: string;
      port: number;
      password: string;
      database: number;
    }
    migrate: string;
  }
  instanceType: string;
  tokenKey: string;
  origin: string;
  originFrontend?: string;

  // TODO: enforce `trust` is false when `cloudflare` is true
  proxy: {
    cloudflare: boolean
    trust: boolean | string | string[] | number
  }

  ctftime?: {
    clientId: string;
    clientSecret: string;
  }

  userMembers: boolean;
  sponsors: Sponsor[];
  homeContent: string;
  ctfName: string;
  meta: {
    description: string;
    imageUrl: string;
  }
  faviconUrl?: string;
  logoUrl?: string;
  globalSiteTag?: string;

  challengeProvider: ProviderConfig;
  uploadProvider: ProviderConfig;

  email?: {
    provider: ProviderConfig;
    from: string;
  }

  divisions: Record<string, string>;
  defaultDivision?: string;
  divisionACLs?: ACL[];

  startTime: number;
  endTime: number;

  recaptcha?: {
    siteKey: string;
    secretKey: string;
    protectedActions: RecaptchaProtectedActions[];
  }

  leaderboard: {
    maxLimit: number;
    maxOffset: number;
    updateInterval: number;
    graphMaxTeams: number;
    graphSampleTime: number;
  }
  loginTimeout: number;
}

export type ClientConfig = Pick<ServerConfig,
  'meta' |
  'homeContent' |
  'sponsors' |
  'globalSiteTag' |
  'ctfName' |
  'divisions' |
  'defaultDivision' |
  'origin' |
  'startTime' |
  'endTime' |
  'userMembers' |
  'faviconUrl'
> & {
  emailEnabled: boolean;
  ctftime?: Pick<NonNullable<ServerConfig['ctftime']>, 'clientId'>
  recaptcha?: Pick<NonNullable<ServerConfig['recaptcha']>, 'siteKey' | 'protectedActions'>
}