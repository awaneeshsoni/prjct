import React, { useContext, useMemo } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { PageContext } from "../context/PageContext";
import { LinkContext } from "../context/LinkContext";
import { MessageContext } from "../context/MessageContext";
import { AuthContext } from "../context/AuthContext";
import { Link as RouterLink } from "react-router-dom";
import { FaChartBar, FaEye, FaEnvelope, FaLink } from "react-icons/fa";

const COLORS = ["#f97316", "#6366f1", "#10b981", "#facc15", "#ef4444", "#3b82f6"];

export default function Analytics() {
  const { pages } = useContext(PageContext);
  const { links } = useContext(LinkContext);
  const { messages } = useContext(MessageContext);
  const { auth } = useContext(AuthContext);
  const isPro = auth?.plan === "pro";

  const analyticsData = useMemo(() => {
    const totalPageViews = pages.reduce((sum, p) => sum + (p.visits || 0), 0);
    const totalMessages = pages.reduce((sum, p) => sum + (p.messageCount || 0), 0);
    const uniqueVisitors = new Set(
      pages.flatMap(p => p.visitLogs?.map(v => v.ip) || [])
    ).size;

    const mostVisitedPage = pages.reduce((prev, curr) =>
      (curr.visits || 0) > (prev.visits || 0) ? curr : prev,
      { title: ":", visits: 0 }
    );

    const visitsOverTime = getTimeSeries(pages, "visitLogs");
    const messagesOverTime = getTimeSeries(pages, "messageLogs");

    const topPages = [...pages].sort((a, b) => (b.visits || 0) - (a.visits || 0)).slice(0, 5);
    const topLinks = [...links].sort((a, b) => (b.clicks || 0) - (a.clicks || 0)).slice(0, 5);

    const deviceStats = aggregateDevices(pages);
    const recentActivity = generateActivityLog(pages, links, messages);

    return {
      totalPageViews,
      totalMessages,
      uniqueVisitors,
      mostVisitedPage,
      visitsOverTime,
      messagesOverTime,
      topPages,
      topLinks,
      deviceStats,
      recentActivity,
    };
  }, [pages, links, messages]);

  return (
    <div className="relative min-h-screen p-6 text-black">
      <h1 className="text-3xl font-bold mb-6 text-orange-500">📊 Analytics</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card title="Total Page Views" value={analyticsData.totalPageViews} icon={<FaEye />} />
        <Card title="Total Messages" value={analyticsData.totalMessages} icon={<FaEnvelope />} />
        <Card title="Unique Visitors" value={analyticsData.uniqueVisitors} icon={<FaChartBar />} />
        <Card title="Most Visited Page" value={analyticsData.mostVisitedPage?.title || ":"} icon={<FaLink />} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <ChartCard title="Page Views Over Time">
          <LineChart data={analyticsData.visitsOverTime}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#f97316" />
          </LineChart>
        </ChartCard>
        <ChartCard title="Messages Received Over Time">
          <BarChart data={analyticsData.messagesOverTime}>
            <XAxis dataKey="date" />
            <YAxis domain={[10, "auto"]} allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#6366f1" />
          </BarChart>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <ChartCard title="Top Devices / Browsers">
          <PieChart width={400} height={250}>
            <Pie
              data={analyticsData.deviceStats}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="count"
              label
            >
              {analyticsData.deviceStats.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Top Pages</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            {analyticsData.topPages.map((page, i) => (
              <li key={i}>• {page.title} : {page.visits} views</li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Most Clicked Links</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            {analyticsData.topLinks.map((link, i) => (
              <li key={i}>• {link.title} : {link.clicks || 0} clicks</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">Recent Activity</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          {analyticsData.recentActivity.map((entry, i) => (
            <li key={i}>• {entry}</li>
          ))}
        </ul>
      </div>

      {!isPro && (
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/0 to-white/90 backdrop-blur-sm z-50 flex pt-30 justify-center">
          <div className="text-center max-w-xs px-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Upgrade to Pro 🔐</h2>
            <p className="text-sm text-gray-600 mb-4">
              Unlock full access to advanced analytics and insights.
            </p>
            <RouterLink
              to="/pricing"
              className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-600 transition"
            >
              Upgrade Now
            </RouterLink>
          </div>
        </div>
      )}
    </div>
  );
}

function Card({ title, value, icon }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow flex flex-col gap-1">
      <div className="text-gray-600 text-sm flex items-center gap-2">
        {icon} {title}
      </div>
      <h2 className="text-2xl font-semibold">{value ?? ":"}</h2>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-2 text-gray-800">{title}</h3>
      <ResponsiveContainer width="100%" height={250}>
        {children}
      </ResponsiveContainer>
    </div>
  );
}

function getTimeSeries(pages, key) {
  const dailyMap = {};
  pages.forEach((p) => {
    (p[key] || []).forEach((entry) => {
      const date = new Date(entry.timestamp).toISOString().split("T")[0];
      dailyMap[date] = (dailyMap[date] || 0) + 1;
    });
  });
  return Object.entries(dailyMap).map(([date, count]) => ({
    date,
    count: Math.floor(count),
  }));
}

function aggregateDevices(pages) {
  const deviceMap = {};
  pages.forEach((p) => {
    (p.visitLogs || []).forEach((log) => {
      const agent = log.userAgent || "Unknown";
      deviceMap[agent] = (deviceMap[agent] || 0) + 1;
    });
  });
  return Object.entries(deviceMap).map(([name, count]) => ({ name, count }));
}

function generateActivityLog(pages, links, messages) {
  const activities = [];
  pages.forEach((p) => {
    (p.visitLogs || []).forEach(() => activities.push(`Visited page "${p.title}"`));
    (p.messageLogs || []).forEach(() => activities.push(`Message on "${p.title}"`));
  });
  links.forEach((l) => {
    if (l.clicks) activities.push(`Link clicked: "${l.title}"`);
  });
  messages.forEach((m) => {
    activities.push(`Message received for page "${m.page?.title}"`);
  });
  return activities.slice(-10).reverse();
}
