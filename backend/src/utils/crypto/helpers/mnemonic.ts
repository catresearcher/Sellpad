import * as bip39 from "bip39";

export default function generateNewMnemonic() {
  const mnemonic = bip39.generateMnemonic();

  console.log(mnemonic);
}
