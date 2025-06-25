const output = document.getElementById("output");
let index = 0;

async function checkBalance(address) {
  try {
    const res = await fetch(`https://blockstream.info/api/address/${address}`);
    const data = await res.json();
    return data.chain_stats.funded_txo_count > 0;
  } catch (err) {
    return false;
  }
}

async function generateWallet() {
  const mnemonic = bip39.generateMnemonic();
  const seed = await bip39.mnemonicToSeed(mnemonic);
  const root = bitcoin.bip32.fromSeed(seed);
  const child = root.derivePath(`m/44'/0'/0'/0/${index}`);
  const { address } = bitcoin.payments.p2pkh({ pubkey: child.publicKey });

  const hasBalance = await checkBalance(address);

  const line = `[${index}] ${address} ${hasBalance ? "✅ USED" : "❌ EMPTY"}\n`;
  output.textContent += line;
  if (hasBalance) {
    localStorage.setItem(`wallet_${index}`, JSON.stringify({ address, wif: child.toWIF(), mnemonic }));
  }

  index++;
}

// استدعاء سريع كل 300ms
setInterval(generateWallet, 300);