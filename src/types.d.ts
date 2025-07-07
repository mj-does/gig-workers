declare module "WalletConnect" {
  const component: React.FC<{
    onConnect: (address: string) => void;
  }>;
  export default component;
}
