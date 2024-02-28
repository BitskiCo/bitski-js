import { Connector } from 'wagmi';
import { TokensState, TokenStateKind } from './hooks/useTokens';
import { useContext, useState } from 'react';
import { WalletViewerContext } from './BitskiWalletProvider';
import { Activity, ActivityState, ActivityStateKind } from './hooks/useActivity';
import { ChainIcon } from './ChainIcon';
import { BitskiContext, ConnectionStateKind } from '../BitskiContext';
import iconTokenSelected from '../assets/icon-tokens-selected.svg';
import iconToken from '../assets/icon-tokens.svg';
import iconActivitySelected from '../assets/icon-activity-selected.svg';
import iconActivity from '../assets/icon-activity.svg';
import { EmptyActivities } from './EmptyActivities';
import { EmptyTokens } from './EmptyTokens';
import { CopyAddress } from './CopyAddress';
import { ChainSwitcher } from './ChainSwitcher';
import { SettingsMenu } from './SettingsMenu';

export enum Tab {
  Tokens = 'Tokens',
  Activity = 'Activity',
}

export function BitskiWalletViewer() {
  const { tabs, connectionState } = useContext(BitskiContext);

  const { activityState, tokensState } = useContext(WalletViewerContext);
  const [selectedTab, setTab] = useState<Tab>(tabs[0]);

  let address, chainId: number, connector: Connector;
  switch (connectionState.kind) {
    case ConnectionStateKind.Connected:
      address = connectionState.address;
      chainId = connectionState.chainId;
      connector = connectionState.connector;
      break;
    default:
      console.info('No Connection to Display');
      return null;
  }

  function icon(tab: Tab) {
    switch (tab) {
      case Tab.Tokens:
        return selectedTab === tab ? iconTokenSelected : iconToken;
      case Tab.Activity:
        return selectedTab === tab ? iconActivitySelected : iconActivity;
    }
  }

  var page;
  switch (selectedTab) {
    case Tab.Tokens:
      page = <TokensPage tokensState={tokensState} />;
      break;
    case Tab.Activity:
      page = <ActivityPage activityState={activityState} />;
      break;
    default:
      throw new Error('Not a valid tab');
  }

  return (
    <div className="flex flex-col bg-white w-[375px] shrink-0 border border-[color:var(--Aux-Grey,color(display-p3_0.7569_0.7569_0.7647_/_0.20))] shadow-[0px_10px_40px_0px_color(display-p3_0_0.0667_0.2_/_0.10)] rounded-3xl border-solid border-b">
      <div className="relative flex p-4">
        <ChainSwitcher />
        <CopyAddress address={address} />
        <SettingsMenu connector={connector} />
      </div>
      <div className="flex flex-col p-6 max-h-[400px] overflow-y-auto">{page}</div>
      <div className="inline-flex place-content-center gap-6 p-4">
        {tabs.map((tab) => {
          return (
            <button key={tab} onClick={() => setTab(tab)}>
              <img src={icon(tab)} alt={tab} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SkeletonRow() {
  return (
    <div className="flex flex-row gap-3">
      <div className="bg-gray-200 flex w-10 h-10 justify-center items-center gap-2.5 shadow-[0px_3px_15px_0px_color(display-p3_0_0.0667_0.2_/_0.05)] rounded-[999px]"></div>
      <div className="flex flex-col gap-[5px]">
        <div className="bg-gray-200 flex w-[120px] h-4 flex-col items-start gap-1 rounded-md"></div>
        <div className="bg-gray-200 flex w-[72px] h-3.5 flex-col items-start gap-1 rounded-md"></div>
      </div>
    </div>
  );
}

function TokensPage(props: { tokensState: TokensState }) {
  const { tokensState } = props;
  switch (tokensState.kind) {
    case TokenStateKind.NoAddress:
      return null;
    case TokenStateKind.Loading:
      return (
        <div className="flex flex-col gap-4">
          <SkeletonRow />
          <SkeletonRow />
          <SkeletonRow />
        </div>
      );
    case TokenStateKind.Error:
      return <ErrorTokens address={tokensState.address} chainId={tokensState.chainId} />;
    case TokenStateKind.Tokens:
      const balances = (
        <div className="flex flex-col gap-4 self-stretch">
          {tokensState.tokens.balances.map((balance) => {
            return (
              <div key={balance.name} className="h-10 relative">
                <p className="absolute right-0 mr-4 text-[color:var(--Main-Black,color(display-p3_0.2_0.2_0.2))] text-center text-sm not-italic font-[590] leading-[17px] tracking-[-0.28px]">
                  ${balance.amountUSD}
                </p>
                <div className="inline-flex items-center gap-3">
                  <img src={balance.image} className="w-10 h-10 rounded-[999px]" />
                  <div className="flex flex-col items-start gap-0">
                    <p className="text-[color:var(--Main-Black,color(display-p3_0.2_0.2_0.2))] text-center text-base not-italic font-bold leading-[22px] tracking-[-0.32px]">
                      {balance.name}
                    </p>
                    <p className="text-[color:var(--Main-Grey,color(display-p3_0.5961_0.5922_0.6118))] text-center text-[13px] not-italic font-[590] leading-[17px] tracking-[-0.26px]">
                      {balance.amount}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
      return tokensState.tokens.balances.length ? (
        <div className="flex flex-col gap-6 items-center">
          <p className="text-[color:var(--Main-Black,color(display-p3_0.2_0.2_0.2))] text-[40px] not-italic font-[590] leading-9 tracking-[-0.4px]">
            ${tokensState.tokens.totalBalanceUsd}
          </p>
          {balances}
        </div>
      ) : (
        <EmptyTokens />
      );
  }
}

function ErrorTokens(props: { address: string; chainId: number }) {
  const { address, chainId } = props;
  let { syncTokens } = useContext(WalletViewerContext);
  return (
    <div className="flex flex-col gap-4">
      <p className="text-[color:var(--Main-Black,color(display-p3_0.2_0.2_0.2))] text-center text-base not-italic leading-[22px] tracking-[-0.32px]">
        There was an error loading your Tokens
      </p>
      <button onClick={() => syncTokens(address, chainId)}>
        <p className="text-[color:var(--Main-Black,color(display-p3_0.2_0.2_0.2))] text-center text-base not-italic font-bold leading-[22px] tracking-[-0.32px]">
          Retry
        </p>
      </button>
    </div>
  );
}

function ActivityPage(props: { activityState: ActivityState }) {
  const state = props.activityState;
  switch (state.kind) {
    case ActivityStateKind.NoAddress:
      return null;
    case ActivityStateKind.Loading:
      return (
        <div className="flex flex-col gap-4">
          <SkeletonRow />
          <SkeletonRow />
          <SkeletonRow />
        </div>
      );
    case ActivityStateKind.Activity:
      const { activity, chain } = state;
      if (!activity.length) {
        return <EmptyActivities />;
      }
      return (
        <div className="flex flex-col gap-5">
          {activity.map((activity) => {
            return <ActivityRow activity={activity} key={activity.txnHash} chainId={chain} />;
          })}
        </div>
      );
    case ActivityStateKind.Error:
      return <ErrorActivity address={state.address} chainId={state.chain} />;
  }
}

function ErrorActivity(props: { address: string; chainId: number }) {
  const { address, chainId } = props;
  let { syncActivity } = useContext(WalletViewerContext);
  return (
    <div className="flex flex-col gap-4">
      <p className="text-[color:var(--Main-Black,color(display-p3_0.2_0.2_0.2))] text-center text-base not-italic leading-[22px] tracking-[-0.32px]">
        There was an error loading your Activity
      </p>
      <button onClick={() => syncActivity(address, chainId)}>
        <p className="text-[color:var(--Main-Black,color(display-p3_0.2_0.2_0.2))] text-center text-base not-italic font-bold leading-[22px] tracking-[-0.32px]">
          Retry
        </p>
      </button>
    </div>
  );
}

function ActivityRow(props: { activity: Activity; chainId: number }) {
  const activity = props.activity;
  const icon = activity.icon ? (
    <img src={activity.icon} alt={activity.title} className="w-10 h-10 rounded-[99px]" />
  ) : (
    <ChainIcon chainId={props.chainId} size={10} />
  );

  return (
    <div className="flex h-10 justify-between items-start self-stretch">
      <div className="flex flex-row gap-4">
        <div className="flex relative">{icon}</div>
        <div className="flex flex-col gap-0.5 items-start content-start">
          <p className="text-[color:var(--Main-Black,color(display-p3_0.2_0.2_0.2))] text-center text-base not-italic font-bold leading-[22px] tracking-[-0.32px]">
            {activity.title}
          </p>
          <p className="text-[color:var(--Main-Grey,color(display-p3_0.5961_0.5922_0.6118))] text-center text-[13px] not-italic font-[590] leading-[17px] tracking-[-0.26px]">
            {activity.subtitle}
          </p>
        </div>
      </div>
      <p className="flex items-end text-[color:var(--Main-Green,color(display-p3_0.1098_0.7804_0))] text-sm not-italic font-[590] leading-[17px] tracking-[-0.28px]">
        {activity.accessory}
      </p>
    </div>
  );
}
