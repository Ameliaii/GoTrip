import React, { useState, useEffect } from "react";

const NetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOfflineMessage, setShowOfflineMessage] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // 短暂显示已恢复连接的消息
      setShowOfflineMessage(true);
      setTimeout(() => setShowOfflineMessage(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOfflineMessage(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!showOfflineMessage) {
    return null;
  }

  return (
    <div
      className={`fixed top-0 left-0 right-0 p-2 text-center z-50 transition-all duration-300 ${
        isOnline ? "bg-green-500" : "bg-red-500"
      }`}
    >
      <p className="text-white font-medium">
        {isOnline ? "网络连接已恢复" : "您当前处于离线状态，部分功能可能不可用"}
      </p>
    </div>
  );
};

export default NetworkStatus;
