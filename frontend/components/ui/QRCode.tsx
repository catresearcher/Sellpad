import QRCode from "react-qr-code";

export default function WalletQRCode({ address }: { address: string }) {
  return (
    <div className="p-4 bg-white flex items-center justify-center rounded-xl">
      <QRCode
        value={address}
        size={128} // Изменение размера пикселей
        bgColor="#fff"
        fgColor="#000"
      />
    </div>
  );
}
