export default function TOS() {
  return (
    <div className="flex w-[350px] flex-col justify-center items-center gap-2.5 pt-3 pb-4 px-4 bg-[var(--aux-light-grey)]">
      <p className="self-stretch text-[color:var(--main-grey)] text-center text-xs not-italic font-normal leading-[15px] tracking-[-0.072px]">
        By creating a wallet, you agree to our <br />
        <a
          className="underline decoration-[#33333340] text-black"
          href="https://www.notion.so/Terms-of-Service-1f9a98659e6446479479339a23185d2f"
        >
          Terms of Service
        </a>{' '}
        and{' '}
        <a
          className="underline decoration-[#33333340] text-black"
          href="https://www.notion.so/otl/Privacy-Policy-c166160b6c544e909dd04176f43081d6"
        >
          Privacy Policy
        </a>
      </p>
    </div>
  );
}
