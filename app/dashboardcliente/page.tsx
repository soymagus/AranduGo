import { requireChatGPTUser, chatGPTSignOutPath } from "@/app/chatgpt-auth";
import DashboardClient from "./DashboardClient";
export const dynamic = "force-dynamic";
export default async function DashboardPage() { const user = await requireChatGPTUser("/dashboardcliente/"); return <DashboardClient userName={user.displayName} signOut={chatGPTSignOutPath("/")} />; }
