import { Connector, useConfig, useDisconnect } from 'wagmi';
import { TokensState, TokenStateKind } from './useTokens';
import { useContext, useState } from 'react';
import { WalletViewerContext } from './BitskiWalletProvider';
import { Activity, ActivityState, ActivityStateKind } from './useActivity';
import { Chain } from 'viem/chains';
import { switchChain } from '@wagmi/core';
import { ChainIcon } from './ChainIcon';
import { truncateAddress } from '../../utils';
import { Tab } from './constants';
import iconTokenSelected from '../../assets/icon-tokens-selected.svg';
import iconToken from '../../assets/icon-tokens.svg';
import iconActivitySelected from '../../assets/icon-activity-selected.svg';
import iconActivity from '../../assets/icon-activity.svg';
import iconSwapsSelected from '../../assets/icon-swaps-selected.svg';
import iconSwaps from '../../assets/icon-swaps.svg';
import checkChecked from '../../assets/check-checked.svg';
import checkDisabled from '../../assets/check-disabled.svg';
import iconSettings from '../../assets/settings.svg';
import iconDisconnect from '../../assets/icon-disconnect.svg';

interface BitskiWalletViewerProps {
  tabs?: Tab[];
}

export default function BitskiWalletViewer({
  tabs = [Tab.Tokens, Tab.Activity],
}: BitskiWalletViewerProps) {
  const { activityState, connection, tokensState } = useContext(WalletViewerContext);
  const [showChainSwitcher, setShowChainSwitcher] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [selectedTab, setTab] = useState<Tab>(tabs[0]);

  if (!connection) {
    return null;
  }
  const address = connection.accounts[0];

  function icon(tab: Tab) {
    switch (tab) {
      case Tab.Tokens:
        return selectedTab === tab ? iconTokenSelected : iconToken;
      case Tab.Activity:
        return selectedTab === tab ? iconActivitySelected : iconActivity;
      case Tab.Swaps:
        return selectedTab === tab ? iconSwapsSelected : iconSwaps;
    }
  }

  let page;
  switch (selectedTab) {
    case Tab.Tokens:
      page = <TokensPage tokensState={tokensState} />;
      break;
    case Tab.Activity:
      page = <ActivityPage activityState={activityState} />;
      break;
  }

  const chainSwitcher = showChainSwitcher ? (
    <ChainSwitcher
      selectedChainId={connection.chainId}
      setShowChainSwitcher={setShowChainSwitcher}
    />
  ) : null;

  const settingsMenu = showSettings ? (
    <SettingsMenu connector={connection.connector} setShowSettings={setShowSettings} />
  ) : null;

  return (
    <div className="flex flex-col bg-white w-[375px] shrink-0 border border-[color:var(--Aux-Grey,color(display-p3_0.7569_0.7569_0.7647_/_0.20))] shadow-[0px_10px_40px_0px_color(display-p3_0_0.0667_0.2_/_0.10)] rounded-3xl border-solid max-h-[600px]">
      <div className="flex p-4">
        <button className="flex-none" onClick={() => setShowChainSwitcher(!showChainSwitcher)}>
          <ChainIcon chainId={connection.chainId} size={'[21px]'} />
        </button>
        <p className="grow text-[color:var(--Main-Black,color(display-p3_0.2_0.2_0.2))] text-center text-base not-italic font-[590] leading-[22px] tracking-[-0.32px]">
          {truncateAddress(address)}
        </p>
        <button className="flex-none" onClick={() => setShowSettings(!showSettings)}>
          <img src={iconSettings} alt="Settings" />
        </button>
      </div>
      <div className="bg-[color:var(--Aux-Grey,color(display-p3_0.7569_0.7569_0.7647_/_0.20))] h-[1px] flex relative w-full">
        <div className="relative bottom-2 left-4 z-10">{chainSwitcher}</div>
        <div className="relative bottom-2 -end-[150px] z-10">{settingsMenu}</div>
      </div>
      <div className="flex flex-col px-6 my-6  overflow-y-auto">{page}</div>
      <div className="bg-[color:var(--Aux-Grey,color(display-p3_0.7569_0.7569_0.7647_/_0.20))] h-[1px]"></div>
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

function ChainSwitcher({
  selectedChainId,
  setShowChainSwitcher,
}: {
  selectedChainId: number;
  setShowChainSwitcher: (showChainSwitcher: boolean) => void;
}) {
  const config = useConfig();
  const chains = config.chains;

  async function setChain(chain: Chain) {
    setShowChainSwitcher(false);
    try {
      await switchChain(config, { chainId: chain.id });
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="bg-white flex flex-col w-[207px] shrink-0 border border-[color:var(--Aux-Grey,color(display-p3_0.7569_0.7569_0.7647_/_0.20))] shadow-[0px_3px_15px_0px_color(display-p3_0_0.0667_0.2_/_0.05)] rounded-lg border-solid">
      {chains.map((chain, index) => {
        const checkSrc = chain.id === selectedChainId ? checkChecked : checkDisabled;
        return (
          <div className="flex flex-col" key={chain.id}>
            <button className="flex items-center p-4" onClick={() => setChain(chain)}>
              <div className="flex gap-2 items-center">
                <ChainIcon chainId={chain.id} size={'4'} />
                <p className="text-[color:var(--Main-Black,color(display-p3_0.2_0.2_0.2))] text-center text-[13px] not-italic font-[590] leading-[13px]">
                  {chain.name}
                </p>
              </div>
              <div className="flex flex-grow flex-row-reverse items-center">
                <img className={'w-4 h-4 shrink-0'} src={checkSrc} />
              </div>
            </button>
            {index < chains.length - 1 ? (
              <div className="w-full h-px shrink-0 bg-gray-200"></div>
            ) : null}
          </div>
        );
      })}
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
  const balances = (
    <div className="flex flex-col gap-4 self-stretch">
      {'tokens' in tokensState &&
        tokensState.tokens.balances.map((balance) => {
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
      return (
        <div className="flex flex-col gap-6 items-center">
          <p className="text-[color:var(--Main-Black,color(display-p3_0.2_0.2_0.2))] text-[40px] not-italic font-[590] leading-9 tracking-[-0.4px]">
            ${tokensState.tokens.totalBalanceUsd}
          </p>
          {balances}
        </div>
      );
  }
}

function ErrorTokens(props: { address: string; chainId: number }) {
  const { address, chainId } = props;
  const { syncTokens } = useContext(WalletViewerContext);
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
  const { activity, chain } = state as {
    kind: ActivityStateKind.Activity;
    address: string;
    chain: number;
    activity: Activity[];
  };

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
      if (!activity.length) {
        return <EmptyActivity />;
      }
      return (
        <div className="flex flex-col gap-5">
          {activity.map((activity: any) => {
            return <ActivityRow activity={activity} key={activity.txnHash} chainId={chain} />;
          })}
        </div>
      );
    case ActivityStateKind.Error:
      return <ErrorActivity address={state.address} chainId={state.chain} />;
  }
}

function EmptyActivity() {
  return (
    <p className="text-[color:var(--Main-Black,color(display-p3_0.2_0.2_0.2))] text-center text-base not-italic leading-[22px] tracking-[-0.32px]">
      No Activity...yet
    </p>
  );
}

function ErrorActivity(props: { address: string; chainId: number }) {
  const { address, chainId } = props;
  const { syncActivity } = useContext(WalletViewerContext);
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
    <ChainIcon chainId={props.chainId} size={'10'} />
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

function SettingsMenu({
  connector,
  setShowSettings,
}: {
  connector: Connector;
  setShowSettings: (showSettings: boolean) => void;
}) {
  const { disconnectAsync } = useDisconnect();
  return (
    <div className="bg-white inline-flex items-center border border-[color:var(--Aux-Grey,color(display-p3_0.7569_0.7569_0.7647_/_0.20))] shadow-[0px_3px_15px_0px_color(display-p3_0_0.0667_0.2_/_0.05)] pl-3 pr-[98px] py-3 rounded-lg border-solid">
      <button
        onClick={() => {
          setShowSettings(false);
          disconnectAsync({ connector });
        }}
        className="flex gap-2"
      >
        <img src={iconDisconnect} alt="Disconnect" />
        <p className="text-[color:var(--Main-Grey,color(display-p3_0.5961_0.5922_0.6118))] text-center text-[13px] not-italic font-[590] leading-[13px]">
          Disconnect
        </p>
      </button>
    </div>
  );
}
