import { ProgressProvider } from "@bprogress/next/app";

const BarProgressProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ProgressProvider
      height="3px"
      color="#111827"
      options={{ showSpinner: false }}
      shallowRouting
    >
      {children}
    </ProgressProvider>
  );
};

export default BarProgressProvider;
