import { truncateAddress, truncateTitle } from '../../utils';

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

// @ts-ignore
export function mapActivity(data): Activity[] {
  const activities = data.activitiesV2.slice(0, MAX_ACTIVITY_LENGTH);
  // @ts-ignore
  return activities.map((activity) => mapActivityType(activity)).filter((activity) => !!activity);
}

// @ts-ignore
function mapActivityType(activity): Activity | undefined {
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
        subtitle: `Received from ${truncateAddress(activity.from)}`,
        accessory: '',
      };
    case 'TokenSentV2':
      return {
        txnHash: activity.transaction.hash,
        icon: activity.token.image?.url,
        subIcon: '',
        title: truncateTitle(activity.token.displayName),
        subtitle: `Sent to ${truncateAddress(activity.to)}`,
        accessory: '',
      };
    default:
      return undefined;
  }
}
