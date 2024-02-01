export enum ActivityStateKind {
  NoAddress = 'noAddress',
  Loading = 'loading',
  Activity = 'activity',
  Error = 'error',
}

export enum ActivityActionKind {
  ActivityStart = 'activityStart',
  ActivitySuccess = 'activitySuccess',
  ActivityError = 'activityError',
}

export type ActivityAction =
  | { kind: ActivityActionKind.ActivityStart; address: string; chain: number }
  | {
      kind: ActivityActionKind.ActivitySuccess;
      address: string;
      chain: number;
      activity: Activity[];
    }
  | { kind: ActivityActionKind.ActivityError; address: string; chain: number };

export function activityReducer(
  activityState: ActivityState,
  action: ActivityAction,
): ActivityState {
  switch (action.kind) {
    case ActivityActionKind.ActivityStart:
      return {
        kind: ActivityStateKind.Loading,
        address: action.address,
        chain: action.chain,
      };
    case ActivityActionKind.ActivitySuccess:
      return {
        kind: ActivityStateKind.Activity,
        address: action.address,
        chain: action.chain,
        activity: action.activity,
      };
    case ActivityActionKind.ActivityError:
      return {
        kind: ActivityStateKind.Error,
        address: action.address,
        chain: action.chain,
      };
  }
}

export interface Activity {
  txnHash: string;
  icon: string | undefined;
  subIcon: string;
  title: string;
  subtitle: string;
  accessory: string;
}

export type ActivityState =
  | { kind: ActivityStateKind.NoAddress }
  | { kind: ActivityStateKind.Loading; address: string; chain: number }
  | { kind: ActivityStateKind.Activity; address: string; chain: number; activity: Activity[] }
  | { kind: ActivityStateKind.Error; address: string; chain: number };

const MAX_ACTIVITY_LENGTH = 6;

export function mapActivity(data: any): Activity[] {
  const activities = data.activitiesV2.slice(0, MAX_ACTIVITY_LENGTH);
  return activities
    .map((activity: any) => mapActivityType(activity))
    .filter((activity: any) => !!activity);
}

function mapActivityType(activity: any): Activity | undefined {
  switch (activity.__typename) {
    case 'TokenMintV2':
      return {
        txnHash: activity.transaction.hash,
        icon: activity.token.image?.url,
        subIcon: '',
        title: truncateTitle(activity.token.displayName),
        subtitle: 'Minted',
        accessory: '',
      };
    case 'TokenReceivedV2':
      return {
        txnHash: activity.transaction.hash,
        icon: activity.token.image?.url,
        subIcon: '',
        title: truncateTitle(activity.token.displayName),
        subtitle: `Received from ${truncateEthAddress(activity.from)}`,
        accessory: '',
      };
    case 'TokenSentV2':
      return {
        txnHash: activity.transaction.hash,
        icon: activity.token.image?.url,
        subIcon: '',
        title: truncateTitle(activity.token.displayName),
        subtitle: `Sent to ${truncateEthAddress(activity.to)}`,
        accessory: '',
      };
    default:
      return undefined;
  }
}

// Captures 0x + 4 characters, then the last 4 characters.
const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;

/**
 * Truncates an ethereum address to the format 0x0000…0000
 * @param address Full address to truncate
 * @returns Truncated address
 */
const truncateEthAddress = (address: string) => {
  const match = address.match(truncateRegex);
  if (!match) return address;
  return `${match[1]}…${match[2]}`;
};

const MAX_TITLE_LENGTH = 22;

function truncateTitle(input: string): string {
  if (input.length <= MAX_TITLE_LENGTH) {
    return input;
  } else {
    return input.slice(0, MAX_TITLE_LENGTH) + '...';
  }
}
