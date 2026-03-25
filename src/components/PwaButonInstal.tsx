import React, { useEffect, useState } from 'react';

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
};

export default function InstallPwaButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIos, setIsIos] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showIosHelp, setShowIosHelp] = useState(false);

  useEffect(() => {
    const ua = window.navigator.userAgent;
    const ios =
      /iPad|iPhone|iPod/.test(ua) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      // Safari iOS
      // @ts-expect-error propriété Safari iOS
      window.navigator.standalone === true;

    setIsIos(ios);
    setIsStandalone(standalone);

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      setDeferredPrompt(null);
      return;
    }

    if (isIos) {
      setShowIosHelp(true);
    }
  };

  if (isStandalone) return null;
  if (!deferredPrompt && !isIos) return null;

  return (
    <>
      <button
      className="button button--primary" 
      onClick={handleInstall}
      >
        Installer l’app
      </button>

      {showIosHelp && (
        <div style={{ padding: 16, background: '#111', color: '#fff', borderRadius: 12, marginTop: 12 }}>
          <p><strong>Installer sur iPhone</strong></p>
          <p>1. Ouvre ce site dans Safari</p>
          <p>2. Touche le bouton Partager</p>
          <p>3. Choisis “Sur l’écran d’accueil”</p>
          <button onClick={() => setShowIosHelp(false)}>Fermer</button>
        </div>
      )}
    </>
  );
}