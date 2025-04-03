import React from "react";
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Users,
  Settings,
  HelpCircle,
  Share2,
} from "lucide-react";

// 定义导航项配置
const navItems = [
  {
    icon: <LayoutDashboard className="w-5 h-5" />,
    label: "仪表盘",
    path: "/dashboard",
  },
  {
    icon: <FolderKanban className="w-5 h-5" />,
    label: "项目",
    path: "/projects",
  },
  {
    icon: <CheckSquare className="w-5 h-5" />,
    label: "任务",
    path: "/tasks",
  },
  {
    icon: <Users className="w-5 h-5" />,
    label: "团队",
    path: "/team",
  },
];

const Sidebar = () => {
  return (
    <div className="hidden md:flex md:flex-col w-64 bg-white border-r min-h-screen">
      {/* 导航区 */}
      <nav className="flex-1 px-3 py-6">
        <div className="text-xs text-gray-500 mb-4 px-2">主菜单</div>
        {navItems.map((item) => (
          <a
            key={item.path}
            href={item.path}
            className="flex items-center space-x-3 px-2 py-2 rounded-lg mb-1 text-gray-600 hover:bg-gray-50 hover:text-gray-900 group"
          >
            <span className="text-gray-400 group-hover:text-gray-500">
              {item.icon}
            </span>
            <span className="text-sm">{item.label}</span>
          </a>
        ))}
      </nav>

      {/* 底部链接 */}
      <div className="border-t p-3">
        <a
          href="/help"
          className="flex items-center space-x-3 px-2 py-2 rounded-lg text-gray-600 hover:bg-gray-50"
        >
          <HelpCircle className="w-5 h-5" />
          <span className="text-sm">帮助中心</span>
        </a>
        <a
          href="/feedback"
          className="flex items-center space-x-3 px-2 py-2 rounded-lg text-gray-600 hover:bg-gray-50"
        >
          <Share2 className="w-5 h-5" />
          <span className="text-sm">分享反馈</span>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
