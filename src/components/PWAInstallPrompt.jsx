import React, { useState, useEffect } from "react";

const PWAInstallPrompt = () => {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // 检查是否已经安装
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
      return;
    }

    // 监听beforeinstallprompt事件
    const handler = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // 监听应用安装状态
    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
      setShowPrompt(false);
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) return;

    await installPrompt.prompt();

    const { outcome } = await installPrompt.userChoice;

    if (outcome === "accepted") {
      setIsInstalled(true);
    }

    setShowPrompt(false);
    setInstallPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // 24小时内不再显示
    localStorage.setItem(
      "pwaPromptDismissed",
      (Date.now() + 24 * 60 * 60 * 1000).toString()
    );
  };

  // 如果已安装或用户已关闭提示，则不显示
  if (isInstalled || !showPrompt || !installPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 p-4 z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center mb-3 sm:mb-0">
          <div className="bg-blue-100 p-2 rounded-full mr-3">
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">安装GoTrip应用</h3>
            <p className="text-sm text-gray-600">
              获得更好的体验和离线访问功能
            </p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleDismiss}
            className="px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            稍后再说
          </button>
          <button
            onClick={handleInstallClick}
            className="px-3 py-1.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            立即安装
          </button>
        </div>
      </div>
    </div>
  );
};

export default PWAInstallPrompt;
